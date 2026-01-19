import React, { ReactNode } from 'react';
import TableHeader from './TableHeader';
import TableBody, { Column } from './TableBody';
import TablePagination, { PaginationData } from './TablePagination';

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  header?: ReactNode;
  pagination?: {
    paginationData: PaginationData;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    pageSizeOptions?: number[];
  };
  minHeight?: string;
  emptyMessage?: string;
  rowClassName?: string;
  onRowClick?: (item: T, index: number) => void;
}

export default function Table<T>({
  columns,
  data,
  header,
  pagination,
  minHeight = '600px',
  emptyMessage = 'Aucun résultat trouvé',
  rowClassName = 'border-t border-gray-200 hover:bg-gray-50',
  onRowClick,
}: Readonly<TableProps<T>>): React.JSX.Element {
  const tableBodyProps = {
    columns,
    data,
    minHeight,
    emptyMessage,
    rowClassName,
    ...(onRowClick && { onRowClick }),
  };

  return (
    <div className="border p-3 border-gray-300 rounded-lg overflow-hidden">
      {header && <TableHeader>{header}</TableHeader>}
      <TableBody {...tableBodyProps} />
      {pagination && <TablePagination {...pagination} />}
    </div>
  );
}

export type { Column } from './TableBody';
export type { PaginationData } from './TablePagination';
