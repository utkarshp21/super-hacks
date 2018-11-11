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
         <div className = "col-md-3" >
               <img src={song["album"]["images"][2]["url"]}></img>
         </div>
         <div className = "col-md-9 artistName" >
            {song.name + ' - ' + song.artists[0].name}
         </div>
      </div>
    </li>
  );
  return (
    <ul className="list-group">{listItems}</ul>
  );
}

class DashBoardScreen extends React.Component {

  componentDidMount() {
    fetch('http://15b58e96.ngrok.io/recommendation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        acousticness: document.getElementById("acousticness").value/100,
        danceability: document.getElementById("danceability").value/100,
        energy: document.getElementById("energy").value/100,
        liveness: document.getElementById("liveness").value/100,
        loudness: document.getElementById("loudness").value/100,
        popularity: document.getElementById("popularity").value,
        tempo: document.getElementById("tempo").value/100,
        valence: document.getElementById("valence").value/100,
        group: document.getElementById("group").value/100,
      })
    }).then(function(response){
      // var res = response.json();
      // debugger;
      return response.json();
    })
      .then((result) => {
        console.log(result);
      })
  }

  render() {
    return (
      <div className="container dashboard">
          <div>
              <div className = "col-md-4 songList" >
                <h2>Up Next</h2>
                <SongList songs={this.props.songs}/>
              </div>
              <div className = "col-md-5" >
                <div className="now_playing" style={{textAlign: 'center'}}>
                  <h2>Now Playing</h2>
                  <img src={this.props.songs[0]["album"]["images"][1]["url"]}></img>
                  <h3 style={{textAlign: 'center'}}>{this.props.songs[0].name}</h3>
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
              <div className = "col-md-3" >
                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Mood
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li><a href="#">Mood 1</a></li>
                      <li><a href="#">Mood 2</a></li>
                      <li><a href="#">Mood 3</a></li>
                    </ul>
                  </div>
                  <ul className="list-group slider-container">
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Acousticness</label>
                    <input type="range" className="custom-range" id="acousticness"/>
                  </div></li>
                    < li className = "list-group-item rangeObj" > < div >
                    <label for="customRange1">Danceability</label>
                    <input type="range" className="custom-range" id="danceability"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Energy</label>
                    <input type="range" className="custom-range" id="energy"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Liveness</label>
                    <input type="range" className="custom-range" id="liveness"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Loudness</label>
                    <input type="range" className="custom-range" id="loudness"/>
                  </div></li>
                  <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Popularity</label>
                    <input type="range" className="custom-range" id="popularity"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Tempo</label>
                    <input type="range" className="custom-range" id="tempo"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Valence</label>
                    <input type="range" className="custom-range" id="valence"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Group</label>
                    <input type="range" className="custom-range" id="group"/>
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
