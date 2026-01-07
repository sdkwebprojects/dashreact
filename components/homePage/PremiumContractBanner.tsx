import React from 'react';
import WarningIcon from '../icons/WarningIcon';
import ChevronRightStrokeIcon from '../icons/ChevronRightStrokeIcon';

interface PremiumContractBannerProps {
  contractNumber: string;
  expiryDate: string;
}

const PremiumContractBanner: React.FC<PremiumContractBannerProps> = ({
  contractNumber,
  expiryDate,
}) => {
  return (
    <div className="flex items-center justify-between bg-[#FFF4E5] border border-[#FFB020] rounded-lg p-4">
      <div className="flex items-center gap-2">
        <WarningIcon width={20} height={20} />
        <span className="text-sm text-stark">
          Le contrat pré-payé n°{contractNumber} expire le {expiryDate}.
        </span>
      </div>
      <button className="flex items-center gap-1 text-[#0066CC] text-sm font-medium hover:underline">
        Renouveler
        <ChevronRightStrokeIcon width={16} height={16} stroke="#0066CC" />
      </button>
    </div>
  );
};

export default PremiumContractBanner;
