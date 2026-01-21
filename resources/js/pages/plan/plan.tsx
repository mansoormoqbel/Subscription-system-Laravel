import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import userRoutes from '@/routes/user';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Plan',
        href: userRoutes.plans().url,
    },
];

type Plan = {
    id: number;
    name: string;
    price: number;
    duration_days: number;
    description?: string;
};

type PageProps = {
    plans1: Plan[];
};

export default function Plans() {
    const { plans1 } = usePage<PageProps>().props;

    // إنشاء useForm
    const form = useForm<{
        plan_id: number | null;
        auto_renew: boolean;
    }>({
        plan_id: null,
        auto_renew: true,
    });

    // الدالة الصحيحة للاشتراك
    const subscribeToPlan = (planId: number, autoRenew = true) => {
        // نضبط البيانات أولًا
        form.setData({
            plan_id: planId,
            auto_renew: autoRenew,
        });

        // ثم نرسل
        form.post(userRoutes.subscribe().url, {
            preserveScroll: true, // options هنا فقط
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div>
                {form.errors && Object.keys(form.errors).length > 0 && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
                        {Object.values(form.errors).map((err, idx) => (
                            <p key={idx}>{err}</p>
                        ))}
                    </div>
                )}
                <div className="grid gap-5 md:grid-cols-4">
                    {plans1.map(plan => (
                        <div key={plan.id} className="rounded-xl border p-4 shadow-sm">
                            <h2 className="text-lg font-bold">{plan.name}</h2>
                            <p className="text-2xl font-semibold mt-2">${plan.price}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Duration: {plan.duration_days} days
                            </p>
                            {plan.description && (
                                <p className="text-sm mt-2 text-gray-700">{plan.description}</p>
                            )}

                            <button
                                disabled={form.processing}
                                onClick={() => subscribeToPlan(plan.id, true)}
                                className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
                            >
                                {form.processing ? 'Processing...' : 'Subscribe'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
