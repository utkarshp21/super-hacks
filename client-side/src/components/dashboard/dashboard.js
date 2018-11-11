import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import './dashboard.css';

function SongList(props) {
  const songs = props.songs;
  const listItems = songs.map((song, index) =>
    <li key={index}>
      {song.album.album_type}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

class DashBoardScreen extends React.Component {
  
  componentWillMount() {  
    
  }
  render() {
    return (
      <div className="container">
          <div>
              <div class = "col-md-4 songList" >
                <SongList songs={this.props.songs}/>
              </div>
              <div className = "col-md-4" >
                2 of 2
              </div>
              <div className = "col-md-4" >
                2 of 2
              </div>
          </div>
      </div>
    );
  }
}

DashBoardScreen.propTypes = {
  eventsActions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    songs: state.songs,
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