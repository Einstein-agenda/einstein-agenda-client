import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './inputCustomizado';
import ButtonCustomizado from './buttonCustomizado';
import Dropdown from './Dropdown';

class DropDown extends Component {

    constructor() {
        super();
        this.state = { specialty: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setSpecialty = this.setSpecialty.bind(this);
    }

    setSpecialty(evento) {
        this.setState({ specialty: evento.target.value });
    }

    enviaFormBusca(evento) {
        evento.preventDefault();
        $.ajax({
            url: "https://albert-einstein-agenda-api.herokuapp.com/" + this.state.selectedTeam,
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            data: JSON.stringify({ id_doctor: this.state.selectedTeam}),
            success: function(resposta) {
              
            }.bind(this),
            error: function (resposta) {
                console.log("erroooo");
            }
        })
        console.log('Dados ssendo enviados')
    }

    componentDidMount() {
        fetch("https://albert-einstein-agenda-api.herokuapp.com/especialidades")
          .then((response) => {
            return response.json();
          })
          .then(data => {
            let teamsFromApi = data.map(team => { return {value: team.specialty, display: team.specialty} })
            this.setState({ teams: [{value: '', display: '(Buscar por especialidade)'}].concat(teamsFromApi) });
          }).catch(error => {
            console.log(error);
          });
      }

   
    render() {
        return (
            
            <div className="pure-form pure-form-aligned">
                <h2>Agendar</h2>
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="POST">
                    <select name="specialty" onChange={this.setSpecialty} >
                        <option value="">Busca por Especialidade</option>
                    </select>
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
            url: "https://albert-einstein-agenda-api.herokuapp.com/agendamentos",
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
                
                {/* <DropDown/> */}
                <TabelaAutor lista={this.state.lista}/>
                {/* <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/> */}
            </div>
        );
    }
}
