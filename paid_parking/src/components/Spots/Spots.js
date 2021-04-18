import React, { Component } from 'react';
import './Spots.css'

class Spots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            lastChecked: ""
        }

        this.selectSpot = this.selectSpot.bind(this);
    }

    selectSpot(e) {
        if(e.target.style.color === 'red') {
            alert("The spot is already take");
            return;
        }

        if(this.state.checked === true && e.target !== this.state.lastChecked) {
            this.state.lastChecked.style.color = 'green';
        } else {
            this.setState({checked: true});
        }

        console.log(e.target.id);
        if(e.target.style.color === 'yellow') {
            e.target.style.color = 'green';
            this.props.handleSelectedSpot("");
        } else {
            e.target.style.color = 'yellow';
            this.props.handleSelectedSpot(e.target.id);
        }

        this.setState({lastChecked: e.target});

        // #e93d3d, #5fd45f
    }

    render() {
        return(
            <>
                <div id="firstLine">
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="0"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="1"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="2"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="3"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="4"></i>
                </div>
                <div id="secondLine">
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="5"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="6"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="7"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="8"></i>
                    <i onClick={this.selectSpot} className="fas fa-car carIcon" id="9"></i>
                </div>
            </>
        );
    }
}

export default Spots;