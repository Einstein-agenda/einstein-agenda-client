import React, { Component } from 'react';
import $ from 'jquery';
import ButtonCustomizado from './buttonCustomizado';



export default class TabelaConsultas extends Component {

    constructor() {
        super();
        this.state = { lista: [] , id:''};
        this.atualizaListagem = this.atualizaListagem.bind(this);
        this.setIdScheduling = this.setIdScheduling.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
        this.userId = localStorage.getItem('userId');
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos/1",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ id: this.state.id, id_patient: null}),
            success: function (novaListagem) {
                this.setDate({ lista: novaListagem });
            }.bind(this),
            error: function (resposta) {
                console.log("erroooo");
            }
        })
        console.log('Dados ssendo enviados')
    }
    componentDidMount() {
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos/paciente/" + this.userId,
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta })
            }.bind(this)
        });
    }


    setIdScheduling(evento) {
        this.setState({ id: evento.target.value });
    }

    atualizaListagem(novalista){
        this.setState({lista:novalista});
    }

    render() {
        return (
            <div className="content" id="content">
                <h2>Minhas consultas</h2>
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
                            this.state.lista.map(function (agendamento) {
                                console.log(agendamento);
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.id}</td>
                                        <td>{agendamento.Doctor.name}</td>
                                        <td>{agendamento.Doctor.specialty}</td>
                                        <td>{agendamento.date}</td>
                                        <td>{agendamento.time}</td>
                                        <td>
                                            <ButtonCustomizado onClick={()=>this.enviaForm(agendamento.id)} type="submit" label="Desmarcar"/>
                                       
                                        </td>
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


