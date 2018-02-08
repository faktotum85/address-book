import React from 'react';
import PropTypes from 'prop-types';

import DataForm from '../../DataForm/DataForm';
import Wrapper from '../../../hoc/Wrapper/Wrapper';

const Signup = (props) => (
    <Wrapper>
        <h1>Signup</h1>
        <DataForm data={props.userdata} config={props.config} buttonText='Sign up' handleInputChange={props.handleInputChange} handleSubmit={props.handleSubmit}/>
    </Wrapper>
);

Signup.propTypes = {
    userdata: PropTypes.object
}

export default Signup;