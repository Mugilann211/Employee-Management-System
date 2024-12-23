import React from 'react';
import { Employee } from '../types/Employee';
import {
  useTable,
  useSortBy,
  useFilters,
  Column,
  Row,
  HeaderGroup,
} from 'react-table';

interface Props {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const columns: Column<Employee>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Filter: TextFilter,
      },
      {
        Header: 'Department',
        accessor: 'department',
        Filter: TextFilter,
      },
      {
        Header: 'Position',
        accessor: 'position',
        Filter: TextFilter,
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: Row<Employee> }) => (
          <div>
            <button
              className="edit-button"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${row.original.name}?`)) {
                  onDelete(row.original.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
      
      
    ],
    [onEdit, onDelete]
  );

  const tableInstance = useTable<Employee>(
    { columns, data, defaultColumn: { Filter: DefaultColumnFilter } },
    useFilters,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<Employee>) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: Column<Employee>) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: Row<Employee>) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Default Filter Component
const DefaultColumnFilter: React.FC = ({ column }: any) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search...`}
    />
  );
};

// Text Filter Component
const TextFilter: React.FC = ({ column }: any) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search...`}
    />
  );
};

export default EmployeeTable;
