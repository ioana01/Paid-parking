import { Component } from 'react';
import './CarInfo.css'
import { getCarSummary, deleteCar } from '../../helpers/apis'

class CarInfo extends Component {
    constructor(props) {
        super(props);

        this.showCarSummary = this.showCarSummary.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.redirectToParking = this.redirectToParking.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('carId') !== -1) {
            getCarSummary(localStorage.getItem('carId'), this.showCarSummary);
        }
    }

    setDefault() {
        document.getElementById("userName").innerHTML = "-";
        document.getElementById("registration").innerHTML = "-";
        document.getElementById("parkingSpot").innerHTML = "-";
        document.getElementById("entry").innerHTML = "-";
        document.getElementById("time").innerHTML = "-";
        document.getElementById("price").innerHTML = "-";
    }

    showCarSummary(data) {
        if(document.getElementById("noCar")) {
            document.getElementById("noCar").style.display = "none";
        }

        document.getElementById("userName").innerHTML = data.name;
        document.getElementById("registration").innerHTML = data.registrationNumber;
        document.getElementById("parkingSpot").innerHTML = data.spot;
        document.getElementById("entry").innerHTML = data.startHour;

        let currentTime = new Date();
        let hours = Math.round((currentTime.getTime() - data.exactDate) / 1000 / 60 / 60);
        let minutes = Math.round((currentTime.getTime() - data.exactDate) / 1000 / 60 - 60 * hours);
        document.getElementById("time").innerHTML = hours + "h" + minutes + "min";

        let price = 10;
        price += ((hours - 1) >= 0 ? 5 : 0) * (hours - 1);
        price += ((hours > 0) && (minutes > 0)) ? 5 : 0;
        document.getElementById("price").innerHTML = price + "&#36";
    }

    handleExit() {
        if(parseInt(localStorage.getItem('carId')) !== -1) {
            this.setDefault();

            deleteCar(localStorage.getItem('carId'));
            localStorage.setItem('carId', -1);

            if(document.getElementById("noCar")) {
                document.getElementById("noCar").style.display = "";
            }
            
            this.redirectToParking();
        } else {
            alert("Please register a car first");
        }
    }

    redirectToParking() {
        setTimeout(() => {
            window.location.href = "/parking";
        }, 1000);
    }

    render() {
        return(
            <div id="userContainer">
                <h3 id="noCar">No car registered</h3>

                <label className="summaryLabel"><span><i className="fas fa-user-circle"></i></span>Name</label>
                <p id="userName">-</p>

                <label className="summaryLabel"><span><i className="fas fa-car"></i></span>Registration number</label>
                <p id="registration">-</p>

                <label className="summaryLabel"><span><i className="fas fa-parking"></i></span>Parking spot</label>
                <p id="parkingSpot">-</p>

                <label className="summaryLabel"><span><i className="fas fa-clock"></i></span>Entry time</label>
                <p id="entry">-</p>

                <label className="summaryLabel"><span><i className="fas fa-hourglass-start"></i></span>Time spent</label>
                <p id="time">-</p>

                <label className="summaryLabel"><span><i className="fas fa-dollar-sign"></i></span>Price</label>
                <p id="price">-</p>

                <input id="payBtn" onClick={this.handleExit} type="submit" value="Pay"></input>
            </div>
        );
    }
}

export default CarInfo;