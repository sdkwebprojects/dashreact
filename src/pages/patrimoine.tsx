import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/patrimoine/StatCard';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';
import PlusIcon from '../components/icons/PlusIcon';
import ThreeDotsIcon from '../components/icons/ThreeDotsIcon';
import SortIcon from '../components/icons/SortIcon';
import StarIcon from '../components/icons/StarIcon';
import MenuActionItem from '../components/patrimoine/MenuActionItem';
import { Table, Column } from '../components/common/Table';
import type { PatrimoineSite } from '../dummyData/installateur-premium-with-site';
import { PatrimoineMenuActions, getPaginatedPatrimoineSites } from '../dummyData/installateur-premium-with-site';

export default function PatrimoinePage(): React.JSX.Element {
  const { userInfo, data } = useAuth();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
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

  if (!('PatrimoineStats' in data) || !('PatrimoineHeadings' in data) || !('PatrimoineSites' in data)) {
    return <div>Chargement...</div>;
  }

  const {
    PatrimoineStats,
    PatrimoineHeadings,
    PatrimoineSites,
  } = data;

  // Initialize favorites from data
  useEffect(() => {
    const initialFavorites = new Set(
      PatrimoineSites.filter((site) => site.isFavorite).map((site) => site.id)
    );
    setFavorites(initialFavorites);
  }, [PatrimoineSites]);

  const toggleFavorite = (siteId: string): void => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(siteId)) {
        newFavorites.delete(siteId);
      } else {
        newFavorites.add(siteId);
      }
      return newFavorites;
    });
  };

  const compareDates = (dateA: string, dateB: string): number => {
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const matchA = dateRegex.exec(dateA);
    const matchB = dateRegex.exec(dateB);

    if (!matchA || !matchB) return 0;

    const [dayA, monthA, yearA] = matchA[0].split('/').map(Number);
    const [dayB, monthB, yearB] = matchB[0].split('/').map(Number);

    if (!yearA || !yearB || !monthA || !monthB) return 0;

    const timeA = new Date(yearA, monthA - 1, dayA).getTime();
    const timeB = new Date(yearB, monthB - 1, dayB).getTime();

    return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
  };

  // Get paginated data
  const paginatedData = getPaginatedPatrimoineSites({
    page: currentPage,
    pageSize,
    searchQuery,
  });

  // Apply favorites sorting and date sorting to paginated items
  const sortedData = paginatedData.items.toSorted((a, b) => {
    const aIsFavorite = favorites.has(a.id);
    const bIsFavorite = favorites.has(b.id);

    // Always put favorites at the top
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;

    // If both are favorites or both are not, sort by date if active
    if (sortOrder !== null) {
      const dateComparison = compareDates(a.serviceDate, b.serviceDate);
      if (dateComparison !== 0) return dateComparison;
    }

    // Default sort by name
    return a.name.localeCompare(b.name);
  });

  const handleSort = (): void => {
    if (sortOrder === null) {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder(null);
    }
  };

  const getSortTitle = (): string => {
    if (sortOrder === null) {
      return 'Trier par date';
    }
    if (sortOrder === 'desc') {
      return 'Trier du plus ancien au plus récent';
    }
    return 'Réinitialiser le tri';
  };

  const toggleMenu = (siteId: string): void => {
    setOpenMenuId(openMenuId === siteId ? null : siteId);
  };

  const handleMenuAction = (action: string, siteId: string): void => {
    console.info(`Action: ${action}, Site ID: ${siteId}`);
    setOpenMenuId(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
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

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Define table columns
  const columns: Column<PatrimoineSite>[] = [
    {
      key: 'favorite',
      header: '',
      headerClassName: 'w-4',
      className: 'flex items-center pr-2 h-[50px] font-normal text-[13px] border-t border-gray-200',
      render: (site) => (
        <button
          onClick={() => toggleFavorite(site.id)}
          className="hover:opacity-70 transition-opacity cursor-pointer"
          aria-label={
            favorites.has(site.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'
          }
        >
          <StarIcon width={16} height={16} filled={favorites.has(site.id)} />
        </button>
      ),
    },
    {
      key: 'id',
      header: PatrimoineHeadings[0] || 'N° de site',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'name',
      header: PatrimoineHeadings[1] || 'Nom et adresse',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (site) => (
        <div>
          <div className="font-normal">{site.name}</div>
          <div className="text-gray-600">{site.address}</div>
        </div>
      ),
    },
    {
      key: 'serviceDate',
      header: (
        <div className="flex items-center gap-2">
          <span>{PatrimoineHeadings[2] || 'Date de mise en service'}</span>
          <button
            onClick={handleSort}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={getSortTitle()}
          >
            <SortIcon sortOrder={sortOrder} />
          </button>
        </div>
      ),
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'connected',
      header: PatrimoineHeadings[3] || 'Connecté',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (site) => (site.connected ? 'Oui' : 'Non'),
    },
    {
      key: 'technology',
      header: PatrimoineHeadings[4] || 'Technologie',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'hasMaintenanceContract',
      header: PatrimoineHeadings[5] || 'Contrat maintenance',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (site) => (site.hasMaintenanceContract ? 'Oui' : 'Non'),
    },
    {
      key: 'actions',
      header: '',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (site) => (
        <div className="relative menu-container">
          <button
            className="border border-gray-300 p-1 rounded hover:bg-gray-50"
            onClick={() => toggleMenu(site.id)}
          >
            <ThreeDotsIcon width={16} height={16} />
          </button>
          {openMenuId === site.id && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-1">
              {PatrimoineMenuActions.map((action) => (
                <MenuActionItem
                  key={action.id}
                  onClick={() => handleMenuAction(action.id, site.id)}
                  {...(action.showBottomBorder !== undefined && {
                    showBottomBorder: action.showBottomBorder,
                  })}
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
    <div className="flex px-6 gap-6 flex-col">
      {/* Main Patrimoine Section */}
      <div className="flex flex-col gap-6 rounded-lg">
        {/* Header with Title and Button */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-stark text-[16px]">Patrimoine</h1>
          <button className="flex items-center gap-2 px-3 py-1 text-[13px] font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-gray-100 hover:text-blue-500 hover:cursor-pointer">
            Gérer mon patrimoine
            <ExternalLinkIcon width={16} height={16} />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-5">
          <StatCard
            title="Badges totaux"
            value={PatrimoineStats.totalBadges}
            subtitle={`dont ${PatrimoineStats.passCount} pass`}
          />

          <StatCard
            title="Badges non utilisés"
            value={PatrimoineStats.unusedBadges}
            action={
              <button className="text-[#0066CC] hover:underline">
                <ExternalLinkIcon width={20} height={20} />
              </button>
            }
          />

          <StatCard
            title="Utilisateurs logiciel"
            value={PatrimoineStats.softwareUsers}
            action={
              <div className="border border-gray-300 rounded-lg p-0.5">
                <PlusIcon width={18} height={18} />
              </div>
            }
          />
        </div>

        {/* Sites Table */}
        <div className="pt-1">
          <Table
            columns={columns}
            data={sortedData}
            minHeight="auto"
            rowClassName="hover:bg-gray-50"
            header={
              <div className="flex w-1/2 items-center gap-4 mb-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Rechercher par n° de site, adresse"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-[13px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14L11.1 11.1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            }
            pagination={{
              paginationData: paginatedData,
              pageSize,
              currentPage,
              onPageChange: setCurrentPage,
              onPageSizeChange: setPageSize,
            }}
          />
        </div>
      </div>
    </div>
  );
}
