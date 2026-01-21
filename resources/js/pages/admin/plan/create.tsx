import { Head, useForm, Link } from '@inertiajs/react';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import admin from '@/routes/admin';

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        duration_days: '',
        description:'',
        is_active:'',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(admin.plans.store().url);
    }

    return (
        <AdminSidebarLayout>
            <Head title="Add Plan" />

            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Add Plan </h1>
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
                        placeholder="price"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />

                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        placeholder="Duration (days)"
                        value={data.duration_days}
                        onChange={e => setData('duration_days', e.target.value)}
                    />
                    <select
                        className="w-full border p-2 rounded"
                        value={data.is_active}
                        onChange={e => setData('is_active', e.target.value)}
                    >
                        <option  className="bg-black-100 text-gray-900">Select Status</option>
                        <option value="0" className="bg-black-100 text-gray-900">Not Active</option>
                        <option value="1" className="bg-black-100 text-gray-900">Active</option>
                    </select>
                    <textarea
                        className="w-full border p-2 rounded"
                        placeholder="Description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        rows={4}
                    />

                    <div className="flex gap-2">
                        <button
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save
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
