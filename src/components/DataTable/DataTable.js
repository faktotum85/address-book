import React from 'react';
import { Link } from 'react-router-dom';

import DataTableRow from './DataTableRow/DataTableRow';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './DataTable.css';

const DataTable = (props) => {
    let headerRow, dataRows, keys;
    if (props.labels) {
        keys = Object.keys(props.labels);
        headerRow = keys
            .map(key => props.labels[key].label)
            .map((label, i) => <th key={i}>{label}</th>);
        if (props.data) {
            dataRows = props.data.map((row, index) => {
                const keyedRow = keys.map(label => row[label] || '');
                return <DataTableRow key={row['_id'] || index} rowData={keyedRow} id={row['_id'] || index} deleteHandler={props.deleteHandler} token={props.token}/>
            });
        }
    }

    let pagination = null;
    let paginationCount = null;

    if (props.pagination) {
        if (props.data && Number.isInteger(props.pagination.start) && Number.isInteger(props.pagination.count)) {
            paginationCount = (
                <div>
                    Showing {props.pagination.start + 1} to {props.pagination.start + props.data.length} of {props.pagination.count} entries
                </div>
            );
        }
        pagination = (
            <div className={classes.pagination}>
                {paginationCount}
                <div className={classes.paginationLinks}>
                    {props.pagination.first ? <Link to={props.pagination.first}>First</Link> : null}
                    {props.pagination.prev ? <Link to={props.pagination.prev}>Previous</Link> : null}
                    {props.pagination.next ? <Link to={props.pagination.next}>Next</Link> : null}
                    {props.pagination.last ? <Link to={props.pagination.last}>Last</Link> : null}
                </div>
            </div>
        );
    }

    return (
        <Wrapper>
            <table className={classes.DataTable}>
                <thead>
                    <tr>
                        {headerRow}
                    </tr>
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
            </table>
            {pagination}
        </Wrapper>
    )
};

export default DataTable;
