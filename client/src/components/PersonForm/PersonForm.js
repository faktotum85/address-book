import React from 'react';
import classes from './PersonForm.css';

const PersonForm = props => (
    <form className={classes.Form} onSubmit={props.handleSubmit}>
        <div className={classes.formFields}>
            <label>
                Vorname
                <input
                    autoFocus
                    type="text"
                    name="firstName"
                    value={props.person.firstName || ''}
                    onChange={props.handleInputChange}
                    required />
            </label>
            <label>
                Nachname
                <input
                    type="text"
                    name="lastName"
                    value={props.person.lastName || ''}
                    onChange={props.handleInputChange}
                    required />
            </label>
            <label>
                Adresse
                <input
                    type="text"
                    name="address"
                    value={props.person.address || ''}
                    onChange={props.handleInputChange}
                    required />
            </label>
            <label>
                Postleitzahl
                <input
                    type="text"
                    name="zipcode"
                    value={props.person.zipcode || ''}
                    onChange={props.handleInputChange}
                    required />
            </label>
            <label>
                Stadt
                <input
                    type="text"
                    name="city"
                    value={props.person.city || ''}
                    onChange={props.handleInputChange}
                    required />
            </label>
        </div>
        <button type="submit">{props.buttonText}</button>
    </form>
);

export default PersonForm;
