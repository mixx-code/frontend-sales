import {
  ApiResponse,
  Barang,
  BarangListResponse,
  CreateBarangPayload,
  PaginationParams,
  UpdateBarangPayload
} from '@/types';
import { apiClient } from './api';


export const getBarang = (params?: PaginationParams): Promise<BarangListResponse> => {
  const queryString = params ? `?page=${params.page || 1}&limit=${params.limit || 10}` : '';
  return apiClient(`/api/barang${queryString}`);
};

export const getBarangById = async (kode: string): Promise<Barang> => {
  const response = await apiClient(`/api/barang/${kode}`);
  return response.data;
};


export const searchBarang = async (searchTerm: string): Promise<Barang[]> => {
  try {
    const response = await getBarang();
    const filteredData = response.data.data.filter(barang => 
      barang.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barang.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barang.kategori.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
  } catch (error) {
    console.error('Error searching barang:', error);
    return [];
  }
};

export const createBarang = (data: CreateBarangPayload): Promise<ApiResponse<Barang>> => 
  apiClient('/api/barang', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  });

export const updateBarang = (kode: string, data: UpdateBarangPayload): Promise<ApiResponse<Barang>> => 
  apiClient(`/api/barang/${kode}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });

export const deleteBarang = (kode: string): Promise<ApiResponse<void>> => 
  apiClient(`/api/barang/${kode}`, { method: 'DELETE' });
