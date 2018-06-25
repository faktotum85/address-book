import React from 'react';
import { shallow } from 'enzyme';

import { DataTableRow } from './DataTableRow';

describe('DataTableRow', () => {
    let shallowDataTableRow;
    let props;
    const dataTableRow = (props) => {
        if (!shallowDataTableRow) {
            shallowDataTableRow = shallow(
                <DataTableRow {...props} />
            );
            return shallowDataTableRow;
        }
    }

    beforeEach(() => {
        shallowDataTableRow = undefined;
        props = {
            rowData: undefined,
            deleteHandler: undefined,
            match: undefined,
            id: undefined,
        }
    });

    it('renders correctly', () => {
        const shallowRow = dataTableRow(props);
        expect(shallowRow).toMatchSnapshot();
    });

    it('renders a td per rowData element passed in', () => {
        props.rowData = ['Simon', 'Weller'];
        const shallowRow = dataTableRow(props);
        expect(shallowRow.find('td').length).toBe(2);
    });

    it('renders a delete button in the action cell if a deleteHandler is passed in', () => {
        props.deleteHandler = () => {};
        const shallowRow = dataTableRow(props);
        expect(shallowRow.find('.actions button').length).toBe(1);
    });

    it('calls the deleteHandler with the id when the delete button is clicked', () => {
        const deleteHandler = jest.fn();
        props.deleteHandler = deleteHandler;
        props.id = 27;
        const shallowRow = dataTableRow(props);
        shallowRow.find('.actions button').simulate('click');
        expect(deleteHandler).toBeCalledWith(27, undefined);
    });

    it('renders an edit link in the action cell if an id is passed in and a url can be matched', () => {
        props.id = 0;
        props.match = {
            url: ''
        }
        const shallowRow = dataTableRow(props);
        expect(shallowRow.find('.actions Link').length).toBe(1);
    });

});