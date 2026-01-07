import { useAuth } from '../contexts/AuthContext';
import PatrimoineTable from '../components/patrimoine/PatrimoineTable';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';
import PlusIcon from '../components/icons/PlusIcon';

export default function PatrimoinePage(): React.JSX.Element {
  const { userInfo, data } = useAuth();

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

  return (
    <div className="flex flex-col gap-5">
      {/* Main Patrimoine Section */}
      <div className="flex flex-col border border-gray-300 rounded-lg">
        {/* Header with Title and Button */}
        <div className="flex items-center justify-between p-4">
          <h1 className="font-semibold text-stark text-xl">Patrimoine</h1>
          <button className="flex items-center gap-2 px-3 py-1 text-[13px] font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-gray-100 hover:text-blue-500 hover:cursor-pointer">
            Gérer mon patrimoine
            <ExternalLinkIcon width={16} height={16} />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 px-4 pb-4">
          {/* Badges totaux */}
          <div className="flex flex-col flex-1 border border-gray-300 rounded-lg p-4">
            <h2 className="text-[13px] text-gray-600 mb-2">Badges totaux</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-stark">
                {PatrimoineStats.totalBadges}
              </span>
              <span className="text-[13px] text-gray-600">
                dont {PatrimoineStats.passCount} pass
              </span>
            </div>
          </div>

          {/* Badges non utilisés */}
          <div className="flex flex-col flex-1 border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[13px] text-gray-600">Badges non utilisés</h2>
              <button className="text-[#0066CC] hover:underline">
                <ExternalLinkIcon width={20} height={20} />
              </button>
            </div>
            <span className="text-2xl font-semibold text-stark">
              {PatrimoineStats.unusedBadges}
            </span>
          </div>

          {/* Utilisateurs logiciel */}
          <div className="flex flex-col flex-1 border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2 -mt-1">
              <h2 className="text-[13px] text-gray-600">Utilisateurs logiciel</h2>
              {/* <button className="rounded-lg text-xl font-semibold hover:bg-blue-700">
                +
              </button> */}
              <div className="border border-gray-300 rounded-lg p-0.5">
              <PlusIcon width={18} height={18} />
              </div>
            </div>
            <span className="text-2xl font-semibold text-stark">
              {PatrimoineStats.softwareUsers}
            </span>
          </div>
        </div>

        {/* Sites Table */}
        {PatrimoineSites && PatrimoineHeadings && (
          <div className="px-4 pb-4">
            <PatrimoineTable
              headings={PatrimoineHeadings}
              data={PatrimoineSites}
            />
          </div>
        )}
      </div>
    </div>
  );
}
