import React from 'react';
import { ItemPenjualan } from '@/types';
import { Button } from '../atoms/Button';
import { Card, CardContent } from '../molecules/Card';

interface ItemPenjualanTableProps {
  data: ItemPenjualan[];
  onEdit?: (item: ItemPenjualan) => void;
  onDelete?: (nota: string, kode_barang: string) => void;
  className?: string;
}

export const ItemPenjualanTable: React.FC<ItemPenjualanTableProps> = ({
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

  const calculateSubtotal = (qty: number, harga: number) => {
    return qty * harga;
  };

  return (
    <div className={className}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kode Barang
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Barang
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
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
            {data.map((item) => (
              <tr key={`${item.nota}-${item.kode_barang}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.kode_barang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.barang?.nama || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.barang ? formatHarga(item.barang.harga) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.barang ? formatHarga(calculateSubtotal(item.qty, item.barang.harga)) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(item)}
                      variant="secondary"
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(item.nota, item.kode_barang)}
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
        {data.map((item) => (
          <Card key={`${item.nota}-${item.kode_barang}`}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.barang?.nama || item.kode_barang}
                    </h3>
                    <p className="text-sm text-gray-500">{item.kode_barang}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                    Qty: {item.qty}
                  </span>
                </div>
                {item.barang && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Harga:</span>
                      <span>{formatHarga(item.barang.harga)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Subtotal:</span>
                      <span className="font-semibold text-green-600">
                        {formatHarga(calculateSubtotal(item.qty, item.barang.harga))}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex space-x-2 pt-2">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(item)}
                      variant="secondary"
                      className="flex-1 text-sm"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(item.nota, item.kode_barang)}
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
