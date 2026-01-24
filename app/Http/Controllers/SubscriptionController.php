<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Payment;


class SubscriptionController extends Controller
{
    // عرض الخطط
    public function getplan()  {
        $plans =Plan::Where('is_active',true)
                ->select('id', 'name', 'price', 'duration_days', 'description')
                ->get();    
        return inertia('plan/plan', [
                'plans1' => $plans,   
            ]);
    }

    /*  $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); 
            $table->foreignId('plan_id')->constrained()->cascadeOnDelete(); 
            $table->date('start_date'); 
            $table->date('end_date'); 
            $table->enum('status', ['active', 'expired', 'canceled', 'suspended']); 
            $table->boolean('auto_renew')->default(false); 
            $table->timestamps(); */
    // اشتراك المستخدم
    public function subscribe(Request $request)
    {   
        $request->validate( [
            'plan_id' => 'required|exists:plans,id',
            'auto_renew' => 'boolean',
        ]);
        $user = Auth::user();
        $plan = Plan::where('is_active', true)->findOrFail($request->plan_id);
        // إلغاء أي اشتراك نشط سابق
        $user->subscriptions()->where('status', 'active')->update(['status' => 'canceled']);
        // إنشاء الاشتراك الجديد
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'start_date' => now(),
            'end_date' => now()->addDays($plan->duration_days),
            'status' => 'suspended',
            'auto_renew' => $request->auto_renew ?? false,
        ]);
        //return  $subscription;
        // إنشاء Payment pending
        Payment::create([
            'subscription_id' => $subscription->id,
            'amount' => $plan->price,
            'payment_method' => 'stripe',
            'payment_status' => 'pending',
        ]);
        /* return inertia('payments/redirect', [
            'subscriptionId' => $subscription->id,
        ]); */

        return redirect()->route('payment.checkout', $subscription->id);
        
    }

    /* 
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscription_id')->constrained()->cascadeOnDelete(); 
            $table->decimal('amount', 8, 2); 
            $table->string('payment_method'); 
            $table->enum('payment_status', ['paid', 'failed', 'pending']); 
            $table->string('transaction_id')->nullable(); 
            $table->dateTime('payment_date')->nullable();
            $table->timestamps();
        });
     */
    


    // الاشتراك الحالي
    public function current()
    {
        $subscription = Auth::user()
            ->subscriptions()
            ->with('plan')
            ->where('status', 'active')
            ->first();

        return inertia('plan/current', [
            'subscription' => $subscription,
        ]);
    }

    // إلغاء الاشتراك
    public function cancel(Subscription $subscription)
    {
        abort_if($subscription->user_id !== Auth::id(), 403);

        $subscription->update([
            'status' => 'canceled',
            'auto_renew' => false,
        ]);

        return back()->with('success', 'Subscription canceled successfully');
    }
}

