import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

const CheckoutForm = ({ booking }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState("");

    const { price, email, patient, _id } = booking
    // console.log(price)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('AccessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
            console.log(error)
        } else {
            setCardError("")
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email,
                        name: patient
                    },
                },
            },
        );

        if (confirmError) {
            return setCardError(confirmError.message)
        }
        if (paymentIntent.status === "succeeded") {
            const payment = {
                transactionId: paymentIntent.id,
                price,
                email,
                bookingId: _id
            }
            // console.log(paymentIntent);
            fetch("http://localhost:5000/payment", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem("AccessToken")}`
                },
                body: JSON.stringify(payment)

            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        setSuccess(`Congratulatiomn!!!!`)
                        setTransactionId(paymentIntent.id)
                    }
                })
        }
        setProcessing(false)


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-6' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success &&
                <> <p className='text-green-500'>{success}</p>
                    <p >Transaction Id : {transactionId}</p>
                </>
            }
        </>
    );
};

export default CheckoutForm;