export function spotify_connect({access_token,refresh_token}) {
    debugger;
    // window.onSpotifyWebPlaybackSDKReady = () => {

    //     const token = 'BQAZ3uR1jNg9dijMt236wEwT9n35FyKTMJgWLlQ5QoXGwXwGmA5BD6WbPJgw9aHiC001vW8bhnqOTzGtsQxCePvCJ0c8erFdq-nhSQsa7gMAxAUZD3yQ1O892vzpkPJsdeS3UYtcjnV-WdR7cWhXqk1I6-58HjHOoBw46gsBCSth-pfVQ4uduwjL_5o';

    //     const player = new Spotify.Player({
    //         name: 'Web Playback SDK Quick Start Player',
    //         getOAuthToken: cb => {
    //             cb(token);
    //         }
    //     });

    //     // Error handling
    //     player.addListener('initialization_error', ({
    //         message
    //     }) => {
    //         console.error(message);
    //     });
    //     player.addListener('authentication_error', ({
    //         message
    //     }) => {
    //         console.error(message);
    //     });
    //     player.addListener('account_error', ({
    //         message
    //     }) => {
    //         console.error(message);
    //     });
    //     player.addListener('playback_error', ({
    //         message
    //     }) => {
    //         console.error(message);
    //     });

    //     // Playback status updates
    //     player.addListener('player_state_changed', state => {
    //         console.log(state);
    //     });

    //     // Ready
    //     player.addListener('ready', ({
    //         device_id
    //     }) => {
    //         console.log('Ready with Device ID', device_id);

    //         const play = ({
    //             spotify_uri,
    //             playerInstance: {
    //                 _options: {
    //                     getOAuthToken,
    //                     id
    //                 }
    //             }
    //         }) => {
    //             getOAuthToken(access_token => {
    //                 fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //                         method: 'PUT',
    //                         body: JSON.stringify({
    //                             uris: [spotify_uri]
    //                         }),
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                             'Authorization': `Bearer ${access_token}`
    //                             // 'Authorization': `Bearer BQDTSfturn_0Qsi4prPM33lb4BDmGyao5j7RkUczwzVwVE0kdXWXhupaF6yeZh5eJGuhpsFt_0PNlX58d8k1-EKt45M6GZgWhO4fleatG92WlRuFBZDj-eO02JMspkqKQS28eZ0m3mWUC9aEgJ66BqoimGZJH6kBuP1BTl3ZyDgKLyu5_qTmelaw`
    //                         },
    //                     })
    //                     .catch((err) => {
    //                         console.log('Request failed: ', err);
    //                     })
    //             });
    //         };


    //         play({
    //             playerInstance: player,
    //             spotify_uri: 'spotify:track:2wVCje7MBTBYqnNgvUGgZA',
    //         });
    //     });

    //     // Not Ready
    //     player.addListener('not_ready', ({
    //         device_id
    //     }) => {
    //         console.log('Device ID has gone offline', device_id);
    //     });

    //     // Connect to the player!
    //     player.connect();

    // };
}