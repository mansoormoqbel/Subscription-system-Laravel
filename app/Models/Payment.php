<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table='payments' ;
    protected $fillable = [
        'subscription_id',
        'amount',
        'payment_method',
        'payment_status',
        'transaction_id',
        'payment_date',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class,'subscription_id');
    }
}
