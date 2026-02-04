import {
  CreateItemPenjualanPayload,
  CreatePenjualanPayload,
  ItemPenjualan,
  ItemPenjualanListResponse,
  PaginationParams,
  Penjualan,
  PenjualanListResponse,
  UpdateItemPenjualanPayload,
  UpdatePenjualanPayload
} from '@/types';
import { apiClient } from './api';


export const getPenjualan = (params?: PaginationParams): Promise<PenjualanListResponse> => {
  const queryString = params ? `?page=${params.page || 1}&limit=${params.limit || 10}` : '';
  return apiClient(`/api/penjualan${queryString}`);
};

export const getPenjualanById = async (id_nota: string): Promise<Penjualan> => {
  const response = await apiClient(`/api/penjualan/${id_nota}`);
  return response.data;
};

export const createPenjualan = async (data: CreatePenjualanPayload): Promise<Penjualan> => {
  const response = await apiClient('/api/penjualan', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  });
  return response.data;
};

export const updatePenjualan = async (id_nota: string, data: UpdatePenjualanPayload): Promise<Penjualan> => {
  const response = await apiClient(`/api/penjualan/${id_nota}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });
  return response.data;
};

export const deletePenjualan = (id_nota: string): Promise<{ message: string }> => 
  apiClient(`/api/penjualan/${id_nota}`, { method: 'DELETE' });


export const getItemPenjualan = (nota?: string): Promise<ItemPenjualanListResponse> => {
  return apiClient('/api/item_penjualan');
};


export const getItemsByNota = async (nota: string): Promise<ItemPenjualanListResponse> => {
  const allItems = await getItemPenjualan();
  const filteredItems = allItems.data.data.filter(item => item.nota === nota);
  
  return {
    ...allItems,
    data: {
      ...allItems.data,
      data: filteredItems,
      total: filteredItems.length
    }
  };
};

export const getItemPenjualanById = async (nota: string, kode_barang: string): Promise<ItemPenjualan> => {
  const response = await apiClient(`/api/item_penjualan/${nota}/${kode_barang}`);
  return response.data;
};

export const createItemPenjualan = async (data: CreateItemPenjualanPayload): Promise<ItemPenjualan> => {
  const response = await apiClient('/api/item_penjualan', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  });
  return response.data;
};

export const updateItemPenjualan = async (nota: string, kode_barang: string, data: UpdateItemPenjualanPayload): Promise<ItemPenjualan> => {
  const response = await apiClient(`/api/item_penjualan/${nota}/${kode_barang}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });
  return response.data;
};

export const deleteItemPenjualan = (nota: string, kode_barang: string): Promise<{ message: string }> => 
  apiClient(`/api/item_penjualan/${nota}/${kode_barang}`, { method: 'DELETE' });
