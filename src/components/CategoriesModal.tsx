import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getPublicCategories, type Category } from '../lib/categoriesApi';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoriesModal: React.FC<Props> = ({ open, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const data = await getPublicCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    })();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
      <div
        className="relative bg-white rounded-[18px] w-full max-w-[412px] h-[695px] flex flex-col items-start gap-4 pt-[25px] px-[15px] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[#F86B1C]">
          <X size={18} />
        </button>

        <h3
          className="w-full text-center text-lg font-semibold mb-2"
          style={{ fontFamily: 'Poppins', color: '#F86B1C' }}
        >
          Discover Food You Love
        </h3>

        <div className="grid grid-cols-3 gap-x-[16px] gap-y-[18px] w-full place-items-center">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center text-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-[97.6px] h-[97.6px] object-cover rounded-full"
              />
              <span className="mt-2 text-sm" style={{ fontFamily: 'Poppins' }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
