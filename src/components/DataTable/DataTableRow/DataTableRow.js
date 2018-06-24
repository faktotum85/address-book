import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import classes from './DataTableRow.css';

const DataTableRow = (props) => {

    const rowData = props.rowData ?
        props.rowData.map((column, i) => <td key={i}>{column}</td>)
        : null;
    const editLink = props.match && props.id !== undefined ? 
        <Link to={props.match.url + '/' + props.id}>
            Edit
        </Link>
        : null;
    const deleteButton = props.deleteHandler ?
        <button onClick={() => props.deleteHandler(props.id)}>
            Delete
        </button>
        : null;
    const actions = editLink || deleteButton ? 
        <td className={classes.actions}>
            {editLink}
            {deleteButton}
        </td>
        : null;
    
    return (
        <tr>
            {rowData}
            {actions}
        </tr>
    );
};

export default withRouter(DataTableRow);
export { DataTableRow };