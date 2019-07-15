import React, { Component } from 'react';
import $ from 'jquery';
import ButtonCustomizado from './buttonCustomizado';

//import PubSub from 'pubsub-js';


export default class ConsultasMedicoTabela extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:3030/agendamentos/medico/3",
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
                <h2>Minhas consultas</h2>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Paciente</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lista.map(function (agendamento) {
                                console.log(agendamento.doctor);
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.id}</td>
                                        <td>{agendamento.Patient.name}</td>
                                        <td>{agendamento.date}</td>
                                        <td>{agendamento.time}</td>
                                        <td><ButtonCustomizado type="submit" label="Desmarcar" /></td>
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


