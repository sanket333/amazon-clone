import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutItems from "./CheckoutItems";
import CurrencyFormat from "react-currency-format";

const Order = ({order}) => {
    console.log(order);
    return (
        <div className = "order">
            <h2>Order</h2>
            <p>
                {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
            <p className = "order_id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutItems 
                    product = {item}
                    hideButton
                />
            ))}
            <CurrencyFormat
                    renderText={(value) =>
                        <h3 className = "order_total">Order Total : {value}</h3>

                    }
                    decimalScale={2}
                    value={order.data?.amount / 100}
                    displayType="text"
                    thousandSeparator={true}
                    prefix={'$'}
            />
        </div>
    );
}

export default Order;
