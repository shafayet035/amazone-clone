import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../Store/StateProvide';
import { auth } from '../../firebase';

const Header = () => {
    const [{cart, user}, dispatch] = useStateValue()

    const authHandler = () => {
        if(user) {
            auth.signOut()
        }
    }

    return (
        <div className="header">
            <div className="logo">
               <Link to="/">
                  <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
               </Link>
            </div>
            <div className="search_bar">
                <input type="text"/>
                <SearchIcon className="search_icon" />
            </div>
            <nav className="navbar">
                <div className="navItem">
                    <Link to={!user && "/authentication"}>
                        <div onClick={authHandler}>
                            <span className="navItem_top">
                            Hello {user ? `${user.email}` : "guest"}
                            </span>
                            <span className="navItem_bottom">
                                {user ? 'Sign out' : 'Sign in'}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="navItem">
                    <Link to="orders">
                      <span className="navItem_top">
                            Return
                      </span>
                      <span className="navItem_bottom">
                        &Orders
                      </span>
                    </Link>
                </div>
                <div className="navItem">
                    <Link to="/checkout">
                        <span className="cart">
                        <ShoppingCartIcon />   <div className="cart_total_num">{cart?.length}</div>
                        </span>
                    </Link>
                    
                </div>
            </nav>
        </div>
    )
}

export default Header
