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
    }

    enviaForm(evento) {
        // evento.preventDefault();
        // $.ajax({
        //     url: "http://localhost:3030/agendamentos/1",
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     type: 'put',
        //     data: JSON.stringify({ id: this.state.id, id_patient: null}),
        //     success: function (novaListagem) {
        //         //PubSub.publish(novaListagem);
        //     }.bind(this),
        //     error: function (resposta) {
        //         console.log("erroooo");
        //     }
        // })
        console.log('Dados ssendo enviados')
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:3030/agendamentos/paciente/2",
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
                                            <ButtonCustomizado type="submit" label="Desmarcar" value={agendamento.id}/>
                                        {/* <form onSubmit={this.enviaForm.bind(this)} method='PUT'>
                                        </form> */}
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


