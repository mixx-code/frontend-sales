export interface Pelanggan {
  id_pelanggan: string;
  nama: string;
  domisili: string;
  jenis_kelamin: 'pria' | 'wanita';
}

export interface CreatePelangganRequest {
  id_pelanggan: string;
  nama: string;
  domisili: string;
  jenis_kelamin: 'pria' | 'wanita';
}

export interface UpdatePelangganRequest {
  nama: string;
  domisili: string;
  jenis_kelamin: 'pria' | 'wanita';
}

export interface Barang {
  kode: string;
  nama: string;
  kategori: string;
  harga: number;
}

export interface CreateBarangRequest {
  kode: string;
  nama: string;
  kategori: string;
  harga: number;
}

export interface UpdateBarangRequest {
  nama: string;
  kategori: string;
  harga: number;
}

export interface Penjualan {
  id_nota: string;
  tgl: string;
  kode_pelanggan: string;
  subtotal: number;
  pelanggan?: Pelanggan;
}

export interface CreatePenjualanRequest {
  id_nota: string;
  tgl: string;
  kode_pelanggan: string;
  subtotal: number;
}

export interface UpdatePenjualanRequest {
  tgl: string;
  kode_pelanggan: string;
  subtotal: number;
}

export interface ItemPenjualan {
  nota: string;
  kode_barang: string;
  qty: number;
  penjualan?: Penjualan;
  barang?: Barang;
}

export interface CreateItemPenjualanRequest {
  nota: string;
  kode_barang: string;
  qty: number;
}

export interface UpdateItemPenjualanRequest {
  qty: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
