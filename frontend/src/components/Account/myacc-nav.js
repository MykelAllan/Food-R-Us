import React, { useContext } from 'react'
import { IoLocationOutline } from "react-icons/io5";


export const Navigation = (props) => {
  const { navigate, logOutUser, currentPage, setCurrentPage } = props.data
  const { } = props.data

  const activeLinkHandler = (e, page) => {
    console.log(currentPage)
    //removes active class
    document.querySelectorAll('.myacc-nav-link').forEach(button => {
      button.classList.remove('active');
    })

    //adds the active class
    e.target.closest('.myacc-nav-link').classList.add('active');

    //sets current page
    setCurrentPage(page)
  }

  const signOutHandler = () => {
    navigate('/')
    logOutUser()


  }
  return (
    <div className='myacc-nav-container'>
      <div className='myacc-title'><h1>My Account</h1></div>
      <div className='myacc-nav-link active' onClick={(e) => activeLinkHandler(e, 'myorders')}>
        <div className='myacc-nav-link-icon'>
          <box-icon name='notepad'></box-icon>
        </div>
        <button >My Orders</button>
      </div>
      <div className='myacc-nav-link' onClick={(e) => activeLinkHandler(e, 'wishlist')}>
        <div className='myacc-nav-link-icon'>
          <box-icon name='heart'></box-icon>
        </div>
        <button >Wishlist</button>
      </div>

      <div className='myacc-nav-link' onClick={(e) => activeLinkHandler(e, 'address')}>
        <div className='myacc-nav-link-icon'>
          <IoLocationOutline size="1.6em" />

        </div>
        <button>Address</button>
      </div>
      <div className='myacc-nav-link' onClick={(e) => activeLinkHandler(e, 'accountinfo')}>
        <div className='myacc-nav-link-icon'>
          <box-icon name='user' ></box-icon>
        </div>
        <button>Account Info</button>
      </div>
      <div className='myacc-nav-link' onClick={(e) => activeLinkHandler(e, 'changepassword')}>
        <div className='myacc-nav-link-icon'>
          <box-icon name='lock-alt'></box-icon>
        </div>
        <button>Change Password</button>
      </div>
      <div className='myacc-nav-link' onClick={(e) => activeLinkHandler(e, 'signout')}>
        <div className='myacc-nav-link-icon'>
          <box-icon name='log-out-circle'></box-icon>
        </div>
        <button>Sign Out</button>
      </div>
    </div>
  )
}
