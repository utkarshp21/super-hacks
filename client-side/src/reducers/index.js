import initialState from './initialState';
import {
    RECIEVE_ALL_EVENTS,
} from '../actions/';


const reducer = (state = initialState, action) => {
  
  let newState;
  switch (action.type) {

    case RECIEVE_ALL_EVENTS:
      newState = Object.assign({}, state, {
        song: action.events.name
      })
      return newState;

    default:
      return state;
  }

}

export default reducer;