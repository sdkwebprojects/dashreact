import React from 'react';

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  width = 16,
  height = 16,
  stroke = 'white',
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
        d="M4 8H12M12 8L9 5M12 8L9 11"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
