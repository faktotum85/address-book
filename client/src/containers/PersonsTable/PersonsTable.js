import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import DataTable from '../../components/DataTable/DataTable';

class PersonsTable extends Component {
    componentWillMount() {
        this.props.fetchPersons();
    }

    render () {
        return (
            <DataTable labels={this.props.personLabels} data={this.props.persons} editRow={this.editPersonHandler} />
        );
    }
}

const mapStateToProps = state => {
    return {
        personLabels: state.personLabels,
        persons: state.persons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPersons: () => dispatch(actions.fetchPersons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTable);