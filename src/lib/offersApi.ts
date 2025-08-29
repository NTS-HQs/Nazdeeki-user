import axios from 'axios';

const offersApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
});

export interface Offer {
  offer_id: number;
  seller_id: string;
  offer_title: string;
  offer_description?: string;
  offer_image?: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  valid_from?: string;
  valid_until?: string;
  is_active?: boolean;
  usage_limit?: number;
  used_count: number;
  created_at: string;
}

export const getPublicActiveOffers = async (): Promise<{ success: boolean; offers: Offer[]; count: number }> => {
  const { data } = await offersApi.get('/offers/public/active');
  return data;
};
