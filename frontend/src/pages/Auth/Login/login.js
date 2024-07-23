import React, { useContext, useEffect, useState } from 'react'

import 'boxicons'
import '.././auth.css'

import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';



export const Login = () => {
  const { logInUser, isLoggedIn } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(isLoggedIn)
    const result = await logInUser(username, password)
    if (result) { //if success then navigate back to home 
      navigate('/')
      window.location.reload()

    } else {
      console.log('wrong username or password entered')
      setUsername('')
      setPassword('')
    }

  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [])



  return (
    <div className='auth-body container'>
      <a className='back-link' href="/">Home</a>
      <form className='auth-form center' onSubmit={loginHandler}>
        <h1>Login</h1>
        <div className='auth-form-inputs'>
          <div className='auth-form-input'>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
            <div className='icon'><box-icon color='#fff' name='user' type='solid' ></box-icon></div>
          </div>
          <div className='auth-form-input'>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <div className='icon'><box-icon color='#fff' name='lock-alt' type='solid' ></box-icon></div>
          </div>
          <input type="submit" value="Log in" className='auth-submit-btn auth-login' />
        </div>
        <div className='auth-link'>
          <label>Don't have an account?  <a href="/auth/register">Register</a>
          </label>
        </div>
      </form>

    </div>
  )
}
