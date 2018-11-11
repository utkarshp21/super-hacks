import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import './SplashScreen.css';

class SplashScreen extends React.Component {
  
  componentWillMount() {  
    
  }

  render() {
    return (
      <div className="container-fluid splashBackground">
        <div className="jumbotron-fluid jumbo">
          <div className="profileImage">
            <img src="https://www.crackiim.com/wp-content/uploads/2017/12/dummy_user-male.png" alt=""/>
          </div>
          <div className="name">
            <h1>Welcome, Abhinav</h1>
          </div>
        </div>
         
      </div>
    );
  }
}

SplashScreen.propTypes = {
  eventsActions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    song: state.song,
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);