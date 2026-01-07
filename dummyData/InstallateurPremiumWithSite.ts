export const userInfo = {
  contractType: 'pro' as 'particulier' | 'pro',
};

export const FeedData = [
  {
    content:
      "ALL'ZEN : un service de location d'écran pour votre hall pour diffuser de l'information",
    date: '05/06/2025',
    linkToArticle: '/path/to/article',
    id: 0,
  },
  {
    content:
      'URMET FID : notre programme de fidélité dédié aux installateurs de kits villas',
    date: '26/05/2025',
    linkToArticle: '/path/to/article',
    id: 1,
  },
  {
    content:
      'Urmet Assist : pour trouver rapidement un installateur partenaire',
    date: '22/05/2025',
    linkToArticle: '/path/to/article',
    id: 2,
  },
];

// Quote Data
export const QuoteData = [
  'Simuler votre projet en autonomie',
  'Être accompagné par un commercial',
];

// Premium installer specific data
export const PremiumContractInfo = {
  contractNumber: '89764534',
  expiryDate: '30/08/2025',
};

export const ConsumptionSiteInfo = {
  title: 'Sites favoris',
  sites: [
    'Les coquelicots - 3 impasse des coquelicots 75019 Paris',
    'Les roses - 12 avenue des roses 75018 Paris',
    'Les tulipes - 8 rue des tulipes 75020 Paris',
  ],
  defaultSite: 'Les coquelicots - 3 impasse des coquelicots 75019 Paris',
};

export const ModemAlerts = [
  {
    id: '10326520',
    name: 'Les coquelicots',
    issue: 'Anomalie sur le modem n°25367',
  },
  {
    id: '10326520',
    name: 'Les coquelicots',
    issue: 'Anomalie sur le modem n°25367',
  },
  {
    id: '10326520',
    name: 'Les coquelicots',
    issue: 'Anomalie sur le modem n°25367',
  },
];

export const PremiumOffers = [
  {
    title: 'Schéma personnalisé',
    value: '5',
    remaining: '5',
  },
  {
    title: 'Formations par an',
    count: '3',
  },
  {
    title: 'Réparation SAV',
    value: '600 €',
    remaining: '600 €',
  },
];

export const PremiumServices = [
  'Commander un nouveau badge programmé',
  'Changer une information sur une platine',
  'Faire un retour SAV',
  'Trouver un commercial',
  'Explorer tous nos services',
];

export const FavoriteProducts = [
  {
    ref: 'D83/PHILIPP',
    name: 'Plaque à défilement vidéo caméra discrète',
  },
  {
    ref: 'BEQLE01',
    name: 'Béquille VIKY avec profil européen',
  },
];

// Premium Services with icons for the Premium page
export const PremiumServicesWithIcons = [
  { id: 1, title: "Demande d'enlèvement de colis", link: '/services/enlevement' },
  { id: 2, title: "Programmation de badge ou d'une télécommande", link: '/services/badge' },
  { id: 3, title: 'Demande de gravure de badge', link: '/services/gravure' },
  { id: 4, title: 'Demander une migration de site', link: '/services/migration' },
  { id: 5, title: 'Faire un retour SAV', link: '/services/sav' },
];

// Premium Request History for the table
export const PremiumRequestHistory = [
  { service: "Demande d'enlèvement d'un colis", date: 'Le 22/07/2025', requestNumber: '872637' },
  { service: 'Programmation de matériel', date: 'Le 22/07/2025', requestNumber: '415263' },
];

export const PremiumRequestHistoryHeadings = ['Service', 'Date de la demande', 'N° de la demande'];

// Orders Data
export const OrdersHeadings = [
  'Ref. Produit',
  'Produit ou service',
  'N° de commande',
  'Montant',
  'Statut',
  'Bons de retour',
  "Date d'achat",
];

export const OrdersData = [
  {
    ref: '5688/323',
    product: "Demande d'enlèvement d'un colis",
    order: '56234512',
    amount: 'Premium',
    status: 'En attente de conf.',
    bonsDeRetour: 'Aucune',
    date: 'Le 22/07/2025',
  },
  {
    ref: '84589654',
    product: 'Gravure sur badge',
    order: '25456249',
    amount: 'Premium',
    status: 'Expédiée',
    bonsDeRetour: 'Aucun',
    date: 'Le 18/06/2025',
  },
  {
    ref: '1099/500',
    product: 'Camera IP compacte 5M 2,8',
    order: '63524198',
    amount: '62,00 € HT',
    status: 'Expédiée',
    bonsDeRetour: 'Aucun',
    date: 'Le 07/04/2025',
  },
  {
    ref: '9505/647',
    product: 'Plaque à défilement DAWL/I3',
    order: '14758495',
    amount: '1025,00 € HT',
    status: 'Expédiée',
    bonsDeRetour: 'n°14758495',
    date: 'Le 18/09/2023',
    extra: 'Télécharger le contrat',
  },
];

// SAV Data
export const SAVHeadings = [
  'Ref. Produit',
  'Produit ou service',
  'N° du bon',
  'Statut',
  'Ref chantier',
  'Date de création',
];

