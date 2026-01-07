import React from 'react';

interface SortIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
  sortOrder?: 'asc' | 'desc' | null;
}

const SortIcon: React.FC<SortIconProps> = ({
  width = 12,
  height = 12,
  stroke = '#8994B5',
  className = '',
  sortOrder = null,
}) => {
  const activeStroke = '#0066CC';
  const inactiveStroke = stroke;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {sortOrder === null && (
        <>
          <path
            d="M3 5L6 2L9 5"
            stroke={inactiveStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 7L6 10L9 7"
            stroke={inactiveStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {sortOrder === 'desc' && (
        <path
          d="M3 4L6 7L9 4"
          stroke={activeStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {sortOrder === 'asc' && (
        <path
          d="M3 8L6 5L9 8"
          stroke={activeStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default SortIcon;
