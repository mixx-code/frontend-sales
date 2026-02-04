import {
  CreatePelangganPayload,
  PaginationParams,
  Pelanggan,
  PelangganListResponse,
  UpdatePelangganPayload
} from '@/types';
import { apiClient } from './api';

export const getPelanggan = (params?: PaginationParams): Promise<PelangganListResponse> => {
  const queryString = params ? `?page=${params.page || 1}&limit=${params.limit || 10}` : '';
  return apiClient(`/api/pelanggan${queryString}`);
};

export const getPelangganById = async (id_pelanggan: string): Promise<Pelanggan> => {
  const response = await apiClient(`/api/pelanggan/${id_pelanggan}`);
  return response.data;
};

export const createPelanggan = async (data: CreatePelangganPayload): Promise<Pelanggan> => {
  const response = await apiClient('/api/pelanggan', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  });
  return response.data;
};

export const updatePelanggan = async (id_pelanggan: string, data: UpdatePelangganPayload): Promise<Pelanggan> => {
  const response = await apiClient(`/api/pelanggan/${id_pelanggan}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });
  return response.data;
};

export const deletePelanggan = (id_pelanggan: string): Promise<{ message: string }> => 
  apiClient(`/api/pelanggan/${id_pelanggan}`, { method: 'DELETE' });
