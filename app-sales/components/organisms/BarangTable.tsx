import React from 'react';
import { Barang } from '@/types';
import { Button } from '../atoms/Button';
import { Card, CardContent } from '../molecules/Card';

interface BarangTableProps {
  data: Barang[];
  onEdit?: (barang: Barang) => void;
  onDelete?: (kode: string) => void;
  className?: string;
}

export const BarangTable: React.FC<BarangTableProps> = ({
  data,
  onEdit,
  onDelete,
  className = '',
}) => {
  const formatHarga = (harga: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(harga);
  };

  return (
    <div className={className}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Barang
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((barang) => (
              <tr key={barang.kode} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {barang.kode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {barang.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {barang.kategori}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatHarga(barang.harga)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(barang)}
                      variant="secondary"
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(barang.kode)}
                      variant="danger"
                      className="text-xs"
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {data.map((barang) => (
          <Card key={barang.kode}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{barang.nama}</h3>
                    <p className="text-sm text-gray-500">{barang.kode}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                    {barang.kategori}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-green-600">
                    {formatHarga(barang.harga)}
                  </p>
                </div>
                <div className="flex space-x-2 pt-2">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(barang)}
                      variant="secondary"
                      className="flex-1 text-sm"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(barang.kode)}
                      variant="danger"
                      className="flex-1 text-sm"
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
