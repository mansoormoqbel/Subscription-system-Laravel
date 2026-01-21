import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

type PageProps = {
    user: {
        id: number;
        name: string;
        email: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: admin.users().url },
    { title: 'Edit User', href: '#' },
];

export default function EditUser() {
    const { user } = usePage<PageProps>().props;

    const form = useForm({
        name: user.name,
        email: user.email,
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(admin.users.update(user.id).url);
    };

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />

            <div className="p-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Edit User</h1>

                {/* Global Errors */}
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
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {/* {form.errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {form.errors.name}
                            </p>
                        )} */}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={e => form.setData('email', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {/* {form.errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {form.errors.email}
                            </p>
                        )} */}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1">
                            Password (leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            value={form.data.password}
                            onChange={e => form.setData('password', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {/* {form.errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {form.errors.password}
                            </p>
                        )} */}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                        <Link
                            href={admin.users().url}
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
