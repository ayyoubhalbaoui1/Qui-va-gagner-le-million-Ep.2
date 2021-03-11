import React from 'react'
import CreateGrp from './CreateGrp'
import JoinGrp from './JoinGrp'
import logo from '../logo.png'

export default function Group() {
    return (
        <div className="group-container">
            <img src={logo} className="logo" alt="logo"/>
            <CreateGrp/>
            <div className="line"></div>
            <JoinGrp/>
        </div>
    )
}
