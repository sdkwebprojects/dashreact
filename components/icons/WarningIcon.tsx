import React from 'react';

interface WarningIconProps {
  width?: number;
  height?: number;
  circleFill?: string;
  strokeColor?: string;
  className?: string;
}

const WarningIcon: React.FC<WarningIconProps> = ({
  width = 20,
  height = 20,
  circleFill = '#FFB020',
  strokeColor = 'white',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="10" cy="10" r="9" fill={circleFill} />
      <path
        d="M10 6V11M10 14H10.01"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WarningIcon;
