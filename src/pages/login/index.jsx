import React from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { PasswordInput, TextInput } from '../../components/formFields';


const Login = () => {
    const { handleSubmit, control } = useForm();
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data);
        navigate('/my-group')
    }
    
    return (
        <>
            <div className='login-wrapper'>
                <div className='login-content'>
                    <div className='login-header'>
                        <h3>Login</h3>
                        <p>Welcome to.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextInput control={control} name="email" placeholder="Enter your email id" label='Email ID'/>
                        <PasswordInput control={control} name="Password" placeholder="Enter your password" label='Password'/>
                        <div className='forgot-pass'>
                            <Link to='#/'>Forgot Password?</Link>
                        </div>
                        <button type='submit' className="btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login