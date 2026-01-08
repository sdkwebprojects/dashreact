import React from 'react';
import Link from 'next/link';
import SiteInfo from './SiteInfo';
import ModemAlerts from './ModemAlerts';

interface Alert {
  id: string;
  name: string;
  issue: string;
}

interface ConsumptionSiteInfo {
  title: string;
  sites: string[];
  defaultSite: string;
}

interface SiteInformationSectionProps {
  consumptionSiteInfo: ConsumptionSiteInfo;
  modemAlerts: Alert[];
}

const SiteInformationSection: React.FC<SiteInformationSectionProps> = ({
  consumptionSiteInfo,
  modemAlerts,
}) => {
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-stark">
          Informations sur vos sites
        </h3>
        <Link
          href="/patrimoine"
          className="cursor-pointer px-3 py-1 rounded-lg font-semibold text-[13px] text-[#0066CC] border border-[#0066CC] hover:bg-blue-50"
        >
          Voir tous vos sites
        </Link>
      </div>
      <div className="flex gap-4 p-4">
        <SiteInfo
          title={consumptionSiteInfo.title}
          sites={consumptionSiteInfo.sites}
          defaultSite={consumptionSiteInfo.defaultSite}
        />
        <ModemAlerts alerts={modemAlerts} />
      </div>
    </div>
  );
};

export default SiteInformationSection;
