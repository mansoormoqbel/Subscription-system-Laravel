import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
//import route from 'ziggy-js';

type Subscription = {
    id: number;
    user: { name: string };
    plan: { name: string };
    status: string;
    start_date: string;
    end_date: string;
};
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin  Dashboard ', href: admin.dashboard().url },
    { title: 'Subscription', href: admin.subscribe.getsub().url },
];
export default function AdminSubscriptions() {
    const page = usePage<{
        subscriptions: Subscription[],
        filters: { searchUser: string, searchPlan: string, statusFilter: string, dateFrom: string, dateTo: string }
    }>();

    const subscriptions = page.props.subscriptions;
    const [searchUser, setSearchUser] = useState(page.props.filters.searchUser || '');
    const [searchPlan, setSearchPlan] = useState(page.props.filters.searchPlan || '');
    const [statusFilter, setStatusFilter] = useState(page.props.filters.statusFilter || '');
    const [dateFrom, setDateFrom] = useState(page.props.filters.dateFrom || '');
    const [dateTo, setDateTo] = useState(page.props.filters.dateTo || '');

    function handleFilter(e: React.FormEvent) {
        e.preventDefault();
        router.get(admin.subscribe.getsub().url, {
            searchUser,
            searchPlan,
            statusFilter,
            dateFrom,
            dateTo,
        }, { preserveState: true, replace: true });
}

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <Head title="Subscriptions" />

                {/* 🔍 Form البحث والفلترة */}
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
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border p-2 bg-black-100  rounded">
                        <option value="" className='bg-black-100'>All Status</option>
                        <option value="active" className='bg-black-100'>Active</option>
                        <option value="expired" className='bg-black-100'>Expired</option>
                        <option value="canceled" className='bg-black-100'>Canceled</option>
                        <option value="suspended" className='bg-black-100'>Suspended</option>
                    </select>
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border p-2 rounded" />
                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border p-2 rounded" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
                </form>

                {/* 📋 جدول الاشتراكات */}
                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left">Plan</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Start Date</th>
                            <th className="p-3 text-left">End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
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
                                <td className="p-3">{new Date(sub.start_date).toLocaleDateString()}</td>
                                <td className="p-3">{new Date(sub.end_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminSidebarLayout>
    );
}
