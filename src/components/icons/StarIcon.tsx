import React from 'react';

interface StarIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
  filled?: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = '#D1D5DB',
  className = '',
  filled = false,
}) => {
  const fillColor = filled ? '#FFD700' : fill;
  const strokeColor = filled ? '#FFD700' : stroke;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 1L10.163 5.38L15 6.13L11.5 9.55L12.326 14.37L8 12.1L3.674 14.37L4.5 9.55L1 6.13L5.837 5.38L8 1Z"
        stroke={strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StarIcon;
