import React from 'react';
import classes from './DataForm.css';

const DataForm = props => {
    const formFields = Object.keys(props.config).map(key => (
        <label key={key}>
            {props.config[key].label}
            <input
                type={props.config[key].type}
                name={key}
                value={props.data[key] || ''}
                onChange={props.handleInputChange}
                required={props.config[key].required}
            />
        </label>
    ));

    return (
        <form className={classes.Form} onSubmit={props.handleSubmit}>
            <div className={classes.formFields}>
                {formFields}
            </div>
            <button type="submit">{props.buttonText}</button>
        </form>
    );
};

export default DataForm;
