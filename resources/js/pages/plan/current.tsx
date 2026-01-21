import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import userRoutes from '@/routes/user';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'My Subscription',
    href: userRoutes.current().url,
  },
];

type Plan = {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  description?: string;
};

type Subscription = {
  id: number;
  plan: Plan;
  start_date: string;
  end_date: string;
  status: string;
  auto_renew: boolean;
};

type PageProps = {
  subscription: Subscription | null;
};

export default function CurrentSubscription() {
  const { subscription } = usePage<PageProps>().props;

  // useForm فقط لإرسال الطلب
  const form = useForm({});

  // دالة إلغاء الاشتراك
  const cancelSubscription = (subscriptionId: number) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) return;

    form.post(userRoutes.cancel(subscriptionId).url, {
      preserveScroll: true,
      onSuccess: () => {
        alert('Subscription canceled successfully');
      },
      onError: (errors) => {
        console.error(errors);
        alert('Failed to cancel subscription');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Current Subscription" />

      {!subscription ? (
        <p>You don’t have an active subscription.</p>
      ) : (/* rounded-l border p-4 shadow-sm */
        <div className="rounded-l border p-4 shadow-sm">
          <h2 className="text-lg font-bold">{subscription.plan.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Price: ${subscription.plan.price}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Duration: {subscription.plan.duration_days} days
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Status: {subscription.status}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Start: {subscription.start_date}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            End: {subscription.end_date}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Auto-renew: {subscription.auto_renew ? 'Yes' : 'No'}
          </p>

          <button
            disabled={form.processing}
            onClick={() => cancelSubscription(subscription.id)}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
          >
            {form.processing ? 'Canceling...' : 'Cancel Subscription'}
          </button>
        </div>
      )}
    </AppLayout>
  );
}
