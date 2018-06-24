import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';
import Wrapper from '../hoc/Wrapper/Wrapper';

import Persons from './Persons/Persons';
import Auth from './Auth/Auth';
import classes from './App.css';

export class App extends Component {
    render() {
        const authButtons = this.props.username 
            ? <li><NavLink to="/logout" activeClassName={classes.active}>Log Out</NavLink></li>
            : <React.Fragment>
                <li><NavLink to="/signup" activeClassName={classes.active}>Sign up</NavLink></li>
                <li><NavLink to="/login" activeClassName={classes.active}>Log in</NavLink></li>
              </React.Fragment>;

        return (
            <Wrapper>
                <nav className={classes.MainNav}>
                    <ul>
                        <li><NavLink to="/persons" exact activeClassName={classes.active}>List</NavLink></li>
                        <li><NavLink to="/persons/new" activeClassName={classes.active}>Add Person</NavLink></li>
                        {authButtons}
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
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        history: state
    }
};

export const ConnectedApp = connect(mapStateToProps, null)(App);
export default withRouter(connect(mapStateToProps, null)(App));
