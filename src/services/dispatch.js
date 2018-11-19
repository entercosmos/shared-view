import {fromJS, Map} from 'immutable'
import initialState from './initialState'
import normalizeGraphqlResponse from './../utils/normalize-graphql-response'
import each from 'lodash/each'

export default (state, action) => {
    const reducers = Map({
        IMPORT: (state, action) => {

            const result = normalizeGraphqlResponse(action.payload)

            each(result, (object) => {
                state = state.updateIn(['cache', object.__typename], cache => {
                    cache = cache || fromJS({})
                    return cache.update(object.id, o => {
                        return o ? o.merge(object) : fromJS(object)
                    })
                })
            })

            return state
        },
        CLEAR_STATE: (state, action) => {
            return initialState
        },
        SET_LOADING: (state, action) => {
            return state.set('loading', action.payload)
        },
        SET_ERROR: (state, action) => {
            return state.set('error', action.payload)
        }
    })

    const dispatch = (state, action) => {

        let fn = reducers.get(action.type)

        if (!fn) return state

        return fn(state, action, {dispatch})
    }

    return dispatch(state, action)
}