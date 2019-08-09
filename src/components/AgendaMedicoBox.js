import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './inputCustomizado';
import ButtonCustomizado from './buttonCustomizado';

export default class AgendaMedicoForm extends Component {

    constructor() {
        super();
        this.state = { lista: [], date: '', time: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
        this.atualizaListagem = this.atualizaListagem.bind(this);
        this.userId = localStorage.getItem('userId');

    }

    componentDidMount() {
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos/medico/" + this.userId,
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta })
            }.bind(this)
        });
    }

    atualizaListagem(novalista) {
        this.setState({ lista: [novalista] });
        console.log(this.state.lista);
    }


    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ id_doctor: this.userId, date: this.state.date, time: this.state.time }),
            success: function (novaListagem) {
                console.log("enviado com sucesso");
                this.setState({ date: '', time: '' });
            }.bind(this),
            error: function (resposta) {
                console.log("erroooo");
            }
        })
        console.log('Dados sendo enviados')
    }

    excluido(evento) {
        evento.preventDefault();
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos/apagar",
            contentType: 'application/json',
            type: 'post',
            dataType: 'json',
            data: { id: evento },
            success: function (novaListagem) {
                console.log("apagado com sucesso");
                this.setDate({ lista: novaListagem });
            }.bind(this),
            error: function (resposta) {
                console.log("deu ruim");
            }
        })
    }



    exclui(agendamento_id) {
       

        fetch("https://albert-einstein-agenda-api.herokuapp.com/agendamentos/" + agendamento_id , {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: agendamento_id})
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi encontrado!');
                }
            })
            .catch(error => {
                this.setState({ msg: error.message });
            });
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

    setIdScheduling(evento) {
        this.setState({ id: evento.target.value });
    }

    render() {
        return (
            <div className="content" id="content">
                <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                        <h2>Marcar disponibilidade</h2>
                        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="POST">
                            <InputCustomizado id="id_doctor" type="hidden" name="id_doctor" value={this.userId} />
                            <InputCustomizado id="date" type="date" name="date" value={this.state.date} onChange={this.setDate} label="Data" />
                            <InputCustomizado id="time" type="time" name="time" value={this.state.time} onChange={this.setTime} label="Hora" />
                            <ButtonCustomizado type="submit" label="Gravar" />
                        </form>
                    </div>
                    <br></br>
                </div>
                <div className="content" id="content">
                    <h2>Minhas agendas livres</h2>
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
                                             <ButtonCustomizado onClick={() => this.exclui(agendamento.id)} value={agendamento.id} type="submit" label="Excluir" />
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

