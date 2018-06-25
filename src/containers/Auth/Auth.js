import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DataForm from '../../components/DataForm/DataForm';

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

    onSubmitSignup = e => {
        e.preventDefault();
        this.props.signup(this.state.username, this.state.password);
    }

    onSubmitLogin = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
    
    render () {
        return (
            <Switch>
                <Route path="/signup" render={() => (
                    <DataForm 
                        title="Sign up"
                        data={this.state} 
                        config={this.props.config} 
                        buttonText='Sign up' 
                        handleInputChange={this.onInputChange} 
                        handleSubmit={this.onSubmitSignup} 
                    />
                )}/>
                <Route path="/login" render={() => (
                    <DataForm
                        title="Log in"
                        data={this.state}
                        config={this.props.config}
                        buttonText='Log in'
                        handleInputChange={this.onInputChange}
                        handleSubmit={this.onSubmitLogin}
                    />
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
        signup: (username, password) => dispatch(actions.signup(username, password)),
        login: (username, password) => dispatch(actions.login(username, password)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

export { Auth };