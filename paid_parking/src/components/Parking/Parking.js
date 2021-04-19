import React, { Component } from 'react';
import './Parking.css'
import Spots from '../Spots/Spots'
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
            selectedSpot: ""
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
            cars[parseInt(this.state.occupiedSpots[i].spot) - 1].classList.toggle("redColor");
        }

        for(let i = 0; i < cars.length; i++) {
            if(!cars[i].classList.contains("redColor")) {
                cars[i].classList.toggle("greenColor");
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
            alert("No available spots left");
            return;
        }

        if(this.state.selectedSpot === "") {
            alert("Please select a spot");
            return;
        }

        if(parseInt(localStorage.getItem('carId')) !== -1) {
            alert("You already have a car registered");
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

        let date = new Date()
        let userData = {
            "startHour": date.getHours().toString() + ":" + date.getMinutes().toString(),
            "exactDate": new Date().getTime(),
            "spot": parseInt(this.state.selectedSpot) + 1,
            "name": this.state.name.value,
            "registrationNumber": this.state.registrationNumber.value
        }

        postCar(userData);

        let nextId = this.state.occupiedSpots.length > 0 ? 
            parseInt(this.state.occupiedSpots[this.state.occupiedSpots.length - 1].id) + 1 : 1;
        localStorage.setItem('carId', nextId);

        window.location.reload();
    }

    handleSelectedSpot(car) {
        this.setState({selectedSpot: car});
    }

    render() {
        return(
            <>
                <p id="availableSpotsNumber">Available spots: <strong>{this.state.availableSpots}</strong></p>
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
                                placeholder="Your name..."></input>

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