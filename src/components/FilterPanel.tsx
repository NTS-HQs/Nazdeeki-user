import React from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FilterPanel: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-center items-end">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* sheet */}
      <div
        className="relative w-full max-w-screen-sm bg-white rounded-t-[18px] shadow-lg p-6 flex flex-col gap-4"
        style={{ height: '80vh' }}
      >
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-lg font-semibold" style={{ fontFamily: 'Poppins', color: '#F86B1C' }}>
          Filters
        </h2>
        {/* Placeholder filter options */}
        <div className="flex-1 overflow-y-auto space-y-4">
          <p className="text-sm text-gray-500">Filter options will go here...</p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
