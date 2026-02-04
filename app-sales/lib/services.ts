import { apiClient } from './api';

// Pelanggan Services
export const getPelanggan = () => apiClient('/api/pelanggan');
export const getPelangganById = (id_pelanggan: string) => apiClient(`/api/pelanggan/${id_pelanggan}`);
export const createPelanggan = (data: any) => 
  apiClient('/api/pelanggan', { method: 'POST', body: JSON.stringify(data) });
export const updatePelanggan = (id_pelanggan: string, data: any) => 
  apiClient(`/api/pelanggan/${id_pelanggan}`, { method: 'PUT', body: JSON.stringify(data) });
export const deletePelanggan = (id_pelanggan: string) => 
  apiClient(`/api/pelanggan/${id_pelanggan}`, { method: 'DELETE' });

// Barang Services
export const getBarang = () => apiClient('/api/barang');
export const getBarangById = (kode: string) => apiClient(`/api/barang/${kode}`);
export const createBarang = (data: any) => 
  apiClient('/api/barang', { method: 'POST', body: JSON.stringify(data) });
export const updateBarang = (kode: string, data: any) => 
  apiClient(`/api/barang/${kode}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBarang = (kode: string) => 
  apiClient(`/api/barang/${kode}`, { method: 'DELETE' });

// Penjualan Services
export const getPenjualan = () => apiClient('/api/penjualan');
export const getPenjualanById = (id_nota: string) => apiClient(`/api/penjualan/${id_nota}`);
export const createPenjualan = (data: any) => 
  apiClient('/api/penjualan', { method: 'POST', body: JSON.stringify(data) });
export const updatePenjualan = (id_nota: string, data: any) => 
  apiClient(`/api/penjualan/${id_nota}`, { method: 'PUT', body: JSON.stringify(data) });
export const deletePenjualan = (id_nota: string) => 
  apiClient(`/api/penjualan/${id_nota}`, { method: 'DELETE' });

// ItemPenjualan Services
export const getItemPenjualan = () => apiClient('/api/item_penjualan');
export const getItemPenjualanById = (nota: string, kode_barang: string) => 
  apiClient(`/api/item_penjualan/${nota}/${kode_barang}`);
export const createItemPenjualan = (data: any) => 
  apiClient('/api/item_penjualan', { method: 'POST', body: JSON.stringify(data) });
export const updateItemPenjualan = (nota: string, kode_barang: string, data: any) => 
  apiClient(`/api/item_penjualan/${nota}/${kode_barang}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteItemPenjualan = (nota: string, kode_barang: string) => 
  apiClient(`/api/item_penjualan/${nota}/${kode_barang}`, { method: 'DELETE' });
