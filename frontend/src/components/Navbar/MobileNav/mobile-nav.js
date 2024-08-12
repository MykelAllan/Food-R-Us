import React from 'react'

import { Link, useLocation } from 'react-router-dom';
import './mobile-nav.css'

export const MobileNav = (props) => {
    const { scrollToCollection, activeLink, activeLinkHandler, toggleMobileNavbar, onSubmit, productName, setProductName } = props.data

    return (
        <div className='mobile-nav-sidebar'>
            <div className='mobile-nav-container' id='mobile-navbar'>
                <div className='mobile-nav-logo-toggle'>
                    <div className='logo'>
                        <a href='/'>Food-R-Us</a>
                    </div>
                    <div className='nav-menu-mobile-close-btn' onClick={toggleMobileNavbar}>
                        <box-icon size='md' name='x'></box-icon>
                    </div>
                </div>
                <div className='mobile-nav'>
                    <nav className="nav">
                        <ul className="nav-links">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className={`nav-link has-after ${activeLink === '/' ? 'active' : ''}`}
                                    onClick={() => {
                                        activeLinkHandler('/')
                                        toggleMobileNavbar()
                                    }}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/#collection"
                                    className={`nav-link has-after ${activeLink === '/#collection' ? 'active' : ''}`}
                                    onClick={() => {
                                        activeLinkHandler('/#collection')
                                        scrollToCollection()
                                        toggleMobileNavbar()
                                    }}
                                >
                                    Collection
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/shop"
                                    className={`nav-link has-after ${activeLink === '/shop' ? 'active' : ''}`}
                                    onClick={() => {
                                        activeLinkHandler('/shop')
                                        toggleMobileNavbar()
                                    }}
                                >
                                    Shop
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='input-search-product'>
                    <form onSubmit={(e) => onSubmit(e, productName)}>
                        <input type='text' placeholder='Search Product' value={productName} onChange={(e) => setProductName(e.target.value)} required />

                        <button type='submit' className='search-submit' >
                            <box-icon size='sm' name='search' ></box-icon>
                        </button>
                    </form>
                </div>
            </div>
            <div className='navbar-mobile-overlay' id='navbar-mobile-overlay' onClick={toggleMobileNavbar}></div>
        </div>
    )
}
