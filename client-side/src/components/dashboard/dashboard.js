import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import './dashboard.css';


function SongList(props) {
  debugger;
  const songs = props.songs.songs;
  const listItems = songs.map((song, index) =>
    <li key={index} onClick={()=>props.songs.eventsActions.changeCurrentSong(song)} className="list-group-item songObj">
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

  checkForPlayer() {
    debugger;
    const token = 'BQBU9lSRF1O6TzFIm6Ks6rw04EhGDlkQ_vxf30Sx64iFvokuytmQ0p8wERLvvat1l2ev2IXjnj7IATV6CdrcvNyVHcaqCGLEjgV9EyOOjXhs5dMwm3pFl7n_j3H7hmb9Sjfo4sTo3K0i6xhCF6NbFaZ54OfDrsclLWnbSMX_6AFnsQu7hD-ElOZAisg';

    if (window.Spotify !== null && window.Spotify !== undefined) {
      if (window.Spotify.Player !== null && window.Spotify.Player !== undefined) {
        const player = new window.Spotify.Player({
          name: 'Tatti',
          getOAuthToken: cb => {
            cb(token);
          }
        });;

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
          console.log(state);
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
        });

        // Not Ready
        player.addListener('not_ready', ({
          device_id
        }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      };
      clearInterval(this.playerCheckInterval);
    }
  }

  componentDidUpdate() {
  }

  componentDidMount() {
     this.props.eventsActions.getSpotifyDetails();
     
     this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
     
  }

  render() {
    return (
      <div className="container dashboard">
          <div>
              <div className = "col-md-4 songList" >
                <h2>Up Next</h2>
                <SongList songs={this.props}/>
              </div>
              <div className = "col-md-4" >
                <div className="now_playing">
                  <h2>Now Playing</h2>
                  <img src={this.props.current_song["album"]["images"][1]["url"]}></img>
                  <h3>{this.props.current_song.name}</h3>
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
                    <label for="customRange1">Acousticness</label>
                    <input type="range" className="custom-range" id="Acousticness"/>
                  </div></li>
                    < li className = "list-group-item rangeObj" > < div >
                    <label for="customRange1">Danceability</label>
                    <input type="range" className="custom-range" id="Danceability"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Energy</label>
                    <input type="range" className="custom-range" id="Energy"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Liveness</label>
                    <input type="range" className="custom-range" id="Liveness"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Loudness</label>
                    <input type="range" className="custom-range" id="Loudness"/>
                  </div></li>
                  <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Popularity</label>
                    <input type="range" className="custom-range" id="Popularity"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Tempo</label>
                    <input type="range" className="custom-range" id="Tempo"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Valence</label>
                    <input type="range" className="custom-range" id="Valence"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="customRange1">Group</label>
                    <input type="range" className="custom-range" id="Group"/>
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
