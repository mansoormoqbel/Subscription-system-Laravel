<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Auth::user()->subscriptions;
        return view('subscriptions.index', compact('subscriptions'));
    }

    public function subscribe(Plan $plan)
    {
        // إنشاء الاشتراك الجديد
        $subscription = Subscription::create([
            'user_id' => Auth::id(),
            'plan_id' => $plan->id,
            'start_date' => now(),
            'end_date' => now()->addDays($plan->duration_days),
            'status' => 'active',
            'auto_renew' => true,
        ]);

        return redirect()->route('subscriptions.index')->with('success','Subscription activated.');
    }

    public function cancel(Subscription $subscription)
    {
        $subscription->update(['status' => 'canceled']);
        return redirect()->route('subscriptions.index')->with('success','Subscription canceled.');
    }
}
