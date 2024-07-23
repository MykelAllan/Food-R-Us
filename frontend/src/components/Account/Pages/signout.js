import React, { useState } from 'react'
import './myacc-pages.css'

export const Signout = (props) => {
    const { navigate, logOutUser } = props.data
    const [showConfirmation, setShowConfirmation] = useState(false)

    const signOutHandler = () => [
        navigate('/'),
        logOutUser()
    ]

    return (
        <div className='signout-content'>
            <h2>Sign Out?</h2>
            <button onClick={() => setShowConfirmation(true)}>Sign Out</button>
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
                <button onClick={signOutHandler}>Sign Out</button>
                <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
        </div>
    </div >
);