
export const RECIEVE_ALL_EVENTS = 'RECIEVE_ALL_EVENTS';


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

