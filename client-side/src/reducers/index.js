import initialState from './initialState';
import {
    RECIEVE_ALL_EVENTS,
    RECIEVE_ACCESS_TOKEN,
} from '../actions/';


const reducer = (state = initialState, action) => {
  
  let newState;
  switch (action.type) {

    case RECIEVE_ALL_EVENTS:
      newState = Object.assign({}, state, {
        song: action.events.name
      })
      return newState;
   
    case RECIEVE_ACCESS_TOKEN:
      newState = Object.assign({}, state, {
        token: action.token
      })
      return newState;
      
    default:
      return state;
  }

}

export default reducer;