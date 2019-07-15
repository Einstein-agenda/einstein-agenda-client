import React, { Component } from 'react';
import ContainedButton from './ContainedButton';
import '../css/login.css'
import HeaderMenu from './HeaderMenu';



export default class Start extends Component {

    render() {
        return (
            <div className="container">
                <div className="login-box">
                  <HeaderMenu/>   
                    <h1 className='header-logo'>Área de acesso restrito!</h1>
                    <div className='content'>
                            <ContainedButton /> 
                        </div>
                    </div>
            </div>
            
        );
    }
}