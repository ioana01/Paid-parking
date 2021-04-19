import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" id="appName">Parking</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link menuLink" href="/parking">Parking spots</a>
                        <a className="nav-item nav-link menuLink" href="/cars">Cars list</a>
                        <a className="nav-item nav-link menuLink" href="/summary">Summary</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;