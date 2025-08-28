import React from 'react';
import { X } from 'lucide-react';

interface Category {
  name: string;
  image: string;
}

const categories: Category[] = [
  { name: 'Momos', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Nachos', image: 'https://images.unsplash.com/photo-1601050690819-9638e5fab4d5?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Fries', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6cf7?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Pavbhaji', image: 'https://images.unsplash.com/photo-1604908177225-2d884e53b8c4?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Chicken Biryani', image: 'https://images.unsplash.com/photo-1604908178037-aa377d8c9237?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Rajma', image: 'https://images.unsplash.com/photo-1542444459-db38c7e496e8?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Paneer Masala', image: 'https://images.unsplash.com/photo-1621586713163-d5ada6046f54?w=200&h=200&auto=format&fit=crop&q=60' },
  // duplicates to fill grid
  { name: 'Momos', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Nachos', image: 'https://images.unsplash.com/photo-1601050690819-9638e5fab4d5?w=200&h=200&auto=format&fit=crop&q=60' },
  { name: 'Fries', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6cf7?w=200&h=200&auto=format&fit=crop&q=60' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoriesModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
      <div
        className="relative bg-white rounded-[18px] w-full max-w-[412px] h-[695px] flex flex-col items-start gap-4 p-6 overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#F86B1C]"
        >
          <X size={18} />
        </button>

        <h3 className="w-full text-center text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins', color: '#F86B1C' }}>
          Discover Food You Love
        </h3>

        <div className="grid grid-cols-3 gap-x-6 gap-y-8 w-full place-items-center">
          {categories.map((cat, idx) => (
            <div key={`${cat.name}-${idx}`} className="flex flex-col items-center text-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-cover"
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
