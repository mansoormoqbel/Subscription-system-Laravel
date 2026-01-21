import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

type PageProps = {
    plan: {
        id: number;
        name: string;
        price: number;
        duration_days?: number;
        description?: string;
        is_active?: boolean;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Plans', href: admin.plans().url },
    { title: 'Edit Plan', href: '#' },
];

export default function EditPlan() {
    const { plan } = usePage<PageProps>().props;

    const form = useForm({
        name: plan.name ?? '',
        price: plan.price ?? '',
        duration_days: plan.duration_days ?? '',
        description: plan.description ?? '',
        is_active: plan.is_active ? '1' : '0',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(admin.plans.update(plan.id).url);
    };

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Plan" />

            <div className="p-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Edit Plan</h1>

                {/* Errors */}
                {Object.keys(form.errors).length > 0 && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        <ul className="list-disc pl-5">
                            {Object.values(form.errors).map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-1">Price</label>
                        <input
                            type="number"
                            
                            className="w-full border p-2 rounded"
                            value={form.data.price}
                            onChange={e => form.setData('price', Number(e.target.value))}
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block mb-1">Duration (days)</label>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={form.data.duration_days}
                            onChange={e =>
                                form.setData('duration_days', e.target.value)
                            }
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            rows={4}
                            className="w-full border p-2 rounded"
                            value={form.data.description}
                            onChange={e =>
                                form.setData('description', e.target.value)
                            }
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-1">Status</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={form.data.is_active}
                            onChange={e =>
                                form.setData('is_active', e.target.value)
                            }
                        >
                            <option value="0" className="bg-gray-100 text-gray-900">Not Active</option>
                            <option value="1" className="bg-gray-100 text-gray-900">Active</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>

                        <Link
                            href={admin.plans().url}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminSidebarLayout>
    );
}
