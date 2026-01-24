import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import userRoutes from '@/routes/payment';

export default function PaymentRedirect({ subscriptionId }: { subscriptionId: number }) {
    const form = useForm({});

    useEffect(() => {
        form.post(userRoutes.checkout(subscriptionId).url);
    }, []);

    return (
        <div className="p-8 text-center">
            <h2 className="text-lg font-bold">Redirecting to payment...</h2>
            <p>Please wait</p>
        </div>
    );
}
