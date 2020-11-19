import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { Button } from 'antd';
import './CameraModuleStyle.css';

export default class CameraModule extends Component {

    //set up ref for the webcam, so we can take screenshot

    setRef = webcam => {
        this.webcam = webcam;
      };

    takeSnapShot(e){
        let imageSrc = this.webcam.getScreenshot();
        this.props.addFace(imageSrc)
    }

    render() {
        let videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
        return (
            <div className = "cameraWindow">
                 <Webcam
                    audio = {false}
                    screenshotFormat = "image/jpeg"
                    videoConstraints = {videoConstraints}
                    ref={this.setRef}
                    style={{
                        height: "600px",
                        width: "500px",
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -30%)',
                     }}
                />
                <Button danger className = "cameraBtn" onClick = {(e) => this.takeSnapShot(e)}>This is my face 👍</Button>
            </div>
        )
    }
}
