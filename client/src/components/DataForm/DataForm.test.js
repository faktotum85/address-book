import React from 'react';
import { shallow } from 'enzyme';

import DataForm from './DataForm';

describe('DataForm', () => {
    let shallowDataForm;
    let props;
    const dataForm = (props) => {
        if (!shallowDataForm) {
            shallowDataForm = shallow(
                <DataForm {...props} />
            );
            return shallowDataForm;
        }
    }

    beforeEach(() => {
        shallowDataForm = undefined;
        props = {
            config: {},
            data: {},
            buttonText: '',
            handleSubmit: () => {},
            handleInputChange: () => {},
            title: undefined
        }
    });

    it('renders correctly', () => {
        const form = dataForm(props);
        expect(form).toMatchSnapshot();        
    });

    it('renders any title that is provided as a h1', () => {
        const title = 'I am a form'
        props.title = title;
        const form = dataForm(props);
        expect(form.find('h1').text()).toBe(title);
    });

    it('creates an input for each element in the config', () => {
        props.config = {
            firstName: {},
            lastName: {}
        };
        const form = dataForm(props);
        expect(form.find('input').length).toBe(2);
    });

    it('marks an input as required if required: true is included in the config', () => {
        props.config = {
            firstName: {
                required: true
            }
        };
        const form = dataForm(props);
        expect(form.find('input').props().required).toBe(true);
    });

    it('initializes the value of an input to the corresponding data if it is provided', () => {
        props.config = {
            firstName: {}
        };
        props.data = {
            firstName: 'Simon'
        }
        const form = dataForm(props);
        expect(form.find('input[name="firstName"]').props().value).toBe('Simon');
    });

    it('initializes the value of an input to an empty string if no data is provided', () => {
        props.config = {
            firstName: {}
        };
        const form = dataForm(props);
        expect(form.find('input[name="firstName"]').props().value).toBe('');
    });

});