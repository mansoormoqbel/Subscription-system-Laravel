<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table="plans";
    
    protected $fillable = [
        'name',
        'price',
        'duration_days',
        'description',
        'is_active',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class,'plan_id');
    }
    
}
