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

    it('renders a table', () => {
        props.labels = ['name'];
        props.data = [{name: 'Simon'}];
        const table = dataTable(props).find('table');
        expect(table.length).toBe(1);
    });

});
