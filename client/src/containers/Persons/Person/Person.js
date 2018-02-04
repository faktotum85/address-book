import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import PersonForm from '../../../components/PersonForm/PersonForm';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Person extends Component {
    componentWillMount() {
        const id = this.props.match.params.id;
        if(id) {
            this.props.fetchPerson(id);
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        // save person
        this.props.savePerson(this.props.person._id)
    }

    onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.changePersonProperty(name, value);
    }

    render () {
        const buttonText = this.props.person._id ? 'Save' : 'Add';

        return (
            this.props.loading
                ? <Spinner />
                : <PersonForm person={this.props.person} buttonText={buttonText} handleSubmit={this.onFormSubmit} handleInputChange={this.onInputChange}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        person: state.persons.person,
        loading: state.persons.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPerson: (id) => dispatch(actions.fetchPerson(id)),
        changePersonProperty: (name, value) => dispatch(actions.changePersonProperty(name, value)),
        savePerson: (id) => dispatch(actions.savePerson(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);