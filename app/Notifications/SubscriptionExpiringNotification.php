<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionExpiringNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */


/* public function toMail($notifiable)
{
    return (new MailMessage)
        ->subject('تنبيه: اشتراكك سينتهي قريبًا')
        ->line('اشتراكك سينتهي خلال 3 أيام.')
        ->action('تجديد الاشتراك', url('/billing'))
        ->line('شكراً لاستخدامك منصتنا');
} */
    public function via(object $notifiable): array
    {
         return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Alert: Your subscription will expire soon')
            ->line('Your subscription will expire in 3 days.')
            ->action('Renew Subscription', url('/user/plans'))
            ->line('Thank you for using our platform');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
