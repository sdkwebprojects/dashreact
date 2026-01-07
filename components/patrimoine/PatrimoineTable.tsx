import React, { useState } from 'react';
import ThreeDotsIcon from '../icons/ThreeDotsIcon';
import SortIcon from '../icons/SortIcon';
import StarIcon from '../icons/StarIcon';
import type { PatrimoineSite } from '../../dummyData/InstallateurPremiumWithSite';

interface PatrimoineTableProps {
  headings: string[];
  data: PatrimoineSite[];
}

const PatrimoineTable: React.FC<PatrimoineTableProps> = ({
  headings,
  data,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(data.filter((site) => site.isFavorite).map((site) => site.id)),
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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

  // Filter data by search query and favorites
  const filteredData = data.filter((site) => {
    const matchesSearch =
      searchQuery === '' ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Sort data: favorites first, then by date if sort is active, then by name
  const sortedData = filteredData.toSorted((a, b) => {
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

  return (
    <div className="pt-2 ">
      <div className="flex items-center gap-4 mb-4">
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
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-4"></th>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"
              >
                {heading === 'Date de mise en service' ? (
                  <div className="flex items-center gap-2">
                    <span>{heading}</span>
                    <button
                      onClick={handleSort}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title={getSortTitle()}
                    >
                      <SortIcon sortOrder={sortOrder} />
                    </button>
                  </div>
                ) : (
                  heading
                )}
              </th>
            ))}
            <th className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((site) => (
            <tr key={site.id}>
              <td className="flex items-center pr-2 h-[50px] font-normal text-[13px] border-t border-gray-200">
                <button
                  onClick={() => toggleFavorite(site.id)}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label={
                    favorites.has(site.id)
                      ? 'Retirer des favoris'
                      : 'Ajouter aux favoris'
                  }
                >
                  <StarIcon
                    width={16}
                    height={16}
                    filled={favorites.has(site.id)}
                  />
                </button>
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {site.id}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                <div>
                  <div className="font-normal">{site.name}</div>
                  <div className="text-gray-600">{site.address}</div>
                </div>
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {site.serviceDate}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {site.connected ? 'Oui' : 'Non'}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {site.technology}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {site.hasMaintenanceContract ? 'Oui' : 'Non'}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                <div className="relative menu-container">
                  <button
                    className="border border-gray-300 p-1 rounded hover:bg-gray-50"
                    onClick={() => toggleMenu(site.id)}
                  >
                    <ThreeDotsIcon width={16} height={16} />
                  </button>
                  {openMenuId === site.id && (
                    <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-1">
                      <button
                        onClick={() => handleMenuAction('voir-plus', site.id)}
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Voir plus d'informations
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('voir-consommation', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Voir la consommation
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('statut-modems', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Consulter le statut de mes modems
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('offre-additionnelle', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Ajouter une offre additionnelle
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('gestion-site', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Accéder à la gestion du site
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('badge-programme', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Commander un badge programmé
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('telecommande-programme', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Commander une télécommande programmée
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('passe-programme', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 border-b border-gray-200"
                      >
                        Commander un passe programmé
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction('modifier-materiel', site.id)
                        }
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50"
                      >
                        Modifier une information sur du matériel
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-4 pt-4 pb-2">
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          <span>Afficher</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-[13px]">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-[13px] text-[#0066CC] font-semibold hover:underline">
            1
          </button>
          <button className="px-3 py-1 text-[13px] text-gray-600 hover:underline">
            2
          </button>
          <button className="px-3 py-1 text-[13px] text-gray-600 hover:underline">
            3
          </button>
          <span className="px-2 text-gray-600">...</span>
          <button className="px-3 py-1 text-[13px] text-gray-600 hover:underline">
            5
          </button>
          <button className="px-3 py-1 text-[13px] text-gray-600 hover:underline">
            →
          </button>
        </div>
        <div className="text-[13px] text-gray-600">1-25 sur 113</div>
      </div>
    </div>
  );
};

export default PatrimoineTable;
