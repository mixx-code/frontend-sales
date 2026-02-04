import React from 'react';
import { ItemPenjualan } from '@/types';
import { Button } from '../atoms/Button';
import { Card, CardHeader, CardContent } from '../molecules/Card';

interface ItemPenjualanManagerProps {
  itemPenjualanList: ItemPenjualan[];
  loading: boolean;
  onCreateItem: () => void;
  onEditItem: (item: ItemPenjualan) => void;
  onDeleteItem: (nota: string, kode_barang: string) => void;
  showItemForm: boolean;
  children: React.ReactNode;
}

export const ItemPenjualanManager: React.FC<ItemPenjualanManagerProps> = ({
  itemPenjualanList,
  loading,
  onCreateItem,
  onEditItem,
  onDeleteItem,
  showItemForm,
  children,
}) => {
  const formatHarga = (harga: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(harga);
  };

  const calculateTotalSubtotal = () => {
    return itemPenjualanList.reduce((total, item) => {
      if (item.barang) {
        return total + (item.qty * item.barang.harga);
      }
      return total;
    }, 0);
  };

  if (showItemForm) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Item Penjualan</h2>
        <Button onClick={onCreateItem} disabled={loading}>
          Tambah Item
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Memuat data...</p>
          </div>
        ) : itemPenjualanList.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada item</h3>
            <p className="text-gray-600 mb-4">Mulai dengan menambah item penjualan</p>
            <Button onClick={onCreateItem}>
              Tambah Item Pertama
            </Button>
          </div>
        ) : (
          children
        )}
      </div>

      {itemPenjualanList.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              {formatHarga(calculateTotalSubtotal())}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
