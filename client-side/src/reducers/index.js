import initialState from './initialState';
import {
    RECIEVE_ALL_EVENTS,
    RECIEVE_ACCESS_TOKEN,
    CHANGE_CURRENT_SONG,
    RECIEVE_ALL_SONGS,
} from '../actions/';


const reducer = (state = initialState, action) => {
  
  let newState;
  switch (action.type) {

    case RECIEVE_ALL_EVENTS:
    {
      newState = Object.assign({}, state, {
        song: action.events.name
      })
      return newState;
    }
      
    case RECIEVE_ALL_SONGS:
      newState = Object.assign({}, state, {
        songs: action.songs
      })
      return newState;

    case RECIEVE_ACCESS_TOKEN:
      newState = Object.assign({}, state, {
        token: action.token
      })
      return newState;
    
    case CHANGE_CURRENT_SONG:
      newState = Object.assign({}, state, {
        current_song: action.song
      })
      return newState;
      
    default:
      return state;
  }

}

export default reducer;