
import { Head, usePage } from '@inertiajs/react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type BreadcrumbItem } from '@/types';
import admin from '@/routes/admin';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: admin.dashboard().url },
];

type Stats = {
    users: number;
    subscriptions: number;
    plans: number;
};

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}

export default function AdminDashboard() {
    const { stats } = usePage<{ stats: Stats }>().props;

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <StatCard title="Users" value={stats.users} />
                <StatCard title="Subscriptions" value={stats.subscriptions} />
                <StatCard title="Plans" value={stats.plans} />
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full" />
                    </div>
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
