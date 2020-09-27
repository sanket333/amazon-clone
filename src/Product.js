import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';


const Product = ({ id, title, price, image, rating}) => {
    const history = useHistory();
    const [{basket, user}, dispatch]  = useStateValue();
    
    const addToCart = () => {
        console.log();
        
        dispatch({
            type : 'ADD_TO_BASKET',
            item : {
               
               id : id,
               title : title,
               price :  price,
               image : image,
               rating : rating
            },
            
        })
    }
    return (
        <div className = "product">
            <div className = "product_info">
                <p>{title}</p>
                <p className = "product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className = "product_rating">
                    {Array(rating).fill().map((i)=> {
                       return  <p>&#11088;</p>
                    })}
                    
                </div>
            </div>
            <img src = {image}/>
            <button onClick = {() => !user ? history.push('/login') : addToCart()}>Add To Cart</button>
        </div>
    );
}

export default Product;
