// Penjualan Types
export interface Penjualan {
  id_nota: string;
  tgl: string;
  kode_pelanggan: string;
  subtotal: number;
  pelanggan?: {
    id_pelanggan: string;
    nama: string;
    domisili: string;
    jenis_kelamin: string;
  };
  items?: ItemPenjualan[];
}

export interface CreatePenjualanPayload {
  id_nota: string;
  tgl: string;
  kode_pelanggan: string;
  subtotal: number;
}

export interface UpdatePenjualanPayload {
  tgl: string;
  kode_pelanggan: string;
  subtotal: number;
}

export interface PenjualanListResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Penjualan[];
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

export interface PenjualanDetailResponse {
  success: boolean;
  message: string;
  data: Penjualan;
}

// Item Penjualan Types
export interface ItemPenjualan {
  nota: string;
  kode_barang: string;
  qty: number;
  penjualan?: {
    id_nota: string;
    tgl: string;
    kode_pelanggan: string;
    subtotal: number;
  };
  barang?: {
    kode: string;
    nama: string;
    kategori: string;
    harga: number;
  };
}

export interface CreateItemPenjualanPayload {
  nota: string;
  kode_barang: string;
  qty: number;
}

export interface UpdateItemPenjualanPayload {
  qty: number;
}

export interface ItemPenjualanListResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: ItemPenjualan[];
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

export interface ItemPenjualanDetailResponse {
  success: boolean;
  message: string;
  data: ItemPenjualan;
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
