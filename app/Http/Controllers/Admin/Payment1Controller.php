<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class Payment1Controller extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with('subscription.user','subscription.plan');
         

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }
        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        $payments = $query->orderBy('payment_date', 'desc')->get();

        return Inertia::render('admin/payment/index', [
            'payments' => $payments,
            'filters' => $request->only(['payment_status', 'payment_method']),
        ]);
    }
}
