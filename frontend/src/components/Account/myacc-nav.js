import React from 'react'
import { IoLocationOutline } from "react-icons/io5";

const links = [
  { page: 'myorders', icon: 'notepad', label: 'My Orders' },
  { page: 'wishlist', icon: 'heart', label: 'Wishlist' },
  { page: 'address', icon: <IoLocationOutline size="1.6em" />, label: 'Address' },
  { page: 'accountinfo', icon: 'user', label: 'Account Info' },
  { page: 'changepassword', icon: 'lock-alt', label: 'Change Password' },
  { page: 'signout', icon: 'log-out-circle', label: 'Sign Out' },
];

export const Navigation = (props) => {
  const { currentPage, setCurrentPage, togglePage } = props.data;

  const activeLinkHandler = (e, page) => {
    document.querySelectorAll('.myacc-nav-link').forEach(button => {
      button.classList.remove('active');
    });
    e.target.closest('.myacc-nav-link').classList.add('active');
    setCurrentPage(page);
  };

  return (
    <div className='myacc-nav-container'>
      <div className='myacc-title'><h1>My Account</h1></div>
      {links.map(link => (
        <div
          key={link.page}
          className={`myacc-nav-link ${currentPage === link.page ? 'active' : ''}`}
          onClick={(e) => activeLinkHandler(e, link.page)}
        >
          <div className='myacc-nav-link-icon'>
            {typeof link.icon === 'string' ? <box-icon name={link.icon}></box-icon> : link.icon}
          </div>
          <button onClick={togglePage}>{link.label}</button>
          <div className='myacc-nav-link-icon arrow'>
            <box-icon name='chevron-right'></box-icon>
          </div>
        </div>
      ))}
    </div>
  );
};
