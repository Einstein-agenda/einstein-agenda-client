import { Component } from 'react';
import '../css/headerMenu.css';


export default class HeaderMenu extends Component {

    render() {
        return (
            <div>
            

            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Portefolio</a>
                <a href="#">Contact</a>
                <div class="animation start-home"></div>
            </nav>
            </div>
        );
    }
}



