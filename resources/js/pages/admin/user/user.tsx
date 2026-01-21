import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

type User = {
    id: number;
    name: string;
    email: string;
    role: number;
};

export default function AdminUsers() {
    const page = usePage<{ users: User[] }>();
    const [users, setUsers] = useState<User[]>(page.props.users);

    const { delete: destroy, processing } = useForm({});

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: admin.dashboard().url },
        { title: 'Users', href: admin.users().url },
    ];

    function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this user?')) return;

        destroy(admin.users.destroy(id).url, {
            preserveScroll: true,
            onSuccess: () => {
                // ✅ حذف المستخدم من الجدول مباشرة
                setUsers(prev => prev.filter(user => user.id !== id));
            },
        });
    }

     return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Users</h1>
                    <Link
                        href={admin.users.create().url}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Add User
                    </Link>
                </div>

                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}

                        {users.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    {user.role === 0 ? 'User' : 'Admin'}
                                </td>
                                <td className="p-3 flex gap-3">
                                    <Link
                                        href={admin.users.edit(user.id).url}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        disabled={processing}
                                        onClick={() => handleDelete(user.id)}
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




