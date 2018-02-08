import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

class Auth extends Component {
       
    render () {
        return (
            <Switch>
                <Route path="/signup" render={() => (
                    <Signup />
                )}/>
                <Route path="/login" render={() => (
                    <Login />
                )} />
            </Switch>
        );
    }
}

export default Auth;