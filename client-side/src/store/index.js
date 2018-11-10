import {
    createStore,
    applyMiddleware
} from 'redux'

import reducer from '../reducers'
import initialState from '../reducers/initialState'
import thunk from 'redux-thunk'

export function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(
            thunk
        )
    )
}