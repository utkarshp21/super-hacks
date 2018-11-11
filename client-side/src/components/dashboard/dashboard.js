import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import './dashboard.css';
var QRCode = require('qrcode.react');

function SongList(props) {
  const songs = props.songs.songs;
  const listItems = songs.map((song, index) =>
    <li key={index} onClick={()=>props.songs.eventsActions.changeCurrentSong(song)} className="list-group-item songObj">
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

  checkForPlayer() {
    const token = 'BQCBO2TyVESaDhbs1ktp9LQJ75YcPf8BWI8RRNRhPRWHpz2PMN-pyRQsU4zZaT3EQ_vGV_1oL7YNBFaa9XYysc9INp19EHkfBEwH5DXBInKzMgZ8iWUb3YxIiPe2Arcky9NYlIKpomKVCFmoUYkxaeC6nqAthEW9uCC1llNIoB3wgq_4f_zunw7qgyA';

    if (window.Spotify !== null && window.Spotify !== undefined) {
      if (window.Spotify.Player !== null && window.Spotify.Player !== undefined) {
        const player = new window.Spotify.Player({
          name: 'Host Player',
          getOAuthToken: cb => {
            cb(token);
          }
        });;

        window.player = player;
        // Error handling
        player.addListener('initialization_error', ({
          message
        }) => {
          console.error(message);
        });
        player.addListener('authentication_error', ({
          message
        }) => {
          console.error(message);
        });
        player.addListener('account_error', ({
          message
        }) => {
          console.error(message);
        });
        player.addListener('playback_error', ({
          message
        }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener('player_state_changed', state => {
          // console.log(state);
        });

        // Ready
        player.addListener('ready', ({
          device_id
        }) => {
          console.log('Ready with Device ID', device_id);

          const play = ({
            spotify_uri,
            playerInstance: {
              _options: {
                getOAuthToken,
                id
              }
            }
          }) => {
            getOAuthToken(access_token => {
              fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    uris: [spotify_uri]
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                    // 'Authorization': `Bearer BQDTSfturn_0Qsi4prPM33lb4BDmGyao5j7RkUczwzVwVE0kdXWXhupaF6yeZh5eJGuhpsFt_0PNlX58d8k1-EKt45M6GZgWhO4fleatG92WlRuFBZDj-eO02JMspkqKQS28eZ0m3mWUC9aEgJ66BqoimGZJH6kBuP1BTl3ZyDgKLyu5_qTmelaw`
                  },
                })
                .catch((err) => {
                  console.log('Request failed: ', err);
                })
            });
          };

          play({
            playerInstance: player,
            spotify_uri: this.props.current_song.uri,
          });
          window.play = play;
        });


        // Not Ready
        player.addListener('not_ready', ({
          device_id
        }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
        clearInterval(this.playerCheckInterval);

      };

    }
  }

  componentDidUpdate() {

  }

  componentWillMount() {
     this.props.eventsActions.fetchSongs()
     this.props.eventsActions.getSpotifyDetails();
     this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  updateConstraintsFor(mood) {
    console.log('here');
    // debugger;
    var constraints = [0.5,0.5,0.5,0.5,0.5,50,0.5,0.5,0.5];
    switch (mood) {
      case 'Mood Booster':
        constraints = [0.2, 0.3, 0.7, 0.1, 0.9, 0.3, 0.9, 0.5, 0.0];
      case 'Good Vibes':
        constraints = [0.2, 0.3, 0.7, 0.1, 0.9, 0.3, 0.9, 0.5, 0.0];
      case 'WorkOut':
        constraints = [0.2, 0.3, 0.7, 0.1, 0.9, 0.3, 0.9, 0.5, 0.0];
      case 'Focus':
        constraints = [0.2, 0.3, 0.7, 0.1, 0.9, 0.3, 0.9, 0.5, 0.0];
      case 'EDM':
        constraints = [0.2, 0.3, 0.7, 0.1, 0.9, 0.3, 0.9, 0.5, 0.0];
      case 'Randomize':
        for (var i = 0; i < constraints.length; i++) {
          constraints[i] = Math.random();
        }
    }
    var x = document.getElementsByClassName("moodRange");

    for (var i = 0; i < x.length; i++) {
      x[i].value = constraints[i]*100;
    }
  }

  render() {
    return (
      <div className="container dashboard">
          <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>


          <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                  <p>Some text in the modal.</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
              <div className = "col-md-4 songList" >
                <h2>Up Next</h2>
                <SongList songs={this.props}/>
              </div>
              <div className = "col-md-5" >
                <div className="now_playing" style={{textAlign: 'center'}}>
                  <h2>Now Playing</h2>
                  <img src={this.props.current_song["album"]["images"][1]["url"]}></img>
                  <h3>{this.props.current_song.name}</h3>
                  <div className="row">
                    <div className="col-md-4 play_button" onClick={()=>window.player.previousTrack()}>
                      <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
                    </div>
                    <div className="col-md-4 play_button">
                      <span className="glyphicon glyphicon-play" id="playbackButton" aria-hidden="true" onClick={()=>{
                        window.player.togglePlay();
                        var element = document.getElementById("playbackButton");
                        element.classList.toggle("glyphicon-play");
                        element.classList.toggle("glyphicon-pause");
                        }
                      }></span>
                    </div>
                    <div className="col-md-4 play_button">
                      <span className="glyphicon glyphicon-forward" aria-hidden="true" onClick={()=>window.player.nextTrack()}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className = "col-md-3" >
                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle moodbutton" type="button" data-toggle="dropdown">Select Mood
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li onClick={()=>this.updateConstraintsFor('Mood Booster')}><a>Mood Booster</a></li>
                      <li><a onClick={()=>this.updateConstraintsFor('Good Vibes')}>Good Vibes</a></li>
                      <li><a onClick={()=>this.updateConstraintsFor('WorkOut')}>WorkOut</a></li>
                      <li><a onClick={()=>this.updateConstraintsFor('Focus')}>Focus</a></li>
                      <li><a onClick={()=>this.updateConstraintsFor('EDM')}>EDM</a></li>
                      <li><a onClick={()=>this.updateConstraintsFor('Randomize')}>Randomize</a></li>
                    </ul>
                  </div>
                  <ul className="list-group slider-container">
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Acousticness</label>
                    <input type="range" className="custom-range moodRange" id="acousticness"/>
                  </div></li>
                    < li className = "list-group-item rangeObj" > < div >
                    <label for="customRange1">Danceability</label>
                    <input type="range" className="custom-range moodRange" id="danceability"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Energy</label>
                    <input type="range" className="custom-range moodRange" id="energy"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Liveness</label>
                    <input type="range" className="custom-range moodRange" id="liveness"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Loudness</label>
                    <input type="range" className="custom-range moodRange" id="loudness"/>
                  </div></li>
                  <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Popularity</label>
                    <input type="range" className="custom-range moodRange" id="popularity"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Tempo</label>
                    <input type="range" className="custom-range moodRange" id="tempo"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Valence</label>
                    <input type="range" className="custom-range moodRange" id="valence"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Group</label>
                    <input type="range" className="custom-range moodRange" id="group"/>
                  </div></li>
                  </ul>
                  <button onClick={()=>this.props.eventsActions.fetchSongs()} className={'refreshButton'}>Refresh Recomendations</button>

                  <QRCode className={'qrClass'} value={"http://b1015e90.ngrok.io/xyz/join"}/>
                  <h2 id={'numUsers'}>Participants: 0</h2>
              </div>
          </div>
      </div>
    );
  }
}

DashBoardScreen.propTypes = {
  eventsActions: PropTypes.func,
  current_song: PropTypes.object,
  songs:PropTypes.array,
};

function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token,
    current_song: state.current_song
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
