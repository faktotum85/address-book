import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import Persons from './Persons/Persons';
import Auth from './Auth/Auth';
import classes from './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <nav className={classes.MainNav}>
                    <ul>
                        <li><NavLink to="/persons" exact activeClassName={classes.active}>List</NavLink></li>
                        <li><NavLink to="/persons/new" activeClassName={classes.active}>Add Person</NavLink></li>
                        <li><NavLink to="/signup" activeClassName={classes.active}>Sign up</NavLink></li>
                        <li><NavLink to="/login" activeClassName={classes.active}>Log in</NavLink></li>
                    </ul>
                </nav>
                <main>
                    <Switch>
                        <Route path="/persons" component={Persons} />
                        <Route path="/signup" component={Auth} />
                        <Route path="/login" component={Auth} />
                        <Redirect from="/" to="/persons" />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
