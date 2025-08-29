import React, { useEffect, useState } from 'react';
import { getPublicCategories, type Category } from '../lib/categoriesApi';

const CategoriesCarousel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPublicCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    })();
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="flex w-[379px] gap-[7px] overflow-x-auto pb-2 scrollbar-hide mx-auto">
      {categories.map((cat) => (
        <div key={cat.name} className="flex-shrink-0 w-[84px] flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
          </div>
          <span className="mt-1 text-xs font-medium text-[#505050] truncate" style={{ fontFamily: 'Poppins' }}>
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesCarousel;
