import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';

class eventsList extends React.Component { 
  
  componentWillMount() {  
    this.props.eventsActions.fetchEvents();
    // this.props.eventsActions.getSpotifyDetails();
  }

  // checkForPlayer() {
  //     const token = 'BQCRr4_TbM2vQM1b2KA2KyIAdE-K6nu32a6bmvVfy3roGUERXY8ZqTbbsHs65RK3iN0UFN127srYOIoX-yVbwnHIJLJhGZsKE22qCTm6yB57W2LsESFcpTle3UmX4W_Uu-_y-_5jzhkkUU_xEWDj3pwdQ_4j74XEQvN_4kvuRcYsmJBXIQnD4TgJQZ8';
     
  //     if (window.Spotify !== null && window.Spotify !== undefined) {
  //       if (window.Spotify.Player !== null && window.Spotify.Player !== undefined) {
          
  //         const player = new window.Spotify.Player({
  //            name: 'Tatti',
  //            getOAuthToken: cb => {
  //              cb(token);
  //            }
  //         });;
          
  //          // Error handling
  //          player.addListener('initialization_error', ({
  //            message
  //          }) => {
  //            console.error(message);
  //          });
  //          player.addListener('authentication_error', ({
  //            message
  //          }) => {
  //            console.error(message);
  //          });
  //          player.addListener('account_error', ({
  //            message
  //          }) => {
  //            console.error(message);
  //          });
  //          player.addListener('playback_error', ({
  //            message
  //          }) => {
  //            console.error(message);
  //          });

  //          // Playback status updates
  //          player.addListener('player_state_changed', state => {
  //            console.log(state);
  //          });

  //          // Ready
  //          player.addListener('ready', ({
  //            device_id
  //          }) => {
  //            console.log('Ready with Device ID', device_id);

  //            const play = ({
  //              spotify_uri,
  //              playerInstance: {
  //                _options: {
  //                  getOAuthToken,
  //                  id
  //                }
  //              }
  //            }) => {
  //              getOAuthToken(access_token => {
  //                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
  //                    method: 'PUT',
  //                    body: JSON.stringify({
  //                      uris: [spotify_uri]
  //                    }),
  //                    headers: {
  //                      'Content-Type': 'application/json',
  //                      'Authorization': `Bearer ${access_token}`
  //                      // 'Authorization': `Bearer BQDTSfturn_0Qsi4prPM33lb4BDmGyao5j7RkUczwzVwVE0kdXWXhupaF6yeZh5eJGuhpsFt_0PNlX58d8k1-EKt45M6GZgWhO4fleatG92WlRuFBZDj-eO02JMspkqKQS28eZ0m3mWUC9aEgJ66BqoimGZJH6kBuP1BTl3ZyDgKLyu5_qTmelaw`
  //                    },
  //                  })
  //                  .catch((err) => {
  //                    console.log('Request failed: ', err);
  //                  })
  //              });
  //            };


  //            play({
  //              playerInstance: player,
  //              spotify_uri: 'spotify:track:2wVCje7MBTBYqnNgvUGgZA',
  //            });
  //          });

  //          // Not Ready
  //          player.addListener('not_ready', ({
  //            device_id
  //          }) => {
  //            console.log('Device ID has gone offline', device_id);
  //          });

  //          // Connect to the player!
  //          player.connect();
  //         };
  //         clearInterval(this.playerCheckInterval);
  //       }
  //   }
    
      // this.createEventHandlers();

      // finally, connect!
     
      
  

  // componentDidUpdate(){
  //   if (this.props.token.access_token){
  //     this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  //   }
  // }


  renderData(){

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
  token: PropTypes.object
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
)(eventsList);