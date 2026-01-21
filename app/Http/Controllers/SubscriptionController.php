<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
/* getplan
namespace App\Http\Controllers\SubscriptionController;

*/

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
        Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'start_date' => now(),
            'end_date' => now()->addDays($plan->duration_days),
            'status' => 'active',
            'auto_renew' => $request->auto_renew ?? false,
        ]);

        return redirect()->route('user.current')->with('success', 'Subscription activated successfully');
    }

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

