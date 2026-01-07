import React, { useState } from 'react';
import EyeIcon from '../icons/EyeIcon';
import SortIcon from '../icons/SortIcon';

interface PremiumRequest {
  service: string;
  date: string;
  requestNumber: string;
}

interface PremiumRequestHistoryTableProps {
  headings: string[];
  data: PremiumRequest[];
}

const PremiumRequestHistoryTable: React.FC<PremiumRequestHistoryTableProps> = ({
  headings,
  data,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Sort data based on date
  const sortedData = data.toSorted((a, b) => {
    if (sortOrder === null) return 0;

    // Extract date from format "Le DD/MM/YYYY"
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const dateMatchA = dateRegex.exec(a.date);
    const dateMatchB = dateRegex.exec(b.date);

    if (!dateMatchA || !dateMatchB) return 0;

    const [dayA, monthA, yearA] = dateMatchA[0].split('/').map(Number);
    const [dayB, monthB, yearB] = dateMatchB[0].split('/').map(Number);

    if (yearA && yearB && monthA && monthB) {
      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleSort = (): void => {
    if (sortOrder === null) {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder(null);
    }
  };

  const getSortTitle = (): string => {
    if (sortOrder === null) {
      return 'Trier par date';
    }
    if (sortOrder === 'desc') {
      return 'Trier du plus ancien au plus récent';
    }
    return 'Réinitialiser le tri';
  };

  return (
    <div className="pt-2 overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"
              >
                {heading === 'Date de la demande' ? (
                  <div className="flex items-center gap-2">
                    <span>{heading}</span>
                    <button
                      onClick={handleSort}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title={getSortTitle()}
                    >
                      <SortIcon sortOrder={sortOrder} />
                    </button>
                  </div>
                ) : (
                  heading
                )}
              </th>
            ))}
            <th className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((request, index) => (
            <tr key={index}>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {request.service}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {request.date}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {request.requestNumber}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                <button className="border border-gray-300 p-1 rounded hover:bg-gray-50">
                  <EyeIcon width={16} height={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PremiumRequestHistoryTable;
