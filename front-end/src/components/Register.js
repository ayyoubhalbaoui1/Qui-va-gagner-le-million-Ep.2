import React from 'react'
import '../index.css';
import Login from './Login'
import SignUp from './SignUp'
import logo from '../logo.png'


export default function Register() {
    return (
        <div className="forms-container">
            <img src={logo} className="logo" alt="logo"/>
            {/* <Login /> */}
            {/* <div className="line"></div> */}
            <SignUp />
        </div>
    )
}
