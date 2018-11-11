import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';

const qs = require('querystring');
const scope = 'user-read-private user-read-email user-library-read user-top-read user-follow-read user-modify-playback-state streaming';

class JoinGroup extends React.Component {

  componentWillMount() {

  }

  renderData(){
    this.loginFunc()
  }

  loginFunc() {
    const state = this.props.location.pathname.split('/')[1];
    // res.cookie(keys.state,state);

    const params = qs.stringify({
      response_type: 'code',
      client_id: keys.spotify.clientId,
      scope,
      redirect_uri: keys.spotify.redirectUri,
      state
    });
    window.location = 'https://accounts.spotify.com/authorize?'+params
  };

  render() {
    return (
      <div className="">
        {this.renderData()}
        {/* {
            this.props.songs.length > 0 ? this.renderData() : <div className = "loader"> </div>
          } */}
      </div>
    );
  }
}


const keys = {
  spotify : {
    "clientId":"209ebbffc9ea4ee6a21a844294a69c6b",
    "clientSecret":"afaeae0eb525489d87efdb7d0cdb3ef8",
    "redirectUri":"http://15b58e96.ngrok.io/callback"
  },
  "state":"beats_per_minute_rocks"
};

export default JoinGroup;
