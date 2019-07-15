import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import {Link} from 'react-router';

export default class Login extends Component {

    constructor(props){
        super(props);        
        this.state = {msg:this.props.location.query.msg};
    }

    envia(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email:this.email.value,password:this.password.value}),
            headers:new Headers({
                'Content-type' : 'application/json' 
            })
        };

        fetch('http://localhost:3030/pacienteLogin',requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.text();
                } else {
                    throw new Error('E-mail e/ou senha incorretos!');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token',token);
                browserHistory.push('/homePaciente');
            })
            .catch(error => {
                this.setState({msg:error.message});
            });
    }

    render(){
        return (
            <div className="login-box">
                <h2 className="header-logo">Login Paciente</h2>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input placeholder="E-mail" type="text" ref={(input) => this.email = input}/>
                    <input placeholder="Senha" type="password" ref={(input) => this.password = input}/>
                    <input type="submit" value="Login"/>
                    <Link to='/'>
                        <input type="submit" value="Voltar"/>
                    </Link>
                </form>
            </div>
        );
    }
}