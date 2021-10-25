import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.iter === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      }));
    } else {
      onSort({ iter: item, order: "asc" });
    }
  };
  const getIconSort = (item) => {
    return selectedSort.iter !== item ? (
      ""
    ) : selectedSort.order === "asc" ? (
      <i className="bi bi-caret-up-fill"></i>
    ) : (
      <i className="bi bi-caret-down-fill"></i>
    );
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => {
          return (
            <th
              key={column}
              scope="col"
              onClick={
                columns[column].iter
                  ? () => handleSort(columns[column].iter)
                  : undefined
              }
              {...{ role: columns[column].iter && "button" }}
            >
              {columns[column].name}
              {columns[column].func ? `: ${columns[column].func}` : ""}{" "}
              {getIconSort(columns[column].iter)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
