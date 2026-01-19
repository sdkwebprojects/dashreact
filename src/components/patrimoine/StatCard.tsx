import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  action,
}: Readonly<StatCardProps>): React.JSX.Element {
  return (
    <div className="flex flex-col flex-1 border border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[13px] text-gray-600">{title}</h2>
        {action}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-stark">{value}</span>
        {subtitle && <span className="text-[13px] text-gray-600">{subtitle}</span>}
      </div>
    </div>
  );
}
