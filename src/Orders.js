import React, { useEffect, useState } from 'react';
import './Orders.css'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';


const Orders = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (user) {

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        }
        else {
            setOrders([]);
        }

    }, [user]);
    console.log(orders);
    console.log(db.collection('user'));
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {orders?.map(orderItem =>
                    <Order order={orderItem} />
                )}

                
            </div>

        </div>
    );
}

export default Orders;
