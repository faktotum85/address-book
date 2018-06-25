import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';
import Wrapper from '../hoc/Wrapper/Wrapper';
import * as actions from '../store/auth/actions';

import Persons from './Persons/Persons';
import Auth from './Auth/Auth';
import classes from './App.css';

export class App extends Component {
    render() {
        const navLinks = this.props.username 
            ? <React.Fragment>
                <li><NavLink to="/persons" exact activeClassName={classes.active}>List</NavLink></li>
                <li><NavLink to="/persons/new" activeClassName={classes.active}>Add Person</NavLink></li>
                <li><button id="logout" onClick={this.props.logout}>Log Out</button></li>
              </React.Fragment>
            : <React.Fragment>
                <li><NavLink to="/signup" activeClassName={classes.active}>Sign up</NavLink></li>
                <li><NavLink to="/login" activeClassName={classes.active}>Log in</NavLink></li>
              </React.Fragment>;

        return (
            <Wrapper>
                <nav className={classes.MainNav}>
                    <ul>
                        {navLinks}
                    </ul>
                </nav>
                <main>
                    <Switch>
                        {this.props.username ? '' : <Redirect from='/persons' to='/login' />}
                        <Route path="/persons" component={Persons} />
                        <Route path="/signup" component={Auth} />
                        <Route path="/login" component={Auth} />
                        {
                            this.props.username 
                                ? <Redirect from="/" to="/persons" />
                                : <Redirect from="/" to="/login" />
                        }
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

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logoutStart())
    }
}

export const ConnectedApp = connect(mapStateToProps, null)(App);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
