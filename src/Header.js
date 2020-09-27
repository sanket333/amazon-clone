import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.css';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
const Header = () => {
    const [{ basket, user }] = useStateValue();
    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </Link>
            <div className="header_search">
                <input className="header_searchinput" type="text" />

                <SearchIcon className="header_searchIcon" />

            </div>

            <div className="header_name">
                <Link to={!user && '/login'}>
                    <div onClick = {handleAuthentication} className="header_option">

                        <span className="header_optionLineOne">Hello {user ? user.email : 'Guest'}</span>

                        <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>

                    </div>
                </Link>
                <Link to = "/orders">
                <div className="header_option">
                    <span className="header_optionLineOne">Returns</span>
                    <span className="header_optionLineTwo">& Orders</span>
                </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <div className="header_optionbasket header_optionLineTwo">
                    <Link to="/checkout">
                        <ShoppingBasketIcon className="header_basketlogo" />
                    </Link>
                    <span className="header_basketCount">{basket?.length}</span>
                </div>

            </div>
        </div>
    );
}

export default Header;
