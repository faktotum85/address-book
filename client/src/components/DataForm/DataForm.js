import React from 'react';
import PropTypes from 'prop-types';
import classes from './DataForm.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

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

    const title = props.title ? <h1>{props.title}</h1> : null;

    return (
        <Wrapper>
            {title}
            <form className={classes.Form} onSubmit={props.handleSubmit}>
                <div className={classes.formFields}>
                    {formFields}
                </div>
                <button type="submit">{props.buttonText}</button>
            </form>
        </Wrapper>
    );
};

DataForm.propTypes = {
    config: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    buttonText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default DataForm;
