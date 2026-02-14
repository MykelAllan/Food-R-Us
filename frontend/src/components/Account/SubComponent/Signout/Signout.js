import React, { useState } from 'react'
import './signout.css'

export const SignoutSub = ({ signOutHandler }) => {

    const [showConfirmation, setShowConfirmation] = useState(false)

    return (
        <div className='signout-content'>
            <button id='signout-btn' onClick={() => setShowConfirmation(true)}>Sign Out</button>
            {showConfirmation &&
                (
                    <Confirmation signOutHandler={signOutHandler} setShowConfirmation={setShowConfirmation} />
                )}
        </div>
    )
}


const Confirmation = ({ signOutHandler, setShowConfirmation }) => (
    <div className='signout-confirmation-container'>
        <div className='signout-confirmation-content'>
            <h3>Are you sure?</h3>
            <div className='signout-confirmation-buttons'>
                <button className='sc-btn' onClick={signOutHandler}>Sign Out</button>
                <button className='sc-btn' onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
        </div>
    </div >
);