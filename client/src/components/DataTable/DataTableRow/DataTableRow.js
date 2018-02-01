import React from 'react';

const DataTableRow = (props) => {

  return(
    <tr>
      {props.rowData.map((column, i) => <td key={i}>{column}</td>)}
      <td><button onClick={props.edit}>Edit</button></td>
    </tr>
  );
};

export default DataTableRow;
