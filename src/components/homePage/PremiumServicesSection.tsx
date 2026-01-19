import React, { Key } from 'react';
import ServiceCard from './ServiceCard';

interface PremiumServicesSectionProps {
  services: string[];
}

const PremiumServicesSection: React.FC<PremiumServicesSectionProps> = ({
  services,
}) => {
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-stark">Vos services</h3>
        <button className="px-3 py-1 rounded-lg font-semibold text-[13px] text-[#0066CC] border border-[#0066CC] hover:bg-blue-50">
          Explorer tous nos services
        </button>
      </div>
      <div className="flex gap-4 p-4">
        {services.map((element: string, index: Key | null | undefined) => (
          <ServiceCard
            key={index}
            title={element}
            isBackgroundGray={index === services.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumServicesSection;
