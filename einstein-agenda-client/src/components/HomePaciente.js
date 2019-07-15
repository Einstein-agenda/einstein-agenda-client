import React, { Component } from 'react';
import '../css/pure-min.css';
import '../css/side-menu.css';
import AutorBox from './Autor';
import {Link} from 'react-router';


export default class ButtonCustomizado extends Component {

    render() {
        return (
            <div id="layout">
            <a href="" id="menuLink" className="menu-link">
              <span></span>
            </a>
    
            <div id="menu">
              <div className="pure-menu">
                <a className="pure-menu-heading" href="">Company</a>
    
                <ul className="pure-menu-list">
                  <Link to='/homePaciente'>
                  <li className="pure-menu-item"><a href="" className="pure-menu-link">Home</a></li>
                  </Link>
                  <Link to=''>
                  <li className="pure-menu-item"><a href="" className="pure-menu-link">Autor</a></li>
                  </Link>
                  <Link to='/logout'>
                  <li className="pure-menu-item"><a href="" className="pure-menu-link">Sair</a></li>
                  </Link>
                </ul>
              </div>
            </div>
    
            <div id="main">
              <div className="header">
                <h1>Hospital Israelita Albert Einstein</h1>
              </div>
              <br></br>
              <AutorBox />
            </div>
          </div>
          
        );
    }
}