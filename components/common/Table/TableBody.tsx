import React, { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string | ReactNode;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  minHeight?: string;
  emptyMessage?: string;
  rowClassName?: string;
  onRowClick?: (item: T, index: number) => void;
}

export default function TableBody<T>({
  columns,
  data,
  minHeight = '600px',
  emptyMessage = 'Aucun résultat trouvé',
  rowClassName = 'border-t border-gray-200 hover:bg-gray-50',
  onRowClick,
}: Readonly<TableBodyProps<T>>): React.JSX.Element {
  return (
    <div className="relative" style={{ minHeight }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={
                  column.headerClassName ||
                  'text-left font-semibold text-[#8994B5] text-[11px] p-3'
                }
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center">
                <div className="text-gray-500 text-[13px]">{emptyMessage}</div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={rowClassName}
                onClick={() => onRowClick?.(item, index)}
              >
                {columns.map((column) => (
                  <td key={column.key} className={column.className || 'p-3 text-[13px]'}>
                    {column.render
                      ? column.render(item, index)
                      : String((item as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
