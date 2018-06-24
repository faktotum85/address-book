import React from 'react';
import { shallow } from 'enzyme';

import DataTable from './DataTable';

describe('DataTable', () => {
    let shallowDataTable;
    let props;
    const dataTable = (props) => {
        if (!shallowDataTable) {
            shallowDataTable = shallow(
                <DataTable {...props}/>
            );
            return shallowDataTable;
        }
    }

    beforeEach(() => {
        shallowDataTable = undefined;
        props = {
            labels: undefined,
            data: undefined,
            pagination: undefined
        }
    });

    it('always renders a table', () => {
        const table = dataTable().find('table');
        expect(table.length).toBe(1);
    });

    it('renders a th for each label passed in', () => {
        props.labels = {
            firstName: {},
            lastName: {},
        }
        const shallowTable = dataTable(props);
        expect(shallowTable.find('thead th').length).toBe(2);
    });

    it('renders a wrapped DataTableRow for each data element passed in (given that labels are also passed in)', () => {
        props.labels = {
            firstName: {}
        }
        props.data = [
            {
                firstName: 'Simon'
            },
            {
                firstName: 'Paul'
            }
        ];
        const shallowTable = dataTable(props);
        expect(shallowTable.find('tbody withRouter(DataTableRow)').length).toBe(2);
    });

    it('substitutes an empty string if a value for a provided label is missing in a data row', () => {
        props.labels = {
            firstName: {},
            lastName: {}
        };
        props.data = [{
            lastName: 'Weller'
        }];
        const shallowTable = dataTable(props);
        expect(shallowTable.find('tbody withRouter(DataTableRow)').first().props().rowData).toEqual(['', 'Weller']);
    });

    it('renders pagination controls when a pagination object is passed in', () => {
        props.pagination = {};
        const shallowTable = dataTable(props);
        expect(shallowTable.find('.pagination').length).toBe(1);
    });

    it('renders a pagination count when data is supplied and pagination.count & pagination.start are ints', () => {
        props.pagination = {
            start: 0,
            count: 20
        };
        props.data = [{}];
        const shallowTable = dataTable(props);
        expect(shallowTable.find('.pagination > div').first().text()).toBe('Showing 1 to 1 of 20 entries')
    });

    it('renders a Link for each of pagination.first, pagination.prev, pagination.next, pagination.last if they are passed in', () => {
        props.pagination = {
            first: '/persons?limit=10&offset=0',
            prev: '/persons?limit=10&offset=10',
            next: '/persons?limit=10&offset=30',
            last: '/persons?limit=10&offset=100'
        };
        const shallowTable = dataTable(props);
        expect(shallowTable.find('.paginationLinks Link').length).toBe(4);
    });

});
