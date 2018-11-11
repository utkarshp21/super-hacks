import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import './dashboard.css';

function SongList(props) {
  const songs = props.songs;
  const listItems = songs.map((song, index) =>
    <li key={index} className="list-group-item songObj">
      <div className="row">
         <div className = "col-md-6" >
               <img src={song["album"]["images"][2]["url"]}></img>
         </div>
         <div className = "col-md-6" >
            {song.name}
         </div>
      </div>
    </li>
  );
  return (
    <ul className="list-group">{listItems}</ul>
  );
}

class DashBoardScreen extends React.Component {
  
  componentWillMount() {  
    
  }
  render() {
    return (
      <div className="container dashboard">
          <div>
              <div className = "col-md-4 songList" >
                <h2>Up Next</h2>
                <SongList songs={this.props.songs}/>
              </div>
              <div className = "col-md-4" >
                <div className="now_playing">
                  <h2>Now Playing</h2>
                  <img src={this.props.songs[0]["album"]["images"][1]["url"]}></img>
                  <h3>{this.props.songs[0].name}</h3>
                  <div className="row">
                    <div className="col-md-4 play_button">
                      <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
                    </div> 
                    <div className="col-md-4 play_button">
                      <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                    </div> 
                    <div className="col-md-4 play_button">
                      <span className="glyphicon glyphicon-forward" aria-hidden="true"></span>
                    </div>  
                  </div>
                </div>
              </div>
              <div className = "col-md-4" >
                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Mood
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li><a href="#">Mood 1</a></li>
                      <li><a href="#">Mood 2</a></li>
                      <li><a href="#">Mood 3</a></li>
                    </ul>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    < li className = "list-group-item rangeObj" > < div >
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                  <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Example range</label>
                    <input type="range" className="custom-range" id="customRange1"/>
                  </div></li>
                  </ul>
                  
                  {/* </div> */}
              </div>
          </div>
      </div>
    );
  }
}

DashBoardScreen.propTypes = {
  eventsActions: PropTypes.object,
  current_song: PropTypes.object,
  songs:PropTypes.object,
};

function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token,
    current_song: current_song
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