import {createStore} from 'redux'
import initialState from './initialState'
import dispatch from './dispatch'

export default createStore(
    dispatch,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
