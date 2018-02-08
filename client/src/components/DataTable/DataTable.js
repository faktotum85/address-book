import React from 'react';
import { Link } from 'react-router-dom';

import DataTableRow from './DataTableRow/DataTableRow';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './DataTable.css';

const DataTable = (props) => {
    const keys = Object.keys(props.labels);
    const labels = keys.map(key => props.labels[key].label);
    const rows = props.data.map(row => {
        const keyedRow = keys.map(label => row[label]);
        return <DataTableRow key={row['_id']} rowData={keyedRow} id={row['_id']} deleteHandler={props.deleteHandler} />
    });

    const pagination = Object.keys(props.pagination).length > 0 
        ? <div className={classes.pagination}>
            <div>
                Showing {props.pagination.start + 1} to {props.pagination.start + props.data.length} of {props.pagination.count} entries
            </div>
            <div className={classes.paginationLinks}>
                {props.pagination.first ? <Link to={props.pagination.first}>First</Link> : null}
                {props.pagination.prev ? <Link to={props.pagination.prev}>Previous</Link> : null}
                {props.pagination.next ? <Link to={props.pagination.next}>Next</Link> : null}
                {props.pagination.last ? <Link to={props.pagination.last}>Last</Link> : null}
            </div>
        </div>
        : null;

    return (
        <Wrapper>
            <table className={classes.DataTable}>
                <thead>
                    <tr>
                        {labels.map((label, i) => <th key={i}>{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            {pagination}
        </Wrapper>
    )
};

export default DataTable;
