import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import PersonForm from '../../../components/PersonForm/PersonForm';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Person extends Component {
    componentWillMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchPerson(id);
        } else {
            this.props.clearPerson();
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentId = this.props.match.params.id;
        const nextId = nextProps.match.params.id;
        if (currentId !== nextId) {
            nextId ? nextProps.fetchPerson(nextId) : nextProps.clearPerson();
        }
    }
    
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.savePerson(this.props.person._id)
    }

    onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.changePersonProperty(name, value);
    }

    render() {
        const buttonText = this.props.person._id ? 'Save' : 'Add';

        return (
            this.props.loading
                ? <Spinner />
                : <PersonForm person={this.props.person} buttonText={buttonText} handleSubmit={this.onFormSubmit} handleInputChange={this.onInputChange} />
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
        savePerson: (id) => dispatch(actions.savePerson(id)),
        clearPerson: () => dispatch(actions.clearPerson())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);