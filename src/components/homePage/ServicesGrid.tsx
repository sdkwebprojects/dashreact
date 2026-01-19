import React, { Key } from 'react';
import ServiceCard from './ServiceCard';

interface ServicesGridProps {
  services: string[];
  layout?: 'default' | 'constrained';
}

const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  layout = 'default',
}) => {
  const containerClass =
    layout === 'constrained'
      ? 'flex w-[944px] gap-4 nowrap overflow-hidden'
      : 'flex gap-4';

  return (
    <div className={containerClass}>
      {services.map((element: string, index: Key | null | undefined) => (
        <ServiceCard
          key={index}
          title={element}
          isBackgroundGray={index === services.length - 1}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
