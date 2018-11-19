import React from 'react'
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom'
import SharedViewRoute from './SharedViewRoute'
import NotFound from './NotFound'
import history from './services/history'

export default class Router extends React.Component {

    render() {

        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route path={'/:shareId/:recordId?'} component={SharedViewRoute} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}