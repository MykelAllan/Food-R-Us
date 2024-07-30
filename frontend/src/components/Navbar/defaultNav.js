import React, { useContext, useState } from 'react';
import './navbar.css';
import 'boxicons';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { Alert } from './alert';

export const Navbar = ({ searchProductHandler }) => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { getTotalCart } = useContext(CartContext)
    const [productName, setProductName] = useState('')

    const total = getTotalCart()

    const activeLinkHandler = (path) => {
        setActiveLink(path);
    };


    const onSubmit = (e, productName) => {
        e.preventDefault()
        searchProductHandler(productName)
        setProductName('')
    }

    return (
        <header className="header">
            {/* alert for free shipping */}
            <Alert />
            <div className='header-top'>
                <div className='navbar-container'>
                    <div className='input-search-product'>
                        <form onSubmit={(e) => onSubmit(e, productName)}>
                            <input type='text' placeholder='Search Product' value={productName} onChange={(e) => setProductName(e.target.value)} required />

                            <button type='submit' className='search-submit' >
                                <box-icon size='sm' name='search' ></box-icon>
                            </button>
                        </form>
                    </div>
                    <div className='logo'>
                        <a href='/'>Food-R-Us</a>
                    </div>
                    <div className='header-actions'>
                        <li className='header-action sign-in' style={{ '--desc': '"Sign In"' }}>
                            <Link to="/auth/login" className={'nav-link'}>
                                Sign In
                            </Link>
                        </li>
                        <li className='header-action' style={{ '--desc': '"View Your Cart"' }}>
                            <Link
                                to="/cart"
                                className={`nav-link ${activeLink === '/cart' ? 'active' : ''}`}
                                onClick={() => activeLinkHandler('/cart')}
                            >
                                <box-icon color="#000" name="cart"></box-icon>
                                <span className='top-badge' >{total.totalItems}</span>
                            </Link>
                        </li>
                    </div>
                    <nav className="nav">
                        <ul className="nav-links">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className={`nav-link has-after ${activeLink === '/' ? 'active' : ''}`}
                                    onClick={() => activeLinkHandler('/')}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/#collection"
                                    className={`nav-link has-after ${activeLink === '/#collection' ? 'active' : ''}`}
                                    onClick={() => activeLinkHandler('/#collection')}
                                >
                                    Collection
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/shop"
                                    className={`nav-link has-after ${activeLink === '/shop' ? 'active' : ''}`}
                                    onClick={() => activeLinkHandler('/shop')}
                                >
                                    Shop
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >
        </header >
    );
};
