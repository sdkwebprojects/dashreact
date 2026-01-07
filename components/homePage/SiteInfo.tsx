import React, { useState } from 'react';
import WarningIcon from '../icons/WarningIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import StarIcon from '../icons/StarIcon';

interface SiteInfoProps {
  title: string;
  sites: string[];
  defaultSite?: string;
}

const SiteInfo: React.FC<SiteInfoProps> = ({ title, sites, defaultSite }) => {
  const [selectedSite, setSelectedSite] = useState(defaultSite || sites[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col grow gap-2 border border-gray-300 rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-sm text-stark mb-3">Consommation</h4>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 w-full p-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            <WarningIcon width={18} height={18} circleFill="#FF8C00" />

            <span className="text-sm text-stark flex-1 text-left">
              {selectedSite}
            </span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
              {sites.map((site, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedSite(site);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 ${
                    selectedSite === site ? 'bg-blue-50' : ''
                  }`}
                >
                  <StarIcon
                    width={16}
                    height={16}
                    fill={selectedSite === site ? '#FFB020' : '#D1D5DB'}
                    stroke={selectedSite === site ? '#FFB020' : '#D1D5DB'}
                  />
                  <span className="text-[13px] text-stark">{site}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center text-gray-400 mt-3">
        {/* Placeholder for graph/chart */}
      </div>
    </div>
  );
};

export default SiteInfo;
