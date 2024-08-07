import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignoutSub } from '../SubComponent/Signout/Signout'
import './myacc-pages.css'

export const Signout = (props) => {
    const { logOutUser, togglePage } = props.data
    const navigate = useNavigate()

    const signOutHandler = () => {
        navigate('/')
        logOutUser()
    }

    return (
        <div className='myacc-page-content'>
            <div className='page-content-title'>
                <div className='dashboard-back-icon' style={{ '--desc': '"Go Back"' }} onClick={togglePage}>
                    <box-icon color='#fff' name='chevron-left' ></box-icon>
                </div>
                <h2>Sign Out?</h2>


            </div>
            <div className='page-content-body'>
                <SignoutSub signOutHandler={signOutHandler} />
            </div>
        </div>
    )
}

