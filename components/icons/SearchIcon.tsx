import React from 'react';

interface SearchIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  width = 16,
  height = 16,
  stroke = '#6B7280',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M11 11L14 14"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
