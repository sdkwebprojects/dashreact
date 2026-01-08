import React, { useState, useEffect } from 'react';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import FavoritesModal from './FavoritesModal';
import type { FavoriteProduct } from '../../dummyData/installateur-premium-with-site';

interface FavoriteItemsProps {
  title: string;
  favorites: FavoriteProduct[];
}

const FavoriteItems: React.FC<FavoriteItemsProps> = ({
  title,
  favorites,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';

    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const displayedFavorites = favorites.slice(0, 2);

  return (
    <>
      <div
        className={'flex flex-col border border-gray-300 p-4 rounded-lg'}
      >
        <div className="flex justify-between pb-4">
          <span className="font-semibold leading-5 text-stark text-wrap">
            {title}
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:opacity-70 transition-opacity cursor-pointer hover:animate-pulse"
            aria-label="Consulter les favoris"
          >
            <ChevronRightIcon width={21} height={21} />
          </button>
        </div>
        <div className="flex">
          {displayedFavorites.map((product, index) => (
            <div
              key={product.ref}
              className={`flex h-full gap-3 ${index > 0 ? 'pl-3 border-l border-[#DFE6F2]' : ''}`}
            >
              <div className="h-[142px] w-[92px] bg-[#D9D9D9] rounded-md" />
              <div className="flex flex-col gap-1 font-normal text-[13px] leading-5 text-stark w-[93px]">
                <span>{product.ref}</span>
                <span>{product.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FavoritesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        favorites={favorites}
      />
    </>
  );
};

export default FavoriteItems;
