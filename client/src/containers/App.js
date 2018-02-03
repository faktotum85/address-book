import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Persons from './Persons/Persons';

class App extends Component {
    render() {
        return (
            <div className="App">
                <main>
                    <Switch>
                        <Route path="/persons" component={Persons} />
                        <Redirect from="/" to="/persons" />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
