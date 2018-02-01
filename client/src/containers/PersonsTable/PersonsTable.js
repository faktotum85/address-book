import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../components/DataTable/DataTable';

class PersonsTable extends Component {
    render () {
        const personLabels = {
            firstName: 'Vorname',
            lastName: 'Nachname',
            address: 'Adresse',
            zipcode: 'Postleitzahl',
            city: 'Stadt'
        };        

        return (
            <DataTable labels={personLabels} data={this.props.persons} editRow={this.editPersonHandler} />
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    }
}

export default connect(mapStateToProps)(PersonsTable);