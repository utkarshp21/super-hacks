import React, { Component } from 'react';
import EventsList from './components/EventsList';
import Main from './Main';

var QRCode = require('qrcode.react');

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div >
            <h1>BPM</h1>
          </div>
          <div className="jumbotron" style={{padding:"10px 5px"}}>
            <h3>Welcome Offical Website BPM!</h3>
            <p>Get up to date song recommendations</p>
          </div>
          <QRCode value="http://instagram.com/thepsguy/" />
        </div>

        <Main />

      </div>
    );
  }
}

export default App;