export const SAVData = [
  {
    ref: '3456/789',
    product: 'Camera IP compacte 5M 2.8px modele numero 394833940',
    order: '34567890',
    status: 'En attente de réception',
    bonsDeRetour: 'n°34567890',
    date: 'Le 03/10/2025',
  },
  {
    ref: '1234/567',
    product: 'Plaque à défilement DAWL/I3',
    order: '12345678',
    status: 'Reçu',
    bonsDeRetour: 'n°12345678',
    date: 'Le 20/09/2025',
  },
];

// Tabs Data
export const OrdersTabData = ['Commandes en ligne', 'Retour SAV'];

export const AccountTabData = [
  'Informations générales',
  'Connexion et sécurité',
  'Newsletter',
];

// Account Data
export type AccountField = {
  label: string;
  value: string | string[];
};

export type AccountSection = {
  title: string;
  fields: AccountField[];
};

export const AccountData: AccountSection[] = [
  {
    title: 'Informations personnelles',
    fields: [
      { label: 'Civilité', value: 'Mme' },
      { label: 'Nom et prénom', value: 'INSTALLE Karine' },
      { label: 'Société', value: 'Entreprise INSTALLE' },
    ],
  },
  {
    title: 'Facturations et expéditions',
    fields: [
      {
        label: 'Adresse de facturation',
        value: ['20 rue ramier', '75001 Paris', 'France'],
      },
      {
        label: '',
        value: "Adresse de livraison similaire à l'adresse de facturation",
      },
    ],
  },
  {
    title: 'Moyen de paiement',
    fields: [
      { label: 'Mode de paiement', value: 'Prélèvement mensuel' },
      { label: 'Banque', value: 'LCL' },
      { label: 'IBAN', value: 'FR**** **** **** **** **75G649 **' },
    ],
  },
];

// Patrimoine Data
export const PatrimoineStats = {
  totalBadges: 58,
  passCount: 6,
  unusedBadges: 4,
  softwareUsers: 11,
};

export const PatrimoineHeadings = [
  'N° du site',
  'Nom et adresse du site',
  'Date de mise en service',
  'Connecté',
  'Techno. du site',
  'Contrat maintenance',
];

export interface PatrimoineSite {
  id: string;
  name: string;
  address: string;
  serviceDate: string;
  connected: boolean;
  technology: string;
  hasMaintenanceContract: boolean;
  isFavorite?: boolean;
}

export const PatrimoineSites: PatrimoineSite[] = [
  {
    id: '10326520',
    name: 'Les coquelicots',
    address: '3 impasse des coquelicots 75...',
    serviceDate: 'Le 22/07/2025',
    connected: true,
    technology: 'HBS',
    hasMaintenanceContract: true,
    isFavorite: true,
  },
  {
    id: '21092763',
    name: 'Primevère',
    address: '56 av. de la Dordogne 50200...',
    serviceDate: 'Le 18/05/2024',
    connected: true,
    technology: 'T2V',
    hasMaintenanceContract: false,
  },
  {
    id: '89764534',
    name: 'Jonquilles',
    address: '94 rue de la jacquette 92120...',
    serviceDate: 'Le 02/12/2023',
    connected: false,
    technology: 'L/E',
    hasMaintenanceContract: false,
  },
  {
    id: '34567821',
    name: 'Primevère',
    address: '56 av. de la Dordogne 50200...',
    serviceDate: 'Le 18/05/2024',
    connected: true,
    technology: '2V 4G',
    hasMaintenanceContract: false,
    isFavorite: false,
  },
  {
    id: '45678912',
    name: 'Jonquilles',
    address: '94 rue de la jacquette 92120...',
    serviceDate: 'Le 02/12/2023',
    connected: false,
    technology: 'L/E',
    hasMaintenanceContract: true,
  },
  {
    id: '56789123',
    name: 'Primevère',
    address: '56 av. de la Dordogne 50200...',
    serviceDate: 'Le 18/05/2024',
    connected: false,
    technology: '2V 4G',
    hasMaintenanceContract: true,
  },
  {
    id: '67891234',
    name: 'Jonquilles',
    address: '94 rue de la jacquette 92120...',
    serviceDate: 'Le 02/12/2023',
    connected: true,
    technology: 'T2V',
    hasMaintenanceContract: true,
  },
  {
    id: '78912345',
    name: 'Primevère',
    address: '56 av. de la Dordogne 50200...',
    serviceDate: 'Le 18/05/2024',
    connected: true,
    technology: 'HBS',
    hasMaintenanceContract: true,
  },
  {
    id: '89123456',
    name: 'Jonquilles',
    address: '94 rue de la jacquette 92120...',
    serviceDate: 'Le 02/12/2023',
    connected: false,
    technology: 'T2V',
    hasMaintenanceContract: false,
  },
  {
    id: '91234567',
    name: 'Jonquilles',
    address: '94 rue de la jacquette 92120...',
    serviceDate: 'Le 02/12/2023',
    connected: true,
    technology: '2V 4G',
    hasMaintenanceContract: true,
  },
];
