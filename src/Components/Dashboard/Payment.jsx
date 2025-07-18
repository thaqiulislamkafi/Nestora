import React, { use, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import Loading from '../SharedElement/Loading';
import { AuthContext } from '../Provider/AuthProvider';

// Load Stripe
const stripePromise = loadStripe(`${import.meta.env.VITE_REACT_APP_STRIP_KEY}`);

const Payment = () => {

    const axiosSecure = useAxios();
    const { currentUser } = use(AuthContext)
    const { propertyId } = useParams();

    const { data: property, isLoading } = useQuery({
        queryKey: ['property-payment', propertyId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/property/payment?email=${currentUser.email}&propertyId=${propertyId}`);
            return data;
        },
        enabled: !!currentUser.email && !!propertyId,
    });

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md mt-10">
            <h2 className="text-xl font-bold mb-4">Property Payment</h2>
            <p className="text-sm text-gray-700 mb-2">Property: {property?.propertyTitle}</p>
            <p className="text-sm text-gray-700 mb-4">Offer Amount: ৳{property?.offerAmount?.toLocaleString()}</p>

            <Elements stripe={stripePromise}>
                <CheckoutForm property={property} />
            </Elements>
        </div>
    );
};

export default Payment;

const CheckoutForm = ({ property }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);
        const card = elements.getElement(CardElement)


        try {

            const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card })

            if (error)
                setError(error);
            else {
                console.log('[PaymentMethod]', paymentMethod)
                setError('');
                const { data: clientRes } = await axiosSecure.post('/create-payment-intent', {
                    propertyId: property.propertyId,
                    amount: property.offerAmount,
                    userEmail: property.userEmail
                });

                const result = await stripe.confirmCardPayment(clientRes.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: property.userName,
                            email: property.userEmail,
                        },
                    },
                });
                console.log(result)

                if (result.error) {
                    setError(result.error.message);
                    Swal.fire('Error!', result.error.message, 'error');
                } else {
                    setError('');
                    if (result.paymentIntent.status === 'succeeded') {
                        Swal.fire('Success!', 'Payment completed successfully.', 'success');
                    }
                }
            }


        } catch (error) {
            console.error(error);
            Swal.fire('Error!', error.message, 'error');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};


