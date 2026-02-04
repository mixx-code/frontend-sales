import React from 'react';
import { Penjualan } from '@/types';
import { Button } from '../atoms/Button';
import { Card, CardContent } from '../molecules/Card';

interface PenjualanTableProps {
  data: Penjualan[];
  onEdit?: (penjualan: Penjualan) => void;
  onDelete?: (id_nota: string) => void;
  onViewItems?: (penjualan: Penjualan) => void;
  className?: string;
}

export const PenjualanTable: React.FC<PenjualanTableProps> = ({
  data,
  onEdit,
  onDelete,
  onViewItems,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

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
                Nota
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((penjualan) => (
              <tr key={penjualan.id_nota} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {penjualan.id_nota}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(penjualan.tgl)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {penjualan.pelanggan?.nama || penjualan.kode_pelanggan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatHarga(penjualan.subtotal)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onViewItems && (
                    <Button
                      onClick={() => onViewItems(penjualan)}
                      variant="primary"
                      className="text-xs"
                    >
                      Tambah Item
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(penjualan)}
                      variant="secondary"
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(penjualan.id_nota)}
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
        {data.map((penjualan) => (
          <Card key={penjualan.id_nota}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{penjualan.id_nota}</h3>
                    <p className="text-sm text-gray-500">{formatDate(penjualan.tgl)}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                    {penjualan.pelanggan?.nama || penjualan.kode_pelanggan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-green-600">
                    {formatHarga(penjualan.subtotal)}
                  </p>
                </div>
                <div className="flex space-x-2 pt-2">
                  {onViewItems && (
                    <Button
                      onClick={() => onViewItems(penjualan)}
                      variant="primary"
                      className="flex-1 text-sm"
                    >
                      Tambah Item
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(penjualan)}
                      variant="secondary"
                      className="flex-1 text-sm"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(penjualan.id_nota)}
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
