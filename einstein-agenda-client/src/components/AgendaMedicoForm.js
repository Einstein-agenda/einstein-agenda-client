import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './inputCustomizado';
import ButtonCustomizado from './buttonCustomizado';
import Dropdown from './Dropdown';



export default class AgendaMedicoForm extends Component {

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
            <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
                <h2>Liberar agenda</h2>
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="POST">
                    <InputCustomizado id="id_patient" type="hidden" name="id" value={this.setId} onChange={this.setIdPatient} />
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustomizado id="date" type="date" name="date" value={this.state.date} onChange={this.setDate} label="Data" />
                    <InputCustomizado id="time" type="time" name="time" value={this.state.time} onChange={this.setTime} label="Hora" />
                    <ButtonCustomizado type="submit" label="Gravar" />
                </form>
            </div>
            </div>
        );
    }
}
