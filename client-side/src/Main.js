import React, { Component } from 'react';
import EventsList from './components/EventsList';
import SplashScreen from './components/SplashScreen';
import DashBoardScreen from './components/dashboard/dashboard';
import JoinGroup from './components/JoinGroup';
import { Switch, Route } from 'react-router-dom';


var QRCode = require('qrcode.react');

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={EventsList}/>
        {/* both /roster and /roster/:number begin with /roster */}
        <Route path='/*/join' component={JoinGroup}/>
        <Route path='/' component={SplashScreen}/>
        <Route path='/DashBoard' component={DashBoardScreen}/>
      </Switch>
    );
  }
}

export default Main;
