import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Appointment/Appointment/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const Payment = () => {

    const booking = useLoaderData()
    const navigation = useNavigation()
    // console.log(navigation);
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }

    const stripePromise = loadStripe('pk_test_51M6vTHBQnYBdNhzdMBWfTqvVoHwOv1Jo10ocHcfLFrvo8sFpPfwKJjDMg0SmNX3J9J1zTGWfjXir2I2jNasHNHZj00ZHwWXOnS');
    return (
        <div>
            <h1 className="text-2xl">Payment for {booking.treatment}</h1>
            <div className='my-6 w-96'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />


                </Elements>
            </div>
        </div>
    );
};

export default Payment;