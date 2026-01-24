<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Inertia\Inertia;
use Stripe\Checkout\Session;
class PaymentController extends Controller
{
    
    public function checkout(Subscription $subscription)
    {
        Stripe::setApiKey(config('services.stripe.secret'));
        $payment = $subscription->payments()->latest()->first();
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $subscription->plan->name,
                    ],
                    'unit_amount' => $payment->amount * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success', $payment->id),
            'cancel_url' => route('payment.failed', $payment->id),
        ]);
        return Inertia::location($session->url);
        
    }

    public function success(Payment $payment)
    {
        $payment->update([
            'payment_status' => 'paid',
            'transaction_id' => request('session_id'),
            'payment_date' => now(),
        ]);

        $payment->subscription->update([
            'status' => 'active',
        ]);

        return redirect()
            ->route('user.current')
            ->with('success', 'Payment successful');
    }
    public function failed(Payment $payment)
    {
        $payment->update([
            'payment_status' => 'failed',
        ]);

        $payment->subscription->update([
            'status' => 'canceled',
        ]);

        return redirect()
            ->route('user.plans')
            ->with('error', 'Payment failed');
    }













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
