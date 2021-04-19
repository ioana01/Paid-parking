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
        if(e.target.classList.contains("redColor")) {
            alert("The spot is already take");
            return;
        }

        if(this.state.checked === true 
            && e.target !== this.state.lastChecked 
            && this.state.lastChecked.classList.contains("grayColor")) {
            this.state.lastChecked.classList.toggle("grayColor");
        } else {
            this.setState({checked: true});
        }

        if(this.state.lastChecked.classList && this.state.lastChecked.classList.contains("grayColor")) {
            this.props.handleSelectedSpot("");
        } else if(!this.state.lastChecked.classList) {
            this.props.handleSelectedSpot(e.target.id);
        } else if(this.state.lastChecked.classList.contains("greenColor")){
            this.props.handleSelectedSpot(e.target.id);
        } 

        e.target.classList.toggle("grayColor");
        this.setState({lastChecked: e.target});
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