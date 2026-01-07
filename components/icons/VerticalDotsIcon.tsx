import React from 'react';

interface VerticalDotsIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const VerticalDotsIcon: React.FC<VerticalDotsIconProps> = ({
  width = 16,
  height = 16,
  fill = '#374151',
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
      <circle cx="8" cy="3" r="1.5" fill={fill} />
      <circle cx="8" cy="8" r="1.5" fill={fill} />
      <circle cx="8" cy="13" r="1.5" fill={fill} />
    </svg>
  );
};

export default VerticalDotsIcon;
