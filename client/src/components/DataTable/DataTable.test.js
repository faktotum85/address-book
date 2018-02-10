import React from 'react';
import { shallow } from 'enzyme';

import DataTable from './DataTable';

describe('DataTable', () => {
    let mountedDataTable;
    let props;
    const dataTable = (props) => {
        if (!mountedDataTable) {
            mountedDataTable = shallow(
                <DataTable {...props}/>
            );
            return mountedDataTable;
        }
    }

    beforeEach(() => {
        mountedDataTable = undefined;
        props = {
            labels: undefined,
            data: undefined
        }
    });

    it('always renders a table', () => {
        const table = dataTable().find('table');
        expect(table.length).toBe(1);
    });

    it('renders a table when data is passed in', () => {
        props.labels = ['name'];
        props.data = [{name: 'Simon', _id: 1}];
        const table = dataTable(props).find('table');
        expect(table.length).toBe(1);
    });

});
