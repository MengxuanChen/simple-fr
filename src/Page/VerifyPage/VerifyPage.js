import React, { Component } from 'react'
import CameraModule from '../../Components/CameraModule/CameraModule';

export default class VerifyPage extends Component {
    render() {
        return (
            <div className = 'pageBody'>
                <h1 className = 'greetTxt'> Hi 👋,  I am trying to recognize you</h1>
                <h1 className = 'greetTxt'> Please hold still</h1>
                <CameraModule />
            </div>
        )
    }
}
