import React from 'react';

interface MenuActionItemProps {
  onClick: () => void;
  children: React.ReactNode;
  showBottomBorder?: boolean;
}

export default function MenuActionItem({
  onClick,
  children,
  showBottomBorder = false,
}: Readonly<MenuActionItemProps>): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 ${
        showBottomBorder ? 'border-b border-gray-200' : ''
      }`}
    >
      {children}
    </button>
  );
}
