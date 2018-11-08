
import React from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'

import BaseLayout from '../layout/BaseLayout'


import history from './History';
const routers = () => {
    return (
        <Router history={history}>
            <Route path="/" component={BaseLayout}>
            </Route>
        </Router>
    )
}

export default routers