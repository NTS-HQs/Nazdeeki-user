import axios from 'axios';

export interface Category {
  name: string;
  image: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
});

export const getPublicCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories/public');
  return data.categories;
};
