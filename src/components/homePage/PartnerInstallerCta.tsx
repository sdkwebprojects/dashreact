import React from 'react';

interface PartnerInstallerCtaProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function PartnerInstallerCta({
  title,
  description,
  buttonText,
}: Readonly<PartnerInstallerCtaProps>): React.JSX.Element {
  return (
    <div className="flex gap-6 p-6 border border-gray-300 rounded-lg bg-white">
      {/* Image placeholder */}
      <div className="w-23 h-28 bg-gray-200 rounded-lg" />

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-[16px] font-semibold text-stark leading-5">
          {title}
        </h2>
        <p className="text-[13px] text-stark leading-5">
          {description}
        </p>
        <div>
          <button className="px-3 py-1.5 text-[13px] font-semibold text-[#0066CC] border-2 border-[#0066CC] rounded-lg hover:bg-[#0052A3] transition-colors">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
