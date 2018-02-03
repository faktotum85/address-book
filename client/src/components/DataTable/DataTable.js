import React from 'react';

import DataTableRow from './DataTableRow/DataTableRow';
import classes from './DataTable.css';

const DataTable = (props) => {
  const keys = Object.keys(props.labels);
  const labels = Object.values(props.labels);
  const rows = props.data.map(row => {
      const keyedRow = keys.map(label => row[label]);
      return <DataTableRow key={row['_id']} rowData={keyedRow} />
  });

  return (
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
  )
};

export default DataTable;
