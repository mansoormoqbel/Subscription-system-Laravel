import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';


type Plan= {
    id: number;
    name: string;
    price: number;
    duration_days?: number;
    is_active?: boolean;
    
}

export default function AdminUsers() {
    const page = usePage<{ plans: Plan[] }>();
    const [plans, setPlans] = useState<Plan[]>(page.props.plans);

    const { delete: destroy, processing } = useForm({});

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: admin.dashboard().url },
        { title: 'Plans', href: admin.plans().url },
    ];

    function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this Plans?')) return;

        destroy(admin.plans.destroy(id).url, {
            preserveScroll: true,
            onSuccess: () => {
                // ✅ حذف المستخدم من الجدول مباشرة
                setPlans(prev => prev.filter(plan => plan.id !== id));
            },
        });
    }

     return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Plans</h1>
                    <Link
                        href={admin.plans.create().url}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Add Plan
                    </Link>
                </div>

                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">price</th>
                            <th className="p-3 text-left">duration_days</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {plans.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}

                        {plans.map(plan => (
                            <tr key={plan.id} className="border-t">
                                <td className="p-3">{plan.id}</td>
                                <td className="p-3">{plan.name}</td>
                                <td className="p-3">{plan.price}</td>
                                <td className="p-3">{plan.duration_days}</td>
                                <td className="p-3">
                                    {plan.is_active == false ? 'Not Active' : 'Active'}
                                </td>
                                <td className="p-3 flex gap-3">
                                    <Link
                                        href={admin.plans.edit(plan.id).url}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        disabled={processing}
                                        onClick={() => handleDelete(plan.id)}
                                        className="text-red-600 hover:underline disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminSidebarLayout>
    );
}




