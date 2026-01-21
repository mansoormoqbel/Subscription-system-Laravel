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
        

       
            return inertia('admin/dashboard', [
                'stats' => [
                    'users' => $users,
                    'subscriptions' =>$subscriptions ,
                    'plans' =>$plans,
                ]
            ]);
       

    }
}
