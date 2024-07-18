import React, { useContext, useState } from 'react';
import '../styles/navbar.css';
import 'boxicons';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/context';
import { CartContext } from '../context/cartContext';

export const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { getTotalCart } = useContext(CartContext)

  const total = getTotalCart()

  const activeLinkHandler = (path) => {
    setActiveLink(path);
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
              onClick={() => activeLinkHandler('/')}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shop"
              className={`nav-link ${activeLink === '/shop' ? 'active' : ''}`}
              onClick={() => activeLinkHandler('/shop')}
            >
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cart"
              className={`nav-link ${activeLink === '/cart' ? 'active' : ''}`}
              onClick={() => activeLinkHandler('/cart')}
            >
              <box-icon color="#c3E956" name="cart"></box-icon> Cart
              <span className='cart-totalItems' >{total.totalItems}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/newproduct"
              className={`nav-link ${activeLink === '/newproduct' ? 'active' : ''}`}
              onClick={() => activeLinkHandler('/newproduct')}
            >
              Create Product
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
