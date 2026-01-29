import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';


type Subscription = {
    id: number;
    start_date: string;
    end_date: string;
    status: 'active' | 'expired' | 'canceled' | 'suspended';
    auto_renew: boolean;
    user: {
        id: number;
        name: string;
        email: string;
    };
    plan: {
        id: number;
        name: string;
        price: number;
    };
};


export default function AdminUsers() {
    const page = usePage<{ subscriptions: Subscription[] }>();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(page.props.subscriptions || []);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: admin.dashboard().url },
        { title: 'Plans', href: admin.plans().url },
    ];

    

     return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />

            <div className="p-6">
                

                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left">Plan</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Start</th>
                            <th className="p-3 text-left">End</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subscriptions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No subscriptions found
                                </td>
                            </tr>
                        )}

                        {subscriptions.map(sub => (
                            <tr key={sub.id} className="border-t">
                                <td className="p-3">{sub.id}</td>
                                <td className="p-3">{sub.user.name}</td>
                                <td className="p-3">{sub.plan.name}</td>
                                <td className="p-3">{sub.status}</td>
                                <td className="p-3">{sub.start_date}</td>
                                <td className="p-3">{sub.end_date}</td>
                               
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminSidebarLayout>
    );
}




