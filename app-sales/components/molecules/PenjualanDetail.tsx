import React from 'react';
import { Penjualan } from '@/types';
import { Button } from '../atoms/Button';

interface PenjualanDetailProps {
  penjualan: Penjualan;
  onBack: () => void;
}

export const PenjualanDetail: React.FC<PenjualanDetailProps> = ({
  penjualan,
  onBack,
}) => {
  const formatHarga = (harga: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(harga);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <Button variant="secondary" onClick={onBack} className="mb-4">
          ← Kembali ke Daftar Penjualan
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detail Penjualan</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <span className="text-sm text-gray-600">Nota:</span>
          <p className="font-medium">{penjualan.id_nota}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Tanggal:</span>
          <p className="font-medium">{new Date(penjualan.tgl).toLocaleDateString('id-ID')}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Pelanggan:</span>
          <p className="font-medium">{penjualan.pelanggan?.nama || penjualan.kode_pelanggan}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Subtotal:</span>
          <p className="font-medium text-green-600">{formatHarga(penjualan.subtotal)}</p>
        </div>
      </div>
    </div>
  );
};
