import React, { Component } from 'react';
import $ from 'jquery';
import ButtonCustomizado from './buttonCustomizado';

export default class ConsultasMedicoTabela extends Component {


    constructor() {
        super();
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
        this.userId = localStorage.getItem('userId');
    }


    componentDidMount() {
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos/medico/consultas/" + this.userId,
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta })
            }.bind(this)
        });
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

    atualizaListagem(novalista) {
        this.setState({ lista: novalista });
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
                                
                                
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.id}</td>
                                        <td>{agendamento.Patient.name}</td>
                                        <td>{agendamento.date}</td>
                                        <td>{agendamento.time}</td>
                                        
                                        <td><form onSubmit={()=>this.enviaForm(agendamento.id)}><ButtonCustomizado value={agendamento.id}  type="submit" label="Desmarcar" /></form></td>
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


