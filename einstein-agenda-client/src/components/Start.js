import React, { Component } from 'react';
import ContainedButton from './ContainedButton';



export default class Start extends Component {

    render() {
        return (

            <div className="login-box">
               <h1 className="header-logo">Área de acesso restrito</h1>
               <h3 className="header-logo">Você é um:</h3>
                <ContainedButton />
            </div>

            
        );
    }
}