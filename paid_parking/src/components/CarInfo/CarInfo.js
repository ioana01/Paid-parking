import { Component } from 'react';
import './CarInfo.css'
import { getCarSummary } from '../../helpers/apis'

class CarInfo extends Component {
    constructor(props) {
        super(props);

        this.showCarSummary = this.showCarSummary.bind(this);
    }

    componentDidMount() {
        getCarSummary(localStorage.getItem('carId'), this.showCarSummary);
    }

    showCarSummary(data) {
        document.getElementById("userName").innerHTML = data.name;
        document.getElementById("registration").innerHTML = data.registrationNumber;
        document.getElementById("parkingSpot").innerHTML = parseInt(data.spot) + 1;
        document.getElementById("entry").innerHTML = data.startHour;
    }

    render() {
        return(
            <>
            <div>
                <label><span><i class="fas fa-user-circle"></i></span>Name</label>
                <p id="userName"></p>

                <label><span><i class="fas fa-car"></i></span>Registration number</label>
                <p id="registration"></p>

                <label><span><i class="fas fa-parking"></i></span>Parking spot</label>
                <p id="parkingSpot"></p>

                <label><span><i class="fas fa-clock"></i></span>Entry time</label>
                <p id="entry"></p>

                <label><span><i class="fas fa-hourglass-start"></i></span>Time spent</label>
                <p id="time"></p>
            </div>
            </>
        );
    }
}

export default CarInfo;