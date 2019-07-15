import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './inputCustomizado';
import ButtonCustomizado from './buttonCustomizado';
import Dropdown from './Dropdown';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setIdPatient = this.setIdPatient.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, date: this.state.date, time: this.state.time }),
            success: function (novaListagem) {
                //PubSub.publish(novaListagem);
            }.bind(this),
            error: function (resposta) {
                console.log("erroooo");
            }
        })
        console.log('Dados ssendo enviados')
    }

    setIdPatient(evento) {
        this.setState({ id_patient: evento.target.value });
    }

    setDate(evento) {
        this.setState({ date: evento.target.value });
    }

    setTime(evento) {
        this.setState({ time: evento.target.value });
    }


    render() {
        return (
            
            <div className="pure-form pure-form-aligned">
                <h2>Agendar</h2>
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="POST">
                    <InputCustomizado id="id_patient" type="hidden" name="id" value={this.setId} onChange={this.setIdPatient} />
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustomizado id="date" type="date" name="date" value={this.state.date} onChange={this.setDate} label="Data" />
                    <InputCustomizado id="time" type="time" name="time" value={this.state.time} onChange={this.setTime} label="Hora" />
                    <ButtonCustomizado type="submit" label="Gravar" />
                </form>
            </div>

        );
    }
}

class TabelaAutor extends Component {

    render() {
        return (
            <div>
                <h2>Horários Disponíveis</h2>
                
                <Dropdown/>
                <br></br>
               
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Doutor(a)</th>
                            <th>Especialidade</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (agendamento) {
                               
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.id}</td>
                                        <td>{agendamento.Doctor.name}</td>
                                        <td>{agendamento.Doctor.specialty}</td>
                                        <td>{agendamento.date}</td>
                                        <td>{agendamento.time}</td>
                                        <td><ButtonCustomizado type="submit" label="Agendar" /></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:3030/agendamentos",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta })
            }.bind(this)
        });
    }

    atualizaListagem(novalista){
        this.setState({lista:novalista});
    }

    render() {
        return (
            <div className="content" id="content">
                
                <TabelaAutor lista={this.state.lista}/>
                {/* <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/> */}
            </div>
        );
    }
}
