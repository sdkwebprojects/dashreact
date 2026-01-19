import React from 'react';

interface ChevronDownIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  width = 16,
  height = 16,
  stroke = '#374151',
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
      <path
        d="M4 6L8 10L12 6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownIcon;
