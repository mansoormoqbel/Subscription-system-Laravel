
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
    active: number;
    expired: number;
    canceled: number;
    mostPopularPlan: string;
    thisMonth: number;
};
/* function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
    return (
        <div className={`rounded-lg shadow p-4 text-white ${color}`}>
            <p className="text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
} */

function StatCard({ title, value ,color}: { title: string; value: string | number; color: string  }) {
    return (
        <div className={`rounded-xl border p-6 shadow-sm ${color}`}>
            <h3 className="text-sm ">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}

export default function AdminDashboard() {
    const { stats } = usePage<{ stats: Stats }>().props;

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4" >
                <StatCard title="Users" value={stats.users} color="bg-blue-500"/>
                <StatCard title="Subscriptions" value={stats.subscriptions}  color="bg-blue-500"/>
                <StatCard title="Plans" value={stats.plans} color="bg-blue-500"/>
                <StatCard title="Active" value={stats.active} color="bg-green-500" />
                <StatCard title="Expired" value={stats.expired} color="bg-yellow-500" />
                <StatCard title="Canceled" value={stats.canceled} color="bg-red-500" />
                <StatCard title="Most Popular Plan" value={stats.mostPopularPlan} color="bg-purple-500" />
                <StatCard title="Subscriptions This Month" value={stats.thisMonth} color="bg-indigo-500" />

            </div>

            
        </AdminSidebarLayout>
    );
}
