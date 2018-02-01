import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import PersonForm from '../components/PersonForm/PersonForm';
import PersonsTable from './PersonsTable/PersonsTable';

class App extends Component {
    state = {
        persons: [],
        editing: false,
        personToEdit: null
    }

    componentDidMount() {
        axios.get('/api/persons')
            .then(res => {
                this.setState({ persons: res.data })
            })
            .catch(err => {
                console.error(err);
            });
    }

    addPersonHandler(person) {
        axios.post('/api/persons', person)
            .then(res => {
                const persons = [...this.state.persons];
                persons.push(res.data);
                this.setState({ persons });
            })
            .catch(err => {
                console.error(err);
            });
    }

    savePersonEditHandler = (person) => {
        axios.put(`/api/persons/${person._id}`, person)
            .then(res => {
                const persons = [...this.state.persons];
                persons[persons.findIndex(person => person._id === res.data._id)] = res.data;
                this.setState({
                    persons,
                    personToEdit: null,
                    editing: false
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    editPersonHandler = (id) => {
        this.setState({
            editing: true,
            personToEdit: id
        });
    }

    render() {
        return (
            <div className="App">
                <main>
                    <Route path="/" exact component={PersonsTable} />
                    <Route path="/add" component={PersonForm} />
                    {/* <PersonForm
                        savePersonHandler={this.addPersonHandler.bind(this)}
                        person={{}}
                        buttonText="Add"
                    /> */}
                    <Route path="/edit/:id" component={PersonForm} />
                    {/* {this.state.editing ?
                        <PersonForm
                            savePersonHandler={this.savePersonEditHandler.bind(this)}
                            person={this.state.persons.find(person => person['_id'] === this.state.personToEdit)}
                            buttonText="Save"
                        /> : null} */}
                </main>
            </div>
        );
    }
}

export default App;
