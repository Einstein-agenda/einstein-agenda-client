import React, { Component } from 'react';
import $ from 'jquery';


export default class FavouriteTeam extends Component {


  constructor() {
    super();
    this.state = {   
      teams: [],
      selectedTeam: "",
      validationError: ""};
    this.enviaFormBusca = this.enviaFormBusca.bind(this);
    this.setDoctor = this.setDoctor.bind(this);

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

setDoctor(evento) {
    this.setState({ doctor: evento.target.value });
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
      <form className="pure-form pure-form-aligned" onSubmit={this.enviaFormBusca.bind(this)} method="GET">
      <div>
        <select value={this.state.selectedTeam} 
                onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "Escolha alguma especialidade" : ""})}>
          {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
        </select>
        <button type={this.props.type} className="pure-button pure-button-primary">Buscar</button>
        <div style={{color: 'red', marginTop: '5px'}}>
          {this.state.validationError}
        </div>
        
                
            
      </div>
      </form>
    )
  }
}