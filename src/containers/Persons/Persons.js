import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PersonsList from './PersonsList/PersonsList';
import Person from './Person/Person';

class Persons extends Component {
    render () {
        return (
            <Switch>
                <Route path={this.props.match.url} exact component={PersonsList}/>
                <Route path={this.props.match.url + '/new'} component={Person}/>
                <Route path={this.props.match.url + '/:id'} component={Person} />
            </Switch>
        );
    }   
}

export default Persons;