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
        /* return "admin"; */
        $users = User::count();
        $plans = Plan::count();
        $subscriptions = Subscription::count();
        /* return view('admin.dashboard', compact('users','plans','subscriptions')); */

       
            return inertia('admin/dashboard', [
                'stats' => [
                    'users' => User::count(),
                    'subscriptions' => Subscription::count(),
                    'plans' => Plan::count(),
                ]
            ]);
       

    }
}
