import React from "react";

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th
          key={header}
          className="w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
