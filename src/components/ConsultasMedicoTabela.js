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



    desmarca(evento) {
        console.log(evento);
        console.log(evento.target);
        evento.preventDefault();
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/" + evento.target,
            contentType: 'application/json',
            dataType: 'json',
            type: 'put',
            data: JSON.stringify({ id: evento.target, id_patient: null }),
            success: function (novaListagem) {
                this.atualizaListagem(novaListagem);
                console.log('Consulta desmarcada com sucesso');
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

                                        <td>
                                            {/* <button type="submit" onClick={() => this.desmarca(agendamento.id).bind(this)} value={agendamento.id}/> */}
                                                <ButtonCustomizado onClick={() => this.desmarca(agendamento.id)} value={agendamento.id} type="submit" label="Desmarcar" />
                                            
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


