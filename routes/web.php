<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\SubscriptionController;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\planController;
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('user/plans', [SubscriptionController::class, 'getplan'])->name('user.plans');
    Route::post('user/subscribe', [SubscriptionController::class, 'subscribe'])->name('user.subscribe');
    Route::get('/my-subscription', [SubscriptionController::class, 'current'])->name('user.current');
    Route::post('user/{subscription}/cancel', [SubscriptionController::class, 'cancel'])->name('user.cancel');
    
});
 Route::prefix('admin')->middleware(['auth', 'verified' ,AdminMiddleware::class])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    /* start user */ 
        Route::get('/users', [UserController::class, 'index'])->name('admin.users');
        Route::get('/users/create', [UserController::class, 'create'])->name('admin.users.create');
        Route::post('/users/store', [UserController::class, 'store'])->name('admin.users.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
    /* end user */ 
    
        Route::get('/plans', [planController::class, 'index'])->name('admin.plans');
        Route::get('/plans/create', [planController::class, 'create'])->name('admin.plans.create');
        Route::post('/plans/store', [planController::class, 'store'])->name('admin.plans.store');
        Route::get('/plans/{plan}/edit', [planController::class, 'edit'])->name('admin.plans.edit');
        Route::put('/plans/{plan}', [planController::class, 'update'])->name('admin.plans.update');
        Route::delete('/plans/{plan}', [planController::class, 'destroy'])->name('admin.plans.destroy');
    
    
}); //AdminMiddleware::class 
require __DIR__.'/settings.php';
