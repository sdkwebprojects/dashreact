import React from 'react';

interface ClipboardIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
}

const ClipboardIcon: React.FC<ClipboardIconProps> = ({
  width = 16,
  height = 16,
  stroke = '#0066CC',
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
        d="M12 2H14V14H2V2H4M4 2V0H12V2M4 2H12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClipboardIcon;
