import './App.css';
import Parking from './components/Parking/Parking'
import Navbar from './components/Navbar/Navbar'
import CarInfo from './components/CarInfo/CarInfo'
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        "startHour": "",
        "id": "",
        "name": "",
        "registrationNumber": ""
      }
    }

    this.updateUserData = this.updateUserData.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  updateUserData(data) {
    this.setState({userData: data});
    this.state.userData = data;
    console.log(this.state.userData);
  }

  getTime(input) {
    var date = input ? new Date(input) : new Date();

    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    return date;
    //     hours : date.getHours(),
    //     minutes : date.getMinutes(),
    //     seconds : date.getSeconds()
    // }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/'>
              <Redirect to={{pathname: "/parking"}}/>
            </Route>
            <Route exact path='/parking'>
              <Parking updateUserData={this.updateUserData} getTime={this.getTime}/>
            </Route>
            <Route path="/summary" render={(props) => <CarInfo {...props}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
