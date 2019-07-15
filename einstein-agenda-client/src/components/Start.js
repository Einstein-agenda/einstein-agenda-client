import React, { Component } from 'react';
import ContainedButton from './ContainedButton';
import '../css/login.css'



export default class Start extends Component {

    render() {
        return (
            <div className="container">
                <div className="login-box">
                    <h1 className="header-logo">Área de acesso restrito!</h1>
                    <div className="align">
                            <h3 className="header-logo"> Você é um:</h3>
                            <ContainedButton /> 
                        </div>
                    </div>
            </div>
            
        );
    }
}