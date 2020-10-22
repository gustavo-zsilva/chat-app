import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import MessageApp from './pages/MessageApp';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={MessageApp} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;