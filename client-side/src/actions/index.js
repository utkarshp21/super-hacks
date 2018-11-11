
export const RECIEVE_ALL_EVENTS = 'RECIEVE_ALL_EVENTS';
export const RECIEVE_ACCESS_TOKEN = 'RECIEVE_ACCESS_TOKEN';
export const CHANGE_CURRENT_SONG = 'CHANGE_CURRENT_SONG';


export function receiveEvents(events) {
    //Action dispatched after list of event is successfully fetched
    //from the YELP API
    return {
        type: RECIEVE_ALL_EVENTS,
        events
    };
}

export function fetchEvents() {
    return (dispatch, getState) => {
        dispatch(receiveEvents({"name":"Kala chasma","Artist":"sharukh kan"}))
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
        })
                
        dispatch(updateCurrentSong(song))

    }

}
