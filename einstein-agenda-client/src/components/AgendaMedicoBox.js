import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './inputCustomizado';
import ButtonCustomizado from './buttonCustomizado';

export default class AgendaMedicoForm extends Component {

    constructor() {
        super();
        this.state = { lista: [], id_doctor: '', date: '', time: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setIdDoctor = this.setIdDoctor.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:3030/agendamentos/medico/3",
            dataType: 'json',
            success: function (resposta) {
                var listaAtual = this.state.lista;
                listaAtual.push();
                this.setState({ lista: resposta })
            }.bind(this)
        });
    }

    atualizaListagem(novalista) {
        this.setState({ lista: novalista });
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: "http://localhost:3030/agendamentos",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ id_doctor: this.state.id_doctor, date: this.state.date, time: this.state.time }),
            success: function (novaListagem) {
                console.log(novaListagem);
                console.log("enviado com sucesso");
                this.setState({ lista: novaListagem });
            }.bind(this),
            error: function (resposta) {
                console.log("erroooo");
            }
        })
        console.log('Dados sendo enviados')
    }

    exclui(evento) {
        evento.preventDefault();
        $.ajax({
            url: "",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({}),
            success: function (novaListagem) {
                console.log("apagado com sucesso");
                this.setDate({ lista: novaListagem });
            }.bind(this),
            error: function (resposta) {
                console.log("deu ruim");
            }
        })
    }

    setIdDoctor(evento) {
        this.setState({ id_doctor: evento.target.value });
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
                <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                        <h2>Marcar disponibilidade</h2>
                        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="POST">
                            {/* <InputCustomizado id="id_patient" type="hidden" name="id" value={this.setId} onChange={this.setIdPatient} /> */}
                            <InputCustomizado id="id_doctor" type="text" name="id_doctor" value={this.state.id_doctor} onChange={this.setIdDoctor} label="idMédico" />
                            <InputCustomizado id="date" type="date" name="date" value={this.state.date} onChange={this.setDate} label="Data" />
                            <InputCustomizado id="time" type="time" name="time" value={this.state.time} onChange={this.setTime} label="Hora" />
                            <ButtonCustomizado type="submit" label="Gravar" />
                        </form>
                    </div>

                </div>
                <div className="content" id="content">
                    <h2>Agendas livres</h2>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>id</th>
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
                                            <td>{agendamento.date}</td>
                                            <td>{agendamento.time}</td>
                                            <td>
                                                {/* <form onSubmit={this.exclui.bind(this)}>
                                                    <ButtonCustomizado type="submit" label="Excluir" />
                                                </form> */}
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>


        );
    }
}

