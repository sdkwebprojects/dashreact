import React from 'react';
import ChevronRightIcon from '../icons/ChevronRightIcon';

interface ServiceCardProps {
  title: string;
  isBackgroundGray?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  isBackgroundGray,
}) => {
  return (
    <div
      className={`flex max-w-[179px] items-center w-full p-2 justify-between border border-gray-300 rounded-lg ${isBackgroundGray ? 'bg-[#D7D7D7]' : ''} `}
    >
      <span
        className={'font-[Inter] font-semibold text-[13px] leading-5 text-stark text-wrap '}
      >
        {title}
      </span>
      <div>
        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default ServiceCard;
