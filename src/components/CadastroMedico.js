import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

export default class CadastroMedico extends Component {

    constructor(props) {
        super(props);
        this.state = {name:'',email:'',password:'', crm: ''};
        this.envia = this.envia.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.setCrm = this.setCrm.bind(this);
        this.setSpecialty = this.setSpecialty.bind(this);
    }

    setNome(evento){
        this.setState({name:evento.target.value});
      }
    
      setEmail(evento){
        this.setState({email:evento.target.value});
      }  
    
      setSenha(evento){
        this.setState({password:evento.target.value});
      }  
      
      setCrm(evento){
        this.setState({crm:evento.target.value});
      } 

      setSpecialty(evento){
        this.setState({specialty:evento.target.value});
      } 

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password, specialty: this.state.specialty, crm: this.state.crm}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch("https://albert-einstein-agenda-api.herokuapp.com/medicos/", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('E-mail e/ou senha incorretos!');
                }
            }).then(myJson => {
                console.log(JSON.stringify(myJson));
                
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                console.log(requestInfo);
                browserHistory.push('/medicoLogin');
            })
            .catch(error => {
                this.setState({ msg: error.message });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="login-box">
                    <h2 className="header-logo">CADASTRO MÉDICO</h2>
                    <span>{this.state.msg}</span>
                    <form onSubmit={this.envia.bind(this)}>
                        <input placeholder="Nome" type="text" onChange={this.setNome} value={this.state.name} />
                        <input placeholder="CRM" type="text" onChange={this.setCrm} value={this.state.crm}/>
                        <input placeholder="Especialidade" type="text" onChange={this.setSpecialty} value={this.state.specialty}/>
                        <input placeholder="E-mail" type="text" onChange={this.setEmail} value={this.state.email} />
                        <input placeholder="Senha" type="password" onChange={this.setSenha} value={this.state.password} />
                        <input className="pure-control-group left padding" type="submit" label="Cadastrar" value="Cadastrar" />
                        <Link to='/'><input className="pure-control-group right" type="submit" label="Voltar" value="Voltar" /></Link>
                    </form>

                </div>
            </div>
        );
    }
}