import React, { Component } from 'react'
import './EnrollPageStyle.css';
import { Button } from 'antd';
import ReactDOM from 'react-dom';
import CameraModule from '../../Components/CameraModule/CameraModule';

export default class EnrollPage extends Component {
    state = {perosnName:'', personId:''}
    constructor(props) {
        super(props);
        this.enrollment = this.enrollment.bind(this);
    }

    handleChange = (e) => {
        this.setState({personName: e.target.value});
    }

    creatPerson(e){
        {   fetch(process.env.REACT_APP_API_ENDPOINT, {
                method: 'post',
                headers: {
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY
                },
                body:JSON.stringify({
                    name: this.state.personName,
                  })
            }).then(response => response.json())
              .then(json => this.personResponseHandler(json))
              .catch(err => console.log('Request Fail', err));
        }
    }
    
    personResponseHandler(res){
        this.setState({personId: res.personId})
        const newElement = (
            <div className = 'pageBody'>
                <h1 className = 'greetTxt'> Hi 👋{this.state.personName},  please show me your face</h1>
                <h1 className = 'greetTxt'> Please hold still</h1>
                <CameraModule enrollment = {this.enrollment} isEnroll = {true} personId = {this.state.personId}/>
            </div>
        )
        ReactDOM.render(newElement, document.getElementById('root'))
    }

    enrollment(res){
        if (res.length !== 0){
            this.trainPersonGroup();
        }else{
            const newElement = (
            <div className = 'pageBody'>
                <h1 className = 'greetTxt'> Hi 👋{this.state.personName},  I cannot see your face</h1>
                <h1 className = 'greetTxt'> Please hold still and show me again</h1>
                <CameraModule  isEnroll = {true} personId = {this.state.personId}/>
            </div>
            )
            ReactDOM.render(newElement, document.getElementById('root'))
        }
    }

    trainPersonGroup(){
        fetch(process.env.REACT_APP_API_ENDPOINT_TRAIN, {
            method: 'post',
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY
            }
        }).then(this.getTrainStatus())
          .catch(err => console.log('Train_Request Fail', err));
    }

    getTrainStatus(){
        let status = '';
       fetch(process.env.REACT_APP_API_ENDPOINT_STATUS, {
            method: 'get',
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY
            }
        }).then(res => {status = res.status;
                        console.log(status);})
        .catch(err => console.log('Get_Training_Status Request Fail', err));
    }

    render() {
        return (
            <div className = 'pageBody'>
              <h1 className = 'nameInput'> 
                My name is <input type="text" className="text-line" value = {this.state.personName} onChange= {this.handleChange} />
                <Button danger className = "personBtn" onClick = {(e) => this.creatPerson(e)}>Hi 👋</Button> </h1>
            </div>   
        )
    }
}
