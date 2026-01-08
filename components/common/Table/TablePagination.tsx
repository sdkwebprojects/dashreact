import React from 'react';
import { Tabs } from 'radix-ui';

export interface PaginationData {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TablePaginationProps {
  paginationData: PaginationData;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export default function TablePagination({
  paginationData,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [25, 50, 100],
}: Readonly<TablePaginationProps>): React.JSX.Element {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const totalPages = paginationData.totalPages;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex m-3 py-2 px-3 rounded-lg shadow-md border border-gray-300 items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-gray-600">Afficher</span>
        <Tabs.Root
          className="flex w-fit flex-col"
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <Tabs.List
            className="flex justify-between p-1 border border-gray-300 rounded-lg"
            aria-label="Page size selector"
          >
            {pageSizeOptions.map((size) => (
              <Tabs.Trigger
                key={size}
                className={`flex w-1/3 hover:cursor-pointer px-5 py-1 rounded-md items-center justify-center font-normal leading-5 text-[13px] ${
                  pageSize === size ? 'text-[#0046DA] bg-[#EAF3FE]' : 'bg-white'
                }`}
                value={size.toString()}
              >
                {size}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {/* Previous page button */}
          {currentPage > 1 && (
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px]"
            >
              ‹
            </button>
          )}

          {/* Page numbers */}
          {generatePageNumbers().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px] ${
                  currentPage === page ? 'font-semibold text-[#0066CC]' : ''
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${index}`} className="px-3 py-1 text-[13px]">
                {page}
              </span>
            )
          )}

          {/* Next page button */}
          {currentPage < paginationData.totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px]"
            >
              ›
            </button>
          )}
        </div>
      </div>
      <span className="text-[13px] text-gray-600">
        {paginationData.total === 0
          ? '0-0 sur 0'
          : `${(currentPage - 1) * pageSize + 1}-${Math.min(
              currentPage * pageSize,
              paginationData.total
            )} sur ${paginationData.total}`}
      </span>
    </div>
  );
}
