import React from 'react';
import './CheckoutItems.css'
import { useStateValue } from './StateProvider';

const CheckoutItems = ({ product, hideButton }) => {
    const[{basket}, dispatch] = useStateValue();
    const removeItem = () =>{

        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id : product.id
        })
    }
    return (
        <div className="checkout_items">
            <img className="checkout_itemsImage" src={product.image} />
            <div className="checkout_itemDetails">
                
                    <p className="checkout_itemTitle">
                        {product.title}
                    </p>
                    <div className="checkout_itemPrice">
                        <small>$</small>
                        <strong>{product.price}</strong>
                    </div>
                    <div className="checkout_itemsRating">
                        {Array(product.rating).fill().map((i) => {
                            return <p>&#11088;</p>
                        })}

                    </div>
                
                {!hideButton && <button onClick = {() => removeItem()}>Remove form the Cart</button>}
            </div>
        </div>
    );
}

export default CheckoutItems;
