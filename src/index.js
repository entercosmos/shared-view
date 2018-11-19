import React from 'react'
import {injectGlobal} from 'emotion'
import {Provider} from 'react-redux'
import store from './services/store'
import Router from './Router'

injectGlobal`
body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
}
* {
    box-sizing: border-box;
}   
*:focus {
    outline: 0;
}
`

export default class App extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}