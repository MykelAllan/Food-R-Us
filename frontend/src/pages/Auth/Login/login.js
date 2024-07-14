import React, { useContext, useState } from 'react'

import axios from 'axios';

import 'boxicons'
import '.././auth.css'
import { AppContext } from '../../../context/context';



export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {user, credentials, logInUser} = useContext(AppContext)



  const handleSubmit = async (e) => {
    e.preventDefault();
    //await logInUser(username, password)
    console.log(credentials)
  };


  return (
    <div className='auth-body container'>
      <a className='back-link' href="/">Home</a>
      <form className='auth-form center' onSubmit={handleSubmit}>
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
