import React from 'react';
import './Checkout.css'
import Subtotal from './Subtotal';
import CheckoutItems from './CheckoutItems';
import { useStateValue } from './StateProvider';

const Checkout = () => {
    const [{basket, user}] = useStateValue();
    return (
        <div className = "checkout">
            <div className = "checkout_left">
                <img className = "checkout_ad" src = "https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"/>
                <div className  = "checkout_title">
                    <h3>hey....{user?.email}</h3>
                   <h2>Your Shopping Cart</h2>
                </div>
                {
                    basket.map(item => 
                        <CheckoutItems product = {item}/>
                    )
                }
               
            </div>
            <div className = "checkout_right">
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;
