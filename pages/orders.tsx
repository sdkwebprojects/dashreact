import React, { useState } from 'react';
import TabsDemo from '../components/common/Tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ThreeDotsIcon from '../components/icons/ThreeDotsIcon';
import InfoIcon from '../components/icons/InfoIcon';
import { useAuth } from '../contexts/AuthContext';
import { Table, Column } from '../components/common/Table';

interface OrderData {
  ref: string;
  product: string;
  order: string;
  amount: string;
  status: string;
  bonsDeRetour: string;
  date: string;
}

interface SAVData {
  ref: string;
  product: string;
  order: string;
  status: string;
  bonsDeRetour: string;
  date: string;
}

export default function OrdersPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('tab1');
  const { data } = useAuth();

  if (!data) {
    return <div>Chargement...</div>;
  }

  const { OrdersHeadings, OrdersData, SAVHeadings, SAVData } = data;

  function returnStatus(status: string): React.JSX.Element {
    if (status === 'En attente de conf.') {
      return (
        <div className="bg-[#EAF3FE] px-4 py-1 text-[#0046DA] font-semibold rounded-2xl">
          En attente de conf.
        </div>
      );
    }
    if (status === 'Expédiée') {
      return (
        <div className="bg-[#EAFDED] text-[#06AB65] font-semibold px-4 py-1 rounded-2xl">
          Expédiée
        </div>
      );
    }
    return <>{status}</>;
  }

  function returnSAVStatus(status: string): React.JSX.Element {
    if (status === 'En attente de réception') {
      return (
        <div className="bg-[#EAF3FE] px-4 py-1 text-[#0046DA] font-semibold rounded-2xl">
          En attente de réception
        </div>
      );
    }
    if (status === 'Reçu') {
      return (
        <div className="bg-[#EAFDED] text-[#06AB65] font-semibold px-4 py-1 rounded-2xl">
          Reçu
        </div>
      );
    }
    return <>{status}</>;
  }

  // Orders table columns
  const ordersColumns: Column<OrderData>[] = [
    {
      key: 'ref',
      header: OrdersHeadings[0] || 'Ref',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'product',
      header: OrdersHeadings[1] || 'Produit',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'order',
      header: OrdersHeadings[2] || 'N° commande',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'amount',
      header: OrdersHeadings[3] || 'Montant',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (order) =>
        order.amount === 'Premium' ? (
          <div className="flex items-baseline-last gap-1">
            Premium
            <InfoIcon />
          </div>
        ) : (
          order.amount
        ),
    },
    {
      key: 'status',
      header: OrdersHeadings[4] || 'Statut',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (order) => <div className="w-fit">{returnStatus(order.status)}</div>,
    },
    {
      key: 'bonsDeRetour',
      header: OrdersHeadings[5] || 'Bons de retour',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'date',
      header: OrdersHeadings[6] || 'Date',
      className: 'h-[50px] font-normal leading-5 text-[#5F6C96] text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'actions',
      header: '',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: () => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="border border-gray-300 px-1 py-1 rounded hover:bg-gray-50">
              <ThreeDotsIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
              sideOffset={5}
            >
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Voir plus d'informations sur la commande
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Renouveler la commande
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Accéder à la fiche produit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Télécharger la documentation produit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Demander un retour produit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Télécharger la facture
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  // SAV table columns
  const savColumns: Column<SAVData>[] = [
    {
      key: 'ref',
      header: SAVHeadings[0] || 'Ref',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'product',
      header: SAVHeadings[1] || 'Produit',
      className: 'h-[50px] w-[200px] overflow-hidden font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (sav) => <span className="line-clamp-1">{sav.product}</span>,
    },
    {
      key: 'order',
      header: SAVHeadings[2] || 'N° commande',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'status',
      header: SAVHeadings[3] || 'Statut',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: (sav) => <div className="w-fit">{returnSAVStatus(sav.status)}</div>,
    },
    {
      key: 'bonsDeRetour',
      header: SAVHeadings[4] || 'Bons de retour',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'date',
      header: SAVHeadings[5] || 'Date',
      className: 'h-[50px] font-normal leading-5 text-[#5F6C96] text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
    },
    {
      key: 'actions',
      header: '',
      className: 'h-[50px] font-normal text-[13px] border-t border-gray-200',
      headerClassName: 'text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1',
      render: () => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="border border-gray-300 px-1 py-1 rounded hover:bg-gray-50">
              <ThreeDotsIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
              sideOffset={5}
            >
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Voir plus d'informations sur la commande
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Renouveler la commande
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Accéder à la fiche produit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Télécharger la documentation produit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Demander un retour produit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                Télécharger la facture
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <TabsDemo activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'tab1' ? (
        <>
          <p className="text-stark leading-5 text-[13px] font-normal">
            Liste des services et des produits achetés uniquement sur ce site.
          </p>
          <Table
            columns={ordersColumns}
            data={OrdersData as OrderData[]}
            minHeight="auto"
          />
        </>
      ) : (
        <>
          <p className="text-stark leading-5 text-[13px] font-normal">
            Seuls les produits retournés dans le cadre d'un SAV sont concernés. Les retours de
            stock ou toute autre demande ne seront pas pris en compte.
          </p>
          <div className="rounded-lg pt-2 overflow-hidden">
            <Table columns={savColumns} data={SAVData as SAVData[]} minHeight="auto" />
          </div>
        </>
      )}
    </div>
  );
}
