// Export all types
export * from './barang';
export * from './transaksi';

// Base types
export interface BaseEntity {
  id_pelanggan: string;
}

// Pelanggan types
export interface Pelanggan extends BaseEntity {
  nama: string;
  domisili: string;
  jenis_kelamin: 'Pria' | 'Wanita';
}

export interface CreatePelangganPayload {
  id_pelanggan: string;
  nama: string;
  domisili: string;
  jenis_kelamin: 'Pria' | 'Wanita';
}

export interface UpdatePelangganPayload {
  nama: string;
  domisili: string;
  jenis_kelamin: 'Pria' | 'Wanita';
}

export interface PelangganListResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Pelanggan[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

// Common types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
