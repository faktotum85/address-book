import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import Persons from './Persons/Persons';
import classes from './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <nav className={classes.MainNav}>
                    <ul>
                        <li><NavLink to="/persons">List</NavLink></li>
                        <li><NavLink to="/persons/new">Add Person</NavLink></li>
                    </ul>
                </nav>
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
