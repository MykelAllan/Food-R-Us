import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { MyOrders } from './Pages/myorders'
import { Wishlist } from './Pages/wishlist'
import { Address } from './Pages/address'
import { AccountInfo } from './Pages/accountinfo'
import { ChangePassword } from './Pages/changepassword'
import { Signout } from './Pages/signout'

export const MyAccContent = (props) => {
    const { userRole } = useContext(AuthContext)
    const { navigate, user, logOutUser, currentPage } = props.data

    const adminHandler = () => {
        if (userRole === 'ADMIN') {
            navigate('/admin/dashboard')
        }
    }


    const currentPageHandler = () => {
        switch (currentPage) {
            case "myorders":
                return <MyOrders />
            case "wishlist":
                return <Wishlist />
            case "address":
                return <Address />
            case "accountinfo":
                return <AccountInfo />
            case "changepassword":
                return <ChangePassword />
            case "signout":
                return <Signout data={{ navigate, logOutUser }} />
        }

    }


    return (
        <div className='myacc-content-container'>
            <div className='myacc-content-header'>
                <h1>Welcome Back, <span>{user}</span>!</h1>
                {userRole === 'ADMIN' && <button className='admin-access-btn' onClick={adminHandler}>Access Admin Dashboard</button>}

            </div>
            {/* current page */}
            {currentPageHandler()}

        </div>
    )
}
