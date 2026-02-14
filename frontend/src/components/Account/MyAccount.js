import React, { useContext, useEffect, useState } from 'react'
import { MyAccContent } from './myacc-content'
import { Navigation } from './myacc-nav'
import { useNavigate } from 'react-router-dom'

import './myacc.css'
import { AuthContext } from '../../context/authContext'

export const MyAccount = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState('myorders')//default
  const [isPageVisible, setPageVisible] = useState(true)
  const navigate = useNavigate()


  const togglePage = () => {
    const contentContainer = document.getElementById('myacc-page-container')

    setPageVisible(!isPageVisible)
    if (isPageVisible) {
      contentContainer.classList.add('active')
    } else {
      contentContainer.classList.remove('active')
    }

  }


  //navigates to home if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [])

  return (
    <div className='myacc-container'>
      <div className='myacc-content'>
        <Navigation data={{ currentPage, setCurrentPage, togglePage }} />
        <MyAccContent data={{ navigate, logOutUser, user, currentPage, setCurrentPage, togglePage }} />
      </div>
    </div>
  )
}
