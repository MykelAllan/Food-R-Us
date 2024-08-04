import React from 'react'

export const ChangePassword = (props) => {
    const { togglePage } = props.data
    return (
        <div className='myacc-page-content'>
            <div className='page-content-title'>
                <div className='dashboard-back-icon' style={{ '--desc': '"Go Back"' }} onClick={togglePage}>
                    <box-icon color='#fff' name='chevron-left' ></box-icon>
                </div>
                <h1>Change Password</h1>
            </div>
            <div className='page-content-body'>

            </div>
        </div>
    )
}
