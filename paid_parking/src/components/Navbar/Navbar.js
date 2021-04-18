import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Parking</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-item nav-link" href="/parking">Parking spots</a>
                            <a class="nav-item nav-link" href="#">Cars list</a>
                            <a class="nav-item nav-link" href="/summary">Summary</a>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navbar;