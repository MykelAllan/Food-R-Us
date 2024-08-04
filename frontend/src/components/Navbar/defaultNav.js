import React, { useContext, useState } from 'react';
import './navbar.css';
import 'boxicons';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { Alert } from './alert';

// mobile navbar
import { MobileNav } from './MobileNav/mobile-nav';


export const Navbar = ({ searchProductHandler }) => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { getTotalCart } = useContext(CartContext)
    const [productName, setProductName] = useState('')
    const [isMobileNavVisible, setMobileNavVisible] = useState(true)

    const total = getTotalCart()

    const activeLinkHandler = (path) => {
        setActiveLink(path);
    };


    //search product submit handler
    const onSubmit = (e, productName) => {
        e.preventDefault()
        searchProductHandler(productName)
        setProductName('')
    }

    //toggle mobile navbar
    const toggleMobileNavbar = () => {
        const mobileNav = document.getElementById('mobile-navbar')
        const mobileNavOverlay = document.getElementById('navbar-mobile-overlay')

        if (isMobileNavVisible) {
            setMobileNavVisible(!isMobileNavVisible)
            mobileNav.classList.add('active')
            mobileNavOverlay.classList.add('active')
            mobileNavOverlay.style.display = 'block'
        } else {
            setMobileNavVisible(!isMobileNavVisible)
            mobileNav.classList.remove('active')
            mobileNavOverlay.classList.remove('active')
            mobileNavOverlay.style.display = 'none'
        }

    }

    return (
        <header className="header">
            {/* alert for free shipping */}
            <Alert />
            <div className='header-top'>
                <div className='navbar-container'>
                    <div className='nav-menu-mobile-open-btn' onClick={toggleMobileNavbar}>
                        <box-icon size='md' name='menu' ></box-icon>
                    </div>
                    <div className='input-search-product'>
                        <form onSubmit={(e) => onSubmit(e, productName)}>
                            <input type='text' placeholder='Search Product' value={productName} onChange={(e) => setProductName(e.target.value)} required />
                            <button type='submit' className='search-submit' >
                                <box-icon size='sm' name='search' ></box-icon>
                            </button>
                        </form>
                    </div>
                    <div className='logo'>
                        <Link to='/'> <a>Food-R-Us</a></Link>
                    </div>
                    <div className='header-actions'>
                        <li className='header-action sign-in' style={{ '--desc': '"Sign In"' }}>
                            <Link to="/auth/login" className={'nav-link'}>
                                Sign In
                            </Link>
                        </li>

                    </div>
                    <nav className="nav lap-desk-nav">
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
                {/* mobile navbar */}
                <MobileNav data={{ activeLink, activeLinkHandler, toggleMobileNavbar }} />
            </div >
        </header >
    );
};
