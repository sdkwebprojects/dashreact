import React, { ReactNode } from 'react';

export interface TableHeaderProps {
  children: ReactNode;
}

export default function TableHeader({ children }: Readonly<TableHeaderProps>): React.JSX.Element {
  return (
    <div className="flex justify-between items-center gap-4 px-4 py-2">
      {children}
    </div>
  );
}
