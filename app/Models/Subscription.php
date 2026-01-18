<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table="subscriptions";
    
    protected $fillable = [
        'user_id',
        'plan_id',
        'start_date',
        'end_date',
        'status',
        'auto_renew',
    ];
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function plan()
    {
        return $this->belongsTo(Plan::class,'plan_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
