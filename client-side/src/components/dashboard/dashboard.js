import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import './dashboard.css';


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
    debugger;
    const token = 'BQCNtZmcPEgrmziVdPCG1vil4MIV9CYigBTnlhZbKudUDjjzemV5xqzNOBNsnQsoTwy3NwmsU6EHCx9lnDPlrzODO0gxF4oT3EeF9vrYQZm7EDIKik7APtCEBxIJT_eXmk1vH-MRzfeSaIdfgNCkNUZ_y1G1A1GAMSLf7xw2A_9nlOexnAlfo_xjgfE';

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
     this.props.eventsActions.getSpotifyDetails();
     
     this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);

    //  fetch('http://15b58e96.ngrok.io/recommendation', {
    //      method: 'POST',
    //      headers: {
    //        'Accept': 'application/json',
    //        'Content-Type': 'application/json',
    //      },
    //      body: JSON.stringify({
    //        acousticness: document.getElementById("acousticness").value / 100,
    //        danceability: document.getElementById("danceability").value / 100,
    //        energy: document.getElementById("energy").value / 100,
    //        liveness: document.getElementById("liveness").value / 100,
    //        loudness: document.getElementById("loudness").value / 100,
    //        popularity: document.getElementById("popularity").value,
    //        tempo: document.getElementById("tempo").value / 100,
    //        valence: document.getElementById("valence").value / 100,
    //        group: document.getElementById("group").value / 100,
    //      })
    //    }).then(function (response) {
    //      // var res = response.json();
    //      // debugger;
    //      return response.json();
    //    })
    //    .then((result) => {
    //      console.log(result);
    //    })
     
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
                  <ul className="list-group slider-container">
                    <li className="list-group-item rangeObj"> 
                    <div>
                    <label for="acousticness">Acousticness</label>
                    <input type="range" className="custom-range" id="acousticness"/>
                    </div>
                  </li>
                    <li className="list-group-item rangeObj"> 
                    <div>
                    <label for="danceability">Danceability</label>
                    <input type="range" className="custom-range" id="danceability"/>
                  </div>
                  </li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="energy">Energy</label>
                    <input type="range" className="custom-range" id="energy"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="liveness">Liveness</label>
                    <input type="range" className="custom-range" id="liveness"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="loudness">Loudness</label>
                    <input type="range" className="custom-range" id="loudness"/>
                  </div></li>
                  <li className="list-group-item rangeObj"> <div>
                    <label for="popularity">Popularity</label>
                    <input type="range" className="custom-range" id="popularity"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="tempo">Tempo</label>
                    <input type="range" className="custom-range" id="tempo"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="valence">Valence</label>
                    <input type="range" className="custom-range" id="valence"/>
                  </div></li>
                    <li className="list-group-item rangeObj"> <div>
                    <label for="group">Group</label>
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
