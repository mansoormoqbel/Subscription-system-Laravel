<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
class CheckExpiringSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-expiring-subscriptions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
         $subscriptions = Subscription::where('status', 'active')
        ->whereDate('ends_at', now()->addDays(3))
        ->get();

    foreach ($subscriptions as $subscription) {
        $subscription->user
            ->notify(new SubscriptionExpiringNotification());
    }
    }
}
