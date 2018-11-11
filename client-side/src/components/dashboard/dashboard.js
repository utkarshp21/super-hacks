import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/';
import PropTypes from 'prop-types';
import React from 'react';
// import '../App.css';

class DashBoardScreen extends React.Component {
  
  componentWillMount() {  
    
  }
  render() {
    return (
      <div className="">
         <h1>helllo</h1>
      </div>
    );
  }
}

DashBoardScreen.propTypes = {
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
)(DashBoardScreen);