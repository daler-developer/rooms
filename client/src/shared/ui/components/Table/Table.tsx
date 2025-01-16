import { ReactNode } from "react";

type HeaderElement = {
  key: string;
  label: ReactNode;
};

type Row = {
  [key: string]: ReactNode;
};

type Props = {
  headers: HeaderElement[];
  rows: Row[];
};

const Table = ({ headers, rows }: Props) => {
  const allHeaderKeys = headers.map((headerItem) => headerItem.key);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-6 py-3">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const cells = Object.entries(row).map((entry) => ({ columnKey: entry[0], content: entry[1] }));
            const sortedCells = cells.sort((cell1, cell2) => allHeaderKeys.indexOf(cell1.columnKey) - allHeaderKeys.indexOf(cell2.columnKey));

            return (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {sortedCells.map((cell) => {
                  return <td className="px-6 py-4">{cell.content}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
