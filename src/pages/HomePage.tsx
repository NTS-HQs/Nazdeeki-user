import React, { useState } from 'react';
import { ChevronRight, Flame } from 'lucide-react';
import { SlidersHorizontal, Triangle, Square } from 'lucide-react';
import CategoriesModal from '../components/CategoriesModal';
import CategoriesCarousel from '../components/CategoriesCarousel';
import FilterPanel from '../components/FilterPanel';

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <main className="flex-grow px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-base font-semibold text-gray-900"
            style={{ fontFamily: 'Poppins' }}
          >
            Craving for something delicious?
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="text-[#F86B1C]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <CategoriesCarousel />

        {/* Top Local Favorites Heading */}
        <div className="flex justify-center mt-6" style={{ paddingLeft: '18px', paddingRight: '18px' }}>
          <div className="flex items-center gap-2">
            <Flame size={20} color="#F86B1C" />
            <h3
              className="font-bold"
              style={{ fontFamily: 'Poppins', fontSize: '20px', lineHeight: '20px', color: '#414141', letterSpacing: '0.25px' }}
            >
              Top Local Favorites
            </h3>
          </div>
        </div>

        {/* Filter Chips Row */}
        <div
          className="flex items-center gap-3 mt-2"
          style={{ paddingLeft: '18px', paddingRight: '18px' }}
        >
          {/* Filters */}
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full text-[10px] font-medium text-[#505050]"
          >
            <SlidersHorizontal size={14} strokeWidth={2} /> Filters
          </button>
          {/* Nearest */}
          <button className="px-2 py-1 border border-gray-300 rounded-full text-[10px] font-medium text-[#505050]">
            Nearest Restro
          </button>
          {/* Non veg */}
          <button className="flex items-center gap-1 px-2 py-1 border border-[#FF0000] rounded-full text-[10px] font-medium text-[#FF0000]">
            <Triangle size={12} fill="#FF0000" strokeWidth={0} /> Non Veg
          </button>
          {/* Veg */}
          <button className="flex items-center gap-1 px-2 py-1 border border-[#008000] rounded-full text-[10px] font-medium text-[#008000]">
            <Square size={12} fill="#008000" strokeWidth={0} /> Veg
          </button>
        </div>
      </main>
      <CategoriesModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
    </>
  );
};

export default HomePage;

