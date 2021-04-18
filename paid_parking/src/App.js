import './App.css';
import Parking from './components/Parking/Parking'
import Navbar from './components/Navbar/Navbar'
import CarInfo from './components/CarInfo/CarInfo'
import CarsDisplay from './components/CarsDisplay/CarsDisplay'
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class App extends Component {
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
              <Parking/>
            </Route>
            <Route exact path="/summary">
              <CarInfo/>
            </Route>
            <Route exact path="/cars">
              <CarsDisplay/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
