import React, { Component } from 'react';
import '../css/pure-min.css';
import '../css/side-menu.css';
import {Link} from 'react-router';
import ConsultasMedicoTabela from './ConsultasMedicoTabela';



export default class homeMedico extends Component {

    render() {
        return (
            <div id="layout">
            <a href="" id="menuLink" className="menu-link">
              <span></span>
            </a>
    
            <div id="menu">
              <div className="pure-menu">
              <Link className="pure-menu-heading" to="/homeMedico">
                  HOME
              </Link>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to='/homeMedico'>
                  Agenda
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to='/logout'>
                  Sair
                </Link>
              </li>
            </ul>
              </div>
            </div>
    
            <div id="main">
              <div className="header">
                <h1>Suas Consultas</h1>
              </div>
              <br></br>
              <ConsultasMedicoTabela/>
            </div>
          </div>
          
        );
    }
}