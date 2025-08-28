import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import CategoriesModal from '../components/CategoriesModal';

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
      </main>
      <CategoriesModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HomePage;

