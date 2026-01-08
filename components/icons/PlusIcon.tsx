import React from 'react';

interface PlusIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function PlusIcon({
  width = 24,
  height = 24,
  className = '',
}: Readonly<PlusIconProps>): React.JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
