import React from "react";
import "./Table.css";

function Table({ countries, isDark }) {
  return (
    <div className={isDark ? "table_dark" : "table_light"}>
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}
export default Table;
