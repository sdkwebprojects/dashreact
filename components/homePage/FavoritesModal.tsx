import React from 'react';
import CloseIcon from '../icons/CloseIcon';
import type { FavoriteProduct } from '../../dummyData/installateur-premium-with-site';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteProduct[];
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5E5E5EB2]">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <h2 className="text-[20px] font-semibold text-stark">
            Visualisation des favoris ({favorites.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Fermer"
          >
            <CloseIcon width={24} height={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          <div className="grid grid-cols-2 gap-6">
            {favorites.map((product) => (
              <div
                key={product.ref}
                className="flex gap-4 border border-gray-300 rounded-lg p-4"
              >
                <div className="h-[140px] w-[140px] bg-[#D9D9D9] rounded-md flex-shrink-0" />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-semibold text-[15px] text-stark mb-2">
                      {product.ref}
                    </div>
                    <div className="text-[13px] text-stark leading-5">
                      {product.name}
                    </div>
                  </div>
                  <button className="self-end text-[#0066CC] text-[13px] font-medium hover:underline">
                    Voir l&apos;article
                  </button>
                </div>
                <button
                  className="self-start p-1"
                  aria-label="Retirer des favoris"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
