<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = auth()->user()->subscriptions->flatMap->payments;
        return view('payments.index', compact('payments'));
    }

    public function pay(Subscription $subscription)
    {
        // مثال دفع وهمي
        Payment::create([
            'subscription_id' => $subscription->id,
            'amount' => $subscription->plan->price,
            'payment_method' => 'card',
            'payment_status' => 'paid',
            'payment_date' => now(),
        ]);

        return redirect()->route('payments.index')->with('success','Payment successful.');
    }
}
