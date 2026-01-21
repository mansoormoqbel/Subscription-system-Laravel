import { Head, useForm, Link } from '@inertiajs/react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(admin.users.store().url);
    }

    return (
        <AdminSidebarLayout>
            <Head title="Add User" />

            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Add User</h1>
                {Object.keys(errors).length > 0 && (
                    <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>
                        <ul>
                            {Object.values(errors).map((error,i)=>(
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}    
                <form onSubmit={submit} className="space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />

                    <input
                        type="password"
                        className="w-full border p-2 rounded"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />

                    <div className="flex gap-2">
                        <button
                            disabled={processing}
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
