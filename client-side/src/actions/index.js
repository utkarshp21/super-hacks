
export const RECIEVE_ALL_EVENTS = 'RECIEVE_ALL_EVENTS';
export const RECIEVE_ACCESS_TOKEN = 'RECIEVE_ACCESS_TOKEN';
export const CHANGE_CURRENT_SONG = 'CHANGE_CURRENT_SONG';
export const RECIEVE_ALL_SONGS = 'RECIEVE_ALL_SONGS';


export function receiveAllSongs(songs) {
    //Action dispatched after list of event is successfully fetched
    //from the YELP API
    return {
        type: RECIEVE_ALL_SONGS,
        songs
    };
}

export function fetchSongs() {
    return (dispatch, getState) => {
         return fetch('http://15b58e96.ngrok.io/recommendation', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
               acousticness: document.getElementById("acousticness")? (document.getElementById("acousticness").value/100): 0.5,
               danceability: document.getElementById("danceability") ?(document.getElementById("danceability").value / 100) : 0.5,
               energy: document.getElementById("energy") ?( document.getElementById("energy").value / 100): 0.5,
               liveness: document.getElementById("liveness") ? (document.getElementById("liveness").value / 100) : 0.5,
               loudness: document.getElementById("loudness") ? (document.getElementById("loudness").value / 100) : 0.5,
               popularity: document.getElementById("popularity") ? document.getElementById("popularity").value : 50,
               tempo: document.getElementById("tempo") ? (document.getElementById("tempo").value / 100) : 0.5,
               valence: document.getElementById("valence") ? (document.getElementById("valence").value / 100) : 0.5,
               group: document.getElementById("group") ? (document.getElementById("group").value / 100) : 0.5,
             })
           }).then(function (response) {
             fetch('http://15b58e96.ngrok.io/users').then(function (response) {
               return response.json();
             }).then((result) => {
               document.getElementById('numUsers').innerHTML = 'Participants: ' + result.data;
             });
             return response.json();
           })
           .then((result) => {
             dispatch(receiveAllSongs(result.data.tracks))

        })


        // return fetch(yelpurl(getState().user_location), {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': "Bearer " + yelp_api_key,
        //             'Accept': 'application/json'
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(json => {
        //         dispatch(receiveEvents(json))
        //         if (getState().user_location.latitude){
        //             dispatch(fetchDistance(getState().events, getState().user_location))
        //         }
        // });
    };
}

export function recieveAccessToken(token){
     return {
         type: RECIEVE_ACCESS_TOKEN,
         token
     };
}

export function getSpotifyDetails() {
    return (dispatch, getState) => {
        const token = {
            "access_token": "BQChpNJQlUsNxwR_79e-q6qd6lIujU78E304yFRpwHpEjlK8LZIO12eAunB4SSdzoi-FCVtPITh-FbfPRhZackI1YX_lcbiilEi0eYAk8d2xchY5j03hAbbtriCs7juanXYvhcC1rIQ-cDkmGjqCEHz4744OMeaSFZ1hjJT7qBlGWpWiQzxzjD1kTqkhwwcTRyye6wE",
            "refresh_token": "AQAt9sEezH1MxmKrTxwFNfX3zWAXS85oGpoQip4FVckS9mUPhRTuf8I19VbfxXa8bvrk92-owz08D6JqBBU9NsztKZNdSlVxOEBOLPUgc0k6imD7j3Zahb1EFPIrrtpL2QJxCQ"
        };

        dispatch(recieveAccessToken(token))

        // return (dispatch, getState) => {
    //     return fetch("http://15b58e96.ngrok.io/login", {
    //             method: 'GET',
    //         })
    //         .then((response) => {debugger;response.json()})
    //         .then(json => {
    //             debugger;
    //             // dispatch(receiveEvents(json))

    //     });
    // };
    }

}

export function updateCurrentSong(song) {
    return {
        type: CHANGE_CURRENT_SONG,
        song
    };
}

export function changeCurrentSong(song) {
    return (dispatch, getState) => {
        window.player.pause().then(()=>{
            window.play({
                playerInstance: window.player,
                spotify_uri: song.uri,
            })
        });
        dispatch(updateCurrentSong(song))
    }
}

