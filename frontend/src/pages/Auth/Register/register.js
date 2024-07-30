import React, { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from './registerForm';




export const Register = () => {
    const { registerUser, isLoggedIn } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER') //default role

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();


        const newUser = {
            username: username,
            password: password,
            role: role
        };
        await registerUser(newUser)
        setPassword('')
        setUsername('')
        setRole('USER')
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [])


    return (
        <div className='auth-body container'>
            <a className='back-link' href="/">Home</a>
            <RegisterForm data={{ username, setUsername, password, setPassword, role, setRole, handleSubmit }} />
        </div>
    )
}
