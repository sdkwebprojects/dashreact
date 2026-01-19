import Link from 'next/link';
import React from 'react';

type BannerVariant = 'warning' | 'info';

interface InfoBannerProps {
  icon?: React.ReactNode;
  message: string | React.ReactNode;
  actionButton?: {
    label: string;
    icon?: React.ReactNode;
    href: string;
  };
  variant?: BannerVariant;
}

const variantStyles = {
  warning: {
    background: 'bg-[#FFF4E5]',
    border: 'border-[#FFB020]',
  },
  info: {
    background: 'bg-[#EAF3FE]',
    border: 'border-[#0066CC]',
  },
};

export default function InfoBanner({
  icon,
  message,
  actionButton,
  variant = 'warning',
}: Readonly<InfoBannerProps>): React.JSX.Element {
  const styles = variantStyles[variant];

  return (
    <div className={`flex items-center justify-between ${styles.background} border ${styles.border} rounded-lg p-4`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-stark">
          {message}
        </span>
      </div>
      {actionButton && (
        <Link
          href={actionButton.href ?? ''}
          className="flex items-center gap-1 text-[#0066CC] text-sm font-medium hover:underline"
        >
          {actionButton.label}
          {actionButton.icon}
        </Link>
      )}
    </div>
  );
}
