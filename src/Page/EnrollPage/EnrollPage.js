import React, { Component } from 'react'
import './EnrollPageStyle.css';
import { Button } from 'antd';
import ReactDOM from 'react-dom';

export default class EnrollPage extends Component {
    
    state =  {personName: '', sentCreationRequest: false, personId:''}

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
        this.setState.personId = res.personId;
        const newElement = (
            <div className = 'pageBody'>
                <h1 className = 'greetTxt'> Hi {this.state.personName}, 👋. Please show me your face</h1>
            </div>
        )
        ReactDOM.render(newElement, document.getElementById('root'))
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
