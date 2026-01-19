import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WarningIcon from '../components/icons/WarningIcon';
import ChevronRightStrokeIcon from '../components/icons/ChevronRightStrokeIcon';
import SearchIcon from '../components/icons/SearchIcon';
import VerticalDotsIcon from '../components/icons/VerticalDotsIcon';
import InfoBanner from '../components/common/InfoBanner';
import { Switch } from 'radix-ui';
import { contractInfo, subscriptionStats, subscriptionData, subscriptionMenuActions, getPaginatedSubscriptions, SubscriptionItem } from '../dummyData/subscriptions-data';
import MenuActionItem from '../components/patrimoine/MenuActionItem';
import { Table, Column } from '../components/common/Table';

export default function SubscriptionsPage(): React.JSX.Element {
  const { userInfo, data } = useAuth();
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'contracts'>('subscriptions');
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showErrorsOnly, setShowErrorsOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Access control
  if (userInfo?.userType !== 'InstallateurPremiumWithSite') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-stark mb-2">
            Accès refusé
          </h2>
          <p className="text-[13px] text-gray-600">
            Cette page est réservée aux utilisateurs premium.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  // Count modems with errors
  const modemsWithErrorsCount = subscriptionData.filter(
    (sub) => sub.modemHasErrors
  ).length;

  // Get paginated data
  const paginatedData = getPaginatedSubscriptions({
    page: currentPage,
    pageSize,
    searchQuery,
    showErrorsOnly,
  });

  const filteredSubscriptions = paginatedData.items;

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, showErrorsOnly, pageSize]);

  const toggleMenu = (id: string): void => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleMenuAction = (action: string, contractNumber: string): void => {
    console.info(`Action: ${action}, Contract: ${contractNumber}`);
    setOpenMenuId(null);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-container')) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  // Define table columns
  const columns: Column<SubscriptionItem>[] = [
    {
      key: 'contractNumber',
      header: 'N° de contrat',
      render: (sub) => (
        <>
          <div className="font-semibold">{sub.contractNumber}</div>
          <div className="text-gray-600">{sub.operator}</div>
        </>
      ),
    },
    {
      key: 'site',
      header: 'Nom et adresse du site',
      render: (sub) => (
        <>
          <div className="font-semibold">{sub.site}</div>
          <div className="text-gray-600">{sub.address}</div>
        </>
      ),
    },
    {
      key: 'contract',
      header: 'Contrat',
      render: (sub) => (
        <span
          className={`whitespace-pre-line ${
            sub.contractExpireSoon ? 'text-[#FF8C00]' : 'text-gray-700'
          }`}
        >
          {sub.contract}
        </span>
      ),
    },
    {
      key: 'billing',
      header: 'Facturation',
    },
    {
      key: 'modemCount',
      header: 'Modem et montant',
      render: (sub) => (
        <>
          <div className="flex items-center gap-1">
            {sub.modemHasErrors && (
              <WarningIcon width={16} height={16} circleFill="#FF8C00" />
            )}
            <span>{sub.modemCount}</span>
          </div>
          <div className="text-gray-600">{sub.modemAmount}</div>
        </>
      ),
    },
    {
      key: 'additionalService',
      header: 'Service additionnel',
    },
    {
      key: 'actions',
      header: '',
      headerClassName: 'w-10',
      render: (sub) => (
        <div className="relative menu-container">
          <button
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => toggleMenu(sub.contractNumber)}
          >
            <VerticalDotsIcon width={16} height={16} />
          </button>
          {openMenuId === sub.contractNumber && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-1">
              {subscriptionMenuActions.map((action) => (
                <MenuActionItem
                  key={action.id}
                  onClick={() => handleMenuAction(action.id, sub.contractNumber)}
                >
                  {action.label}
                </MenuActionItem>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors ${activeTab === 'subscriptions'
            ? 'border-[#0066CC] text-[#0066CC]'
            : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
        >
          Souscription
        </button>
        <button
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors ${activeTab === 'contracts'
            ? 'border-[#0066CC] text-[#0066CC]'
            : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
        >
          Contrats
        </button>
        <button className="ml-auto px-4 py-2 text-[13px] font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-blue-50 self-end mb-2">
          Gérer
        </button>
      </div>

      {activeTab === 'subscriptions' && (
        <>
          {/* Contract expiry banner */}
          <InfoBanner
            variant="warning"
            icon={<WarningIcon width={20} height={20} />}
            message={`Le contrat pré-payé n°${contractInfo.contractNumber} expire le ${contractInfo.expiryDate}.`}
            actionButton={{
              label: 'Renouveler',
              icon: <ChevronRightStrokeIcon width={16} height={16} stroke="#0066CC" />,
              href: '/subscriptions',
            }}
          />

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-4">
            {subscriptionStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col p-4 border border-gray-300 rounded-lg bg-white"
              >
                <div className="text-[11px] font-semibold text-stark mb-2">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold text-stark mb-1">{stat.value}</div>
                <div className="text-[11px] text-gray-600">{stat.subtitle}</div>
              </div>
            ))}
          </div>


          {/* Subscriptions table */}
          <Table
            columns={columns}
            data={filteredSubscriptions}
            header={
              <>
                <div className="flex w-1/2 justify-between">
                  <div className="flex-1 relative">
                    <SearchIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      width={16}
                      height={16}
                      stroke="#8994B5"
                    />
                    <input
                      type="text"
                      placeholder="Rechercher par n° d'abonnement, n° de site, adresse"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-[13px] text-stark">
                  <Switch.Root
                    checked={showErrorsOnly}
                    onCheckedChange={setShowErrorsOnly}
                    className="relative h-4 w-7 rounded-full bg-[#BAC2D5] data-[state=checked]:bg-[#0066CC]"
                  >
                    <Switch.Thumb className="block size-3 translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[13px]" />
                  </Switch.Root>
                  Afficher uniquement les modems en erreur ({modemsWithErrorsCount})
                </label>
              </>
            }
            pagination={{
              paginationData: paginatedData,
              pageSize,
              currentPage,
              onPageChange: setCurrentPage,
              onPageSizeChange: setPageSize,
            }}
            minHeight="600px"
          />

        </>
      )}

      {activeTab === 'contracts' && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Onglet Contrats - À implémenter</p>
        </div>
      )}
    </div>
  );
}
