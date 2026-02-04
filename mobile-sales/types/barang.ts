export interface Barang {
  kode: string;
  nama: string;
  kategori: string;
  harga: number;
}

export interface BarangListResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Barang[];
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

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CreateBarangPayload {
  kode: string;
  nama: string;
  kategori: string;
  harga: number;
}

export interface UpdateBarangPayload {
  nama?: string;
  kategori?: string;
  harga?: number;
}
