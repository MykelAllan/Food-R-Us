import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { MyOrders } from './Pages/myorders'
import { Wishlist } from './Pages/wishlist'
import { Address } from './Pages/address'
import { AccountInfo } from './Pages/accountinfo'
import { ChangePassword } from './Pages/changepassword'
import { Signout } from './Pages/signout'

export const MyAccContent = (props) => {
    const { userRole } = useContext(AuthContext)
    const { navigate, user, logOutUser, currentPage, togglePage } = props.data
    
    const adminHandler = () => {
        if (userRole === 'ADMIN') {
            navigate('/admin/dashboard')
        }
    }

    const currentPageHandler = () => {
        switch (currentPage) {
            case "myorders":
                return <MyOrders data={{ togglePage }} />
            case "wishlist":
                return <Wishlist data={{ togglePage }} />
            case "address":
                return <Address data={{ togglePage }} />
            case "accountinfo":
                return <AccountInfo data={{ togglePage }} />
            case "changepassword":
                return <ChangePassword data={{ togglePage }} />
            case "signout":
                return <Signout data={{ navigate, logOutUser, togglePage }} />
        }
    }

    return (
        <div className='myacc-content-container'>
            <div className='myacc-content-header'>
                <h1>Welcome Back, <span>{user}</span>!</h1>
                {userRole === 'ADMIN' && <button className='admin-access-btn' onClick={adminHandler}>Access Admin Dashboard</button>}
            </div>
            <div className='myacc-page-container' id='myacc-page-container'>
                {currentPageHandler()}
            </div>

        </div>
    )
}
