<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $users = User::count();
        $plans = Plan::count();
        $subscriptions = Subscription::count();
        

       
            
        $active = Subscription::where('status', 'active')->count();
        $expired = Subscription::where('status', 'expired')->count();
        $canceled = Subscription::where('status', 'canceled')->count();

        $mostPopularPlan = Subscription::select('plan_id')
            ->groupBy('plan_id')
            ->orderByRaw('COUNT(*) DESC')
            ->with('plan') // assuming relationship exists
            ->first();

        $subscriptionsThisMonth = Subscription::whereMonth('start_date', now()->month)
            ->whereYear('start_date', now()->year)
            ->count();


        return inertia('admin/dashboard', [
            'stats' => [
                'users' => $users,
                'subscriptions' =>$subscriptions ,
                'plans' =>$plans,
                'active' => $active,
                'expired' => $expired,
                'canceled' => $canceled,
                'mostPopularPlan' => $mostPopularPlan?->plan?->name ?? 'N/A',
                'thisMonth' => $subscriptionsThisMonth,
            ]
        ]);
            

        
       

    }
    

}
