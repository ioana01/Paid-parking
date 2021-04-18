import React, { Component } from 'react';
import './Parking.css'
import Navbar from '../Navbar/Navbar'
import Spots from '../Spots/Spots'
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { getOccupiedSpots, postCar } from '../../helpers/apis'


class Parking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableSpots: 10,
            occupiedSpots: [],
            name: {
                value: "",
                error: "Please insert your name"
            },
            registrationNumber: {
                value: "",
                error: "Please insert your registration number"
            },
            selectedSpot: "",
            clickedBtn: false, 
            userData: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectedSpot = this.handleSelectedSpot.bind(this);
        this.setOccupiedSpots = this.setOccupiedSpots.bind(this);
    }

    componentDidMount() {
        getOccupiedSpots(this.setOccupiedSpots);
    }

    setOccupiedSpots(data) {
        this.setState({occupiedSpots: data});
        this.setState({availableSpots: 10 - this.state.occupiedSpots.length});

        let cars = document.getElementsByClassName("carIcon");
        for(let i = 0; i < this.state.occupiedSpots.length; i++) {
            cars[this.state.occupiedSpots[i].spot].style.color = 'red';
        }

        for(let i = 0; i < cars.length; i++) {
            if(cars[i].style.color !== 'red') {
                cars[i].style.color = 'green';
            }
        }
    }

    handleChange = input => e => {
        let newData = {
            value: e.target.value,
            error: this.state[input].error
        }
        this.setState({[input]:newData});
    };

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.availableSpots === 0) {
            return;
        }

        if(this.state.selectedSpot === "") {
            alert("Please select a spot");
            return;
        }

        if(!document.getElementById("name").value && !document.getElementById("registrationNumber").value){
            alert("Please insert your credentials");
            return;
        } else if(!document.getElementById("name").value) {
            alert(this.state.name.error);
            return;
        } else if(!document.getElementById("registrationNumber").value) {
            alert(this.state.registrationNumber.error);
            return;
        } 

        this.setState({availableSpots: this.state.availableSpots - 1});

        let date = new Date()
        let userData = {
            "startHour": date.getHours().toString() + ":" + date.getMinutes().toString(),
            "spot": this.state.selectedSpot,
            "name": this.state.name.value,
            "registrationNumber": this.state.registrationNumber.value
        }

        // this.props.updateUserData(userData);
        this.setState({userData: userData});
        postCar(userData);
        localStorage.setItem('carId', this.state.occupiedSpots.length);

        window.location.reload();
        this.state.clickedBtn = true;
    }

    handleSelectedSpot(car) {
        console.log(car);
        this.setState({selectedSpot: car});
    }

    render() {
        // if(this.state.clickedBtn) {
        //     let data = this.state.userData;
        //     this.state.clickedBtn = false;
        //     console.log(this.state.userData);
        //     return <Redirect
        //                 to={{
        //                 pathname: "summary",
        //                 state: { userData: data }}}/>
        // }

        return(
            <>
                <p id="availableSpotsNumber">Available spots: {this.state.availableSpots}</p>
                <Spots occupiedSpots={this.state.occupiedSpots} handleSelectedSpot={this.handleSelectedSpot}/>
                <div id="Container">
                    <form className="formFields">
                        <label id="formLabel1">Name</label>
                        <input className="formInput" 
                                value={this.state.name.value} 
                                onChange={this.handleChange('name')}
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Your name.."></input>

                        <label id="formLabel2">Registration number</label>
                        <input className="formInput" 
                                value={this.state.registrationNumber.value} 
                                onChange={this.handleChange('registrationNumber')}
                                type="text" 
                                id="registrationNumber" 
                                name="registrationNumber" 
                                placeholder="XX XX XXX"></input>
                        <input id="sendBtn" onClick={this.handleSubmit} type="submit" value="Register"></input>
                    </form>
                </div>
            </>
        );
    }
}

export default Parking;