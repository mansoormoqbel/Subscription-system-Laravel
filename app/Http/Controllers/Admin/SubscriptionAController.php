<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subscription;
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
}
