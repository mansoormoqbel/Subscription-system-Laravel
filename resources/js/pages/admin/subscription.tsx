import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

type Subscription = {
    id: number;
    user: { name: string };
    plan: { name: string };
    status: string;
    start_date: string;
    end_date: string;
};

type Filters = {
    searchUser?: string;
    searchPlan?: string;
    statusFilter?: string;
    dateFrom?: string;
    dateTo?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: admin.dashboard().url },
    { title: 'Subscriptions', href: admin.subscribe.getsub().url },
];

export default function AdminSubscriptions() {

    const page = usePage<{
        subscriptions: Subscription[];
        filters?: Filters;
        updatedSubscription?: { id: number; status: string };
    }>();

    // ✅ حماية من undefined
    const filters = page.props.filters ?? {};

    const [subscriptions, setSubscriptions] = useState<Subscription[]>(
        page.props.subscriptions ?? []
    );

    const [searchUser, setSearchUser] = useState(filters.searchUser ?? '');
    const [searchPlan, setSearchPlan] = useState(filters.searchPlan ?? '');
    const [statusFilter, setStatusFilter] = useState(filters.statusFilter ?? '');
    const [dateFrom, setDateFrom] = useState(filters.dateFrom ?? '');
    const [dateTo, setDateTo] = useState(filters.dateTo ?? '');

    /* 🔍 فلترة */
    function handleFilter(e: React.FormEvent) {
        e.preventDefault();

        router.get(
            admin.subscribe.getsub().url,
            { searchUser, searchPlan, statusFilter, dateFrom, dateTo },
            { preserveState: true, replace: true }
        );
    }

    /*  Edit */
    function goToEditPage(id: number) {
        router.get(admin.subscribe.edit(id).url);
    }

    /* ⏸ Suspend / Activate */
    function handleSuspend(id: number) {
        router.post(
            admin.subscribe.toggleStatus(id).url,
            {},
            {
                preserveState: true,
                onSuccess: (page) => {
                    const updated = (page.props as any).updatedSubscription as {
                        id: number;
                        status: string;
                    };

                    if (!updated) return;

                    setSubscriptions(prev =>
                        prev.map(sub =>
                            sub.id === updated.id
                                ? { ...sub, status: updated.status }
                                : sub
                        )
                    );
                },
            }
        );
    }

    /*  Cancel */
    function handleCancel(id: number) {
        router.post(
            admin.subscribe.cancel(id).url,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setSubscriptions(prev =>
                        prev.map(sub =>
                            sub.id === id
                                ? { ...sub, status: 'canceled' }
                                : sub
                        )
                    );
                },
            }
        );
    }

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscriptions" />

            <div className="p-6">

                {/* 🔍 البحث والفلترة */}
                <form onSubmit={handleFilter} className="mb-6 flex gap-3 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search User"
                        value={searchUser}
                        onChange={e => setSearchUser(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Search Plan"
                        value={searchPlan}
                        onChange={e => setSearchPlan(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="canceled">Canceled</option>
                        <option value="suspended">Suspended</option>
                    </select>
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={e => setDateFrom(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        value={dateTo}
                        onChange={e => setDateTo(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Filter
                    </button>
                </form>

                {/* 📋 جدول الاشتراكات */}
                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left">Plan</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Start</th>
                            <th className="p-3 text-left">End</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-4 text-center text-gray-500">
                                    No subscriptions found
                                </td>
                            </tr>
                        )}

                        {subscriptions.map(sub => (
                            <tr key={sub.id} className="border-t">
                                <td className="p-3">{sub.id}</td>
                                <td className="p-3">{sub.user.name}</td>
                                <td className="p-3">{sub.plan.name}</td>
                                <td className="p-3 capitalize">{sub.status}</td>
                                <td className="p-3">
                                    {new Date(sub.start_date).toLocaleDateString()}
                                </td>
                                <td className="p-3">
                                    {new Date(sub.end_date).toLocaleDateString()}
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSuspend(sub.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        {sub.status === 'active' ? 'Suspend' : 'Activate'}
                                    </button>

                                    {sub.status !== 'canceled' && (
                                        <button
                                            type="button"
                                            onClick={() => handleCancel(sub.id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    )}

                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </AdminSidebarLayout>
    );
}
