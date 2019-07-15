import React, { Component } from 'react';
import ContainedButton from './ContainedButton';
import '../css/login.css'



export default class Start extends Component {

    render() {
        return (
            <div className="container">
                <img src="../img/einstein.jpeg"></img>
                <div className="login-box">
                    <h1 className='header-logo'>Área de acesso restrito!</h1>
                    <div className='content'>
                            <ContainedButton /> 
                        </div>
                    </div>
            </div>
            
        );
    }
}