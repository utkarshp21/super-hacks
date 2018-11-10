import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';


class eventsList extends React.Component { 
    
  componentWillMount() { 
    this.props.eventsActions.fetchEvents();
  }

  renderData(){
    debugger;
   return(<div>
      Song: {
        this.props.song
      }
      <h1>helllo</h1>
    </div>)
  }

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

eventsList.propTypes = {
  eventsActions: PropTypes.object,
  song: PropTypes.string,
};

function mapStateToProps(state) {
  debugger;
  return {
    song: state.song,
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
)(eventsList);