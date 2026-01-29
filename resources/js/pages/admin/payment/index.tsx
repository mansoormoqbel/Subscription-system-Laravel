import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

type Payment = {
    id: number;
    subscription: { id: number; user: { name: string } };
    amount: number;
    payment_method: string;
    payment_status: string;
    transaction_id: string;
    payment_date: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: admin.dashboard().url },
    { title: 'payments', href: admin.payment.pay().url },
];

export default function AdminPayments() {
    const page = usePage<{ payments: Payment[]; filters: { payment_status?: string; payment_method?: string } }>();
    const [paymentStatus, setPaymentStatus] = useState(page.props.filters.payment_status || '');
    const [paymentMethod, setPaymentMethod] = useState(page.props.filters.payment_method || '');
    const payments = page.props.payments;
    console.log(payments);
    function handleFilter(e: React.FormEvent) {
        e.preventDefault();
        router.get(admin.payment.pay().url, { payment_status: paymentStatus, payment_method: paymentMethod }, { preserveState: true });
    }

    return (
        <AdminSidebarLayout >
            <Head title="Payments" />
            <form onSubmit={handleFilter} className="mb-6 flex gap-3 flex-wrap">
                <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="border p-2 rounded bg-black text-white">
                    <option value="">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                </select>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="border p-2 rounded bg-black text-white">
                    <option value="" >All Methods</option>
                    <option value="card">Card</option>
                    <option value="paypal">Paypal</option>
                    <option value="manual">Manual</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
            </form>

            <table className="w-full border rounded-xl overflow-hidden">
                <thead className="bg-black-100">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">User</th>
                        <th className="p-3">Subscription ID</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Transaction</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {payments.length===0&&(
                            <tr>
                                <td colSpan={7} className="p-4 text-center text-gray-500">
                                    No payment found
                                </td>
                            </tr>
                        )}
                    {payments.map(p => (
                        <tr key={p.id} className="border-t">
                            <td className="p-3">{p.id}</td>
                            <td className="p-3">{p.subscription.user.name}</td>
                            <td className="p-3">{p.subscription.id}</td>
                            <td className="p-3">
                                ${p.amount ? Number(p.amount).toFixed(2) : '0.00'}
                            </td>

                            
                            <td className="p-3 capitalize">{p.payment_method}</td>
                            <td className="p-3 capitalize">{p.payment_status}</td>
                            <td className="p-3">{p.transaction_id}</td>
                            <td className="p-3">{new Date(p.payment_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminSidebarLayout>
    );
}




