import React, { useContext, useEffect, useState } from 'react'
import { MyAccContent } from './myacc-content'
import { Navigation } from './myacc-nav'
import { useNavigate } from 'react-router-dom'

import './myacc.css'
import { AuthContext } from '../../context/authContext'

export const MyAccount = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState('myorders')//default
  const navigate = useNavigate()



  //navigates to home if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [])

  return (
    <div className='myacc-container'>

      <div className='myacc-content'>
        <Navigation data={{ currentPage, setCurrentPage }} />
        <MyAccContent data={{ navigate, logOutUser, user, currentPage, setCurrentPage }} />
      </div>
    </div>
  )
}
