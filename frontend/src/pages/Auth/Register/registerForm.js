import React from 'react'

export const RegisterForm = (props) => {
    const { username, setUsername, password, setPassword, role, setRole, handleSubmit} = props.data
    return (
        <form className='auth-form center' onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className='auth-form-inputs'>
                <div className='auth-form-input'>
                    <label>Username <span>*</span></label>
                    <input
                        type="text"
                        name="username"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />

                    <div className='icon'><box-icon color='#fff' name='user' type='solid' ></box-icon></div>
                </div>
                <div className='auth-form-input'>
                    <label>Password <span>*</span></label>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <div className='icon'><box-icon color='#fff' name='lock-alt' type='solid' ></box-icon></div>
                </div>
                <div className="auth-form-input">
                    <label >Role <span>*</span></label>
                    <select
                        className="auth-form-select"
                        aria-label="role"
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <div className='icon'><box-icon color='#fff' name='down-arrow' type='solid' ></box-icon></div>

                </div>
                <input type="submit" value="Register" className='auth-submit-btn auth-register' />
            </div>
            <div className='auth-link'>
                <label>Already have an account?  <a href="/auth/login">Login</a>
                </label>
            </div>
        </form>
    )
}
