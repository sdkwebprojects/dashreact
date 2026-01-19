export interface SubscriptionContract {
  contractNumber: string;
  expiryDate: string;
}

export interface SubscriptionStats {
  label: string;
  value: string;
  subtitle: string;
}

export interface SubscriptionItem {
  contractNumber: string;
  site: string;
  operator: string;
  address: string;
  contract: string;
  billing: string;
  modemCount: string;
  modemAmount: string;
  additionalService: string;
  modemHasErrors?: boolean;
  contractExpireSoon?: boolean;
}

export const contractInfo: SubscriptionContract = {
  contractNumber: '89764534',
  expiryDate: '04/09/2025',
};

export const subscriptionStats: SubscriptionStats[] = [
  { label: 'Nombre de modem', value: '58', subtitle: 'Depuis le 01/01/2025' },
  { label: 'Montant modem', value: '250,40 €', subtitle: 'Depuis le 01/01/2025' },
  { label: 'Service additionnel', value: '564 €', subtitle: 'Depuis le 01/01/2025' },
  { label: 'Total annuel', value: '4 520,80 €', subtitle: 'Depuis le 01/01/2025' },
];

export interface SubscriptionMenuAction {
  id: string;
  label: string;
}

export const subscriptionMenuActions: SubscriptionMenuAction[] = [
  { id: 'voir-plus', label: "Voir plus d'informations" },
  { id: 'telecharger-contrat', label: 'Télécharger le contrat' },
  { id: 'gerer-abonnement', label: 'Gérer votre abonnement' },
];

// Generate 113 subscription items (as indicated by the "1-25 sur 113" text)
/* eslint-disable sonarjs/pseudo-random, unicorn/numeric-separators-style */
const generateSubscriptions = (): SubscriptionItem[] => {
  const sites = [
    'Les coquelicots', 'Jonquilles', 'Primevère', 'Les Roses', 'Les Tulipes',
    'Les Marguerites', 'Les Lilas', 'Les Violettes', 'Les Orchidées', 'Les Camélias',
    'Les Iris', 'Les Pensées', 'Les Pivoines', 'Les Hortensias', 'Les Dahlias',
    'Les Chrysanthèmes', 'Les Bégonias', 'Les Azalées', 'Les Magnolias', 'Les Glycines',
    'Les Géraniums', 'Les Pétunias', 'Les Lavandes', 'Les Jasmins', 'Les Capucines',
    'Les Œillets', 'Les Anémones', 'Les Mimosas', 'Les Bleuets', 'Les Myosotis'
  ];

  const operators = ['LISA', 'Tel2Voice'];
  const billing = ['Pré-payé', 'Mensuelle'];
  const streets = [
    'rue', 'avenue', 'boulevard', 'impasse', 'place', 'allée', 'chemin', 'cours'
  ];
  const cities = [
    '75018', '92120', '50200', '93100', '75019', '75020', '94200', '91300',
    '78000', '69001', '13001', '33000', '31000', '59000', '67000'
  ];

  const subscriptions: SubscriptionItem[] = [];

  for (let i = 0; i < 113; i++) {
    const site = sites[i % sites.length] + (i >= sites.length ? ` ${Math.floor(i / sites.length) + 1}` : '');
    const contractNumber = (500000000 + Math.floor(Math.random() * 400000000)).toString();
    const operator = operators[i % operators.length] as string;
    const billingType = billing[i % billing.length] as string;
    const streetType = streets[i % streets.length] as string;
    const cityCode = cities[i % cities.length] as string;
    const modemCount = Math.floor(Math.random() * 10) + 1;
    const modemAmount = (modemCount * 0.45).toFixed(2);
    const hasAdditionalService = Math.random() > 0.3;
    const additionalServiceAmount = hasAdditionalService ? `${Math.floor(Math.random() * 15) + 1}€ /mois` : 'Aucun';

    // Approximately 10% have errors
    const modemHasErrors = Math.random() > 0.9;

    // Approximately 15% expire soon
    const contractExpireSoon = Math.random() > 0.85;

    const startMonth = Math.floor(Math.random() * 12) + 1;
    const startDay = Math.floor(Math.random() * 28) + 1;
    const startYear = 2024 + Math.floor(Math.random() * 2);
    const endYear = startYear + 1;

    const contractDuration = billingType === 'Pré-payé'
      ? `Du ${startDay.toString().padStart(2, '0')}/${startMonth.toString().padStart(2, '0')}/${startYear}\nau ${startDay.toString().padStart(2, '0')}/${startMonth.toString().padStart(2, '0')}/${endYear}`
      : `Du ${startDay.toString().padStart(2, '0')}/${startMonth.toString().padStart(2, '0')}/${startYear}`;

    const siteName = site.toLowerCase().replace('les ', '');
    subscriptions.push({
      contractNumber,
      site,
      operator,
      address: `${i + 1} ${streetType} ${siteName} ${cityCode}...`,
      contract: contractDuration,
      billing: billingType,
      modemCount: `${modemCount} modem${modemCount > 1 ? 's' : ''}`,
      modemAmount: `${modemAmount}€ /mois`,
      additionalService: additionalServiceAmount,
      modemHasErrors,
      contractExpireSoon,
    });
  }

  return subscriptions;
};
/* eslint-enable sonarjs/pseudo-random, unicorn/numeric-separators-style */

export const subscriptionData: SubscriptionItem[] = generateSubscriptions();

// Pagination helper to simulate backend pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
  searchQuery?: string;
  showErrorsOnly?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const getPaginatedSubscriptions = ({
  page,
  pageSize,
  searchQuery = '',
  showErrorsOnly = false,
}: PaginationParams): PaginatedResponse<SubscriptionItem> => {
  // Filter data
  let filteredData = subscriptionData;

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (sub) =>
        sub.site.toLowerCase().includes(query) ||
        sub.contractNumber.toLowerCase().includes(query) ||
        sub.address.toLowerCase().includes(query)
    );
  }

  // Apply error filter
  if (showErrorsOnly) {
    filteredData = filteredData.filter((sub) => sub.modemHasErrors);
  }

  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filteredData.slice(startIndex, endIndex);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
  };
};
