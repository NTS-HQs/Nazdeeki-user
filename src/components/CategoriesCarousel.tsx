import React from 'react';

interface Category {
  name: string;
  image: string;
}

// Static list for now – can be replaced by API call later
const categories: Category[] = [
  { name: 'Monsoon\nSpecial', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=120&h=120&auto=format&fit=crop&q=60' },
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1604908812445-06b1792d2d35?w=120&h=120&auto=format&fit=crop&q=60' },
  { name: 'North\nIndi..', image: 'https://images.unsplash.com/photo-1576402187876-cb136584e6f1?w=120&h=120&auto=format&fit=crop&q=60' },
  { name: 'Pizzas', image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=120&h=120&auto=format&fit=crop&q=60' },
  { name: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=120&h=120&auto=format&fit=crop&q=60' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb36?w=120&h=120&auto=format&fit=crop&q=60' },
];

const CategoriesCarousel: React.FC = () => {
  return (
    <section className="mt-6 px-4">
      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Poppins' }}>
        Craving for something delicious?
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <div key={cat.name} className="flex-shrink-0 w-20 text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 mx-auto">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-2 block text-xs text-gray-800" style={{ fontFamily: 'Poppins' }}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesCarousel;
