import React, { Component } from 'react';

import classes from './PersonForm.css';

class PersonForm extends Component {
  state = {
    person: this.props.person
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.person !== nextProps.person) {
      this.setState({person: nextProps.person});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.savePersonHandler({
      firstName: '',
      lastName: '',
      address: '',
      zipcode: '',
      city: '',
      ...this.state.person
    });
    this.setState({person: {}});
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const person = {...this.state.person}
    person[name] = value;

    this.setState({person});
  }

  render() {
    return (
      <form className={classes.Form} onSubmit={this.handleSubmit}>
        <div className={classes.formFields}>
          <label>
            Vorname
            <input
              type="text"
              name="firstName"
              value={this.state.person.firstName || ''}
              onChange={this.handleInputChange}
              required/>
          </label>
          <label>
            Nachname
            <input
              type="text"
              name="lastName"
              value={this.state.person.lastName || ''}
              onChange={this.handleInputChange}
              required/>
          </label>
          <label>
            Adresse
            <input
              type="text"
              name="address"
              value={this.state.person.address || ''}
              onChange={this.handleInputChange}
              required/>
          </label>
          <label>
            Postleitzahl
            <input
              type="text"
              name="zipcode"
              value={this.state.person.zipcode || ''}
              onChange={this.handleInputChange}
              required/>
          </label>
          <label>
            Stadt
            <input
              type="text"
              name="city"
              value={this.state.person.city || ''}
              onChange={this.handleInputChange}
              required/>
          </label>
        </div>
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }

}


export default PersonForm;
