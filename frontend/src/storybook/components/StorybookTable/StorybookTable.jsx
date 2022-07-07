import React from 'react'
import 'StorybookTable.css'

/**
 * @description Table Component for Storybook
 * @param {any[]} headers - Elements that should be rendered in the headers
 * @param {rows[][]} rows - Arrays of elements that will render in the columns
 * @param {boolean} centerHeaders - true if headers should be centered; defaults to left
 * @param {boolean} centerRows - true if row columns should be centered; defaults to left
 */
export function StorybookTable({ headers, rows, centerHeaders=false, centerRows=false }) {
  const thead_style = { textAlign: centerHeaders ? "center" : "left" }
  const tbody_style = { textAlign: centerRows ? "center" : "left" }

  // Generate header rows
  const headerEls = (
    <tr>
      {headers.map((header) => (
        <th>{header}</th>
      ))}
    </tr>
  );

  // Generate body rows
  const rowEls = rows.map((row) => (
    <tr>
      {row.map((col) => (
        <td>{col}</td>
      ))}
    </tr>
  ));

  return (
    <table className='sb-table'>
      <thead style={thead_style}>
        {headerEls}
      </thead>
      <tbody style={tbody_style}>
        {rowEls}
      </tbody>
    </table>
  );
}
