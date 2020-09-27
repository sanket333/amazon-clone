import React, { useState, useEffect } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider';
import { Link, useHistory } from "react-router-dom";
import CheckoutItems from './CheckoutItems';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from './firebase';

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const getClientSecret = async() => {
            const response = await axios({
                method : 'post',
                url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret(); 
    }, [basket]);
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        setProcessing(true);

        const payload  = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket : basket,
                    amount : paymentIntent.amount,
                    created : paymentIntent.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch ({
                type : 'EMPTY_BASKET'
            })

            history.replace('./orders');
        })
    }
    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(error ? event.error.message : "");
    }


    return (
        <div className="payment">
            <h1>
                CheckOut (<Link to="/checkout">
                    {basket?.length} Items
                </Link>)
            </h1>
            <div className="payment_container">
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.title}</p>
                        <p>Ring Lane, Gopalmal</p>
                        <p>Odisha,India</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item =>
                            <CheckoutItems product={item} />
                        )}
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) =>
                                        <h3>Order Total : {value}</h3>

                                    }
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType="text"
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
