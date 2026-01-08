import React from 'react';
import QuoteCard from '../components/homePage/QuoteCard';
import FavoriteItems from '../components/homePage/FavoriteItems';
import Feed from '../components/homePage/Feed';
import ContactUs from '../components/homePage/ContactUs';
import PremiumOffers from '../components/homePage/PremiumOffers';
import PartnerInstallerCta from '../components/homePage/PartnerInstallerCta';
import SiteInformationSection from '../components/homePage/SiteInformationSection';
import PremiumServicesSection from '../components/homePage/PremiumServicesSection';
import ServicesGrid from '../components/homePage/ServicesGrid';
import InfoBanner from '../components/common/InfoBanner';
import InfoIcon from '../components/icons/InfoIcon';
import ChevronRightStrokeIcon from '../components/icons/ChevronRightStrokeIcon';
import { useAuth } from '../contexts/AuthContext';
import WarningIcon from '../components/icons/WarningIcon';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';

export default function Page(): React.JSX.Element {
  const { userInfo, data } = useAuth();

  const isParticulierWithoutZeno = userInfo?.userType === 'particulierWithoutZeno';

  const isInterneUrmet = userInfo?.userType === 'interneUrmet'

  const isPremiumInstaller =
    userInfo?.userType === 'InstallateurPremiumWithSite';

  const isNonPremiumInstaller =
    userInfo?.userType === 'installateurNonPremiumSansSite';

  const isPromoteurBe =
    userInfo?.userType === 'promoteurBe';

  return (
    <div className="flex flex-col gap-5">
      <h1 className="flex items-center gap-4 text-xl font-semibold">
        Bonjour {userInfo?.name} {isPremiumInstaller && <div className="font-semibold text-[13px] py-1 px-2 border border-black rounded-2xl">premium +</div>}
      </h1>

      {isPremiumInstaller && data && 'PremiumContractInfo' in data && (
        <InfoBanner
          variant="warning"
          icon={<WarningIcon width={20} height={20} />}
          message={`Le contrat pré-payé n°${data.PremiumContractInfo.contractNumber} expire le ${data.PremiumContractInfo.expiryDate}.`}
          actionButton={{
            label: 'Renouveler',
            icon: <ExternalLinkIcon width={16} height={16} fill="#0066CC" />,
            href: '/subscriptions'
          }}
        />
      )}

      {isNonPremiumInstaller && data && 'InfoBannerData' in data && (
        <InfoBanner
          variant="info"
          icon={<InfoIcon width={20} height={20} fill="#0066CC" />}
          message={data.InfoBannerData.message}
          actionButton={{
            label: data.InfoBannerData.actionLabel,
            icon: <ChevronRightStrokeIcon width={16} height={16} stroke="#0066CC" />,
            href: '/orders'
          }}
        />
      )}

      {isPremiumInstaller && data && 'ConsumptionSiteInfo' in data && 'ModemAlerts' in data && (
        <SiteInformationSection
          consumptionSiteInfo={data.ConsumptionSiteInfo}
          modemAlerts={data.ModemAlerts}
        />
      )}

      {isPremiumInstaller && data && 'PremiumOffers' in data && (
        <PremiumOffers offers={data.PremiumOffers} />
      )}

      {data && isPremiumInstaller && (
        <PremiumServicesSection services={data.Services} />
      )}

      {data && (isNonPremiumInstaller || isInterneUrmet || isParticulierWithoutZeno || isPromoteurBe) && <ServicesGrid services={data.Services} />}


      {isNonPremiumInstaller && data && 'PartnerBannerData' in data && (
        <PartnerInstallerCta
          title={data.PartnerBannerData.title}
          description={data.PartnerBannerData.description}
          buttonText={data.PartnerBannerData.buttonText}
        />
      )}

      <div className="flex gap-5">
        <QuoteCard title={'Faire une demande de devis'} />
        {data && 'FavoriteProducts' in data && (
          <FavoriteItems
            title={`Vos articles favoris (${data.FavoriteProducts.length})`}
            favorites={data.FavoriteProducts}
          />
        )}
      </div>

      {!isPremiumInstaller && <Feed title="Nos actualités" />}
      <ContactUs title="Nous contacter" />
    </div>
  );
}
