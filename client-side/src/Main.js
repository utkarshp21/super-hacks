import React, { Component } from 'react';
import EventsList from './components/EventsList';
import JoinGroup from './components/JoinGroup';
import { Switch, Route } from 'react-router-dom';


var QRCode = require('qrcode.react');

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={EventsList}/>
        {/* both /roster and /roster/:number begin with /roster */}
        <Route path='/*/join' component={JoinGroup}/>
        {/*<Route path='/schedule' component={Schedule}/>*/}
      </Switch>
    );
  }
}

export default Main;
