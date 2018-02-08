import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

import * as actions from '../../store/auth/actions';

class Auth extends Component {
    state = {
        username: '',
        password: ''
    }

    onInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.submit(this.state.username, this.state.password);
    }

       
    render () {
        return (
            <Switch>
                <Route path="/signup" render={() => (
                    <Signup userdata={this.state} config={this.props.config} handleInputChange={this.onInputChange} handleSubmit={this.onSubmit}/>
                )}/>
                <Route path="/login" render={() => (
                    <Login />
                )} />
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        config: state.auth.config
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (username, password) => dispatch(actions.submitSignup(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);