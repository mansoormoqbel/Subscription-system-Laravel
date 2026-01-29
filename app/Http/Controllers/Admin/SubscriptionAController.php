<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Payment;
class SubscriptionAController extends Controller
{
    
    public function getsub(Request $request)
    {
        $query = Subscription::with(['user', 'plan']);

        // فلترة حسب اسم المستخدم
        if ($request->filled('searchUser')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->searchUser.'%');
            });
        }

        // فلترة حسب اسم الباقة
        if ($request->filled('searchPlan')) {
            $query->whereHas('plan', function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->searchPlan.'%');
            });
        }

        // فلترة حسب الحالة
        if ($request->filled('statusFilter')) {
            $query->where('status', $request->statusFilter);
        }

        // فلترة حسب التاريخ
        if ($request->filled('dateFrom')) {
            $query->whereDate('start_date', '>=', $request->dateFrom);
        }
        if ($request->filled('dateTo')) {
            $query->whereDate('end_date', '<=', $request->dateTo);
        }

        // جلب النتائج
        $subscriptions = $query->orderBy('id', 'desc')->get();
        return inertia('admin/subscription', [
                'subscriptions'=>$subscriptions,
                'filters' => $request->only(['searchUser','searchPlan','statusFilter','dateFrom','dateTo']),
            ]);
       
    }
     // Suspend / Activate
    public function toggleStatus($id)
    {
        $subscription = Subscription::findOrFail($id);/* active   suspended  */

        $subscription->status = $subscription->status === 'active' ? 'suspended' : 'active';
        $subscription->save();

        // نرسل البيانات للـ frontend عبر Inertia
        return Inertia::render('admin/subscription', [
            'updatedSubscription' => [
                'id' => $subscription->id,
                'status' => $subscription->status,
            ],
            'subscriptions' => Subscription::with('user','plan')->get(),
        ]);
    }

    // Cancel
    public function cancel($id)
    {
        $subscription = Subscription::findOrFail($id);
        $subscription->status = 'canceled';
        $subscription->save();
        //$subscription->delete();
        return Inertia::render('admin/subscription', [
            'subscriptions' => Subscription::with('user','plan')->get(),
        ]);
    }

    // Edit (يرجع بيانات الاشتراك للصفحة Edit)
    public function edit($id)
    {
        $subscription = Subscription::with(['user','plan'])->findOrFail($id);
        return Inertia::render('Admin/Subscriptions/Edit', [
            'subscription' => $subscription
        ]);
    }

}
