<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;

class RenewSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:renew-subscriptions';

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
            ->where('ends_at', '<=', now())
            ->get();

        foreach ($subscriptions as $subscription) {
            $user = $subscription->user;
            $plan = $subscription->plan;

            try {
                // محاولة الدفع
                $user->charge($plan->price * 100);

                // نجاح → تمديد الاشتراك
                $subscription->update([
                    'starts_at' => now(),
                    'ends_at' => now()->addDays($plan->duration_days),
                ]);

            } catch (\Exception $e) {

                // فشل → إيقاف الاشتراك
                $subscription->update([
                    'status' => 'expired'
                ]);

                $user->notify(new SubscriptionFailedNotification());
            }
        }
    }
}
