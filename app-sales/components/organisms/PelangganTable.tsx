import React from 'react';
import { Pelanggan } from '@/types';
import { Button } from '../atoms/Button';
import { Card, CardContent } from '../molecules/Card';

interface PelangganTableProps {
  data: Pelanggan[];
  onEdit?: (pelanggan: Pelanggan) => void;
  onDelete?: (id_pelanggan: string) => void;
  className?: string;
}

export const PelangganTable: React.FC<PelangganTableProps> = ({
  data,
  onEdit,
  onDelete,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domisili
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis Kelamin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((pelanggan) => (
              <tr key={pelanggan.id_pelanggan} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {pelanggan.id_pelanggan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pelanggan.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pelanggan.domisili}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pelanggan.jenis_kelamin === 'pria' ? 'Laki-laki' : 'Perempuan'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(pelanggan)}
                      variant="secondary"
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(pelanggan.id_pelanggan)}
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
        {data.map((pelanggan) => (
          <Card key={pelanggan.id_pelanggan}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{pelanggan.nama}</h3>
                    <p className="text-sm text-gray-500">{pelanggan.id_pelanggan}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    pelanggan.jenis_kelamin === 'pria'
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {pelanggan.jenis_kelamin === 'pria' ? 'Laki-laki' : 'Perempuan'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Domisili:</span> {pelanggan.domisili}
                </p>
                <div className="flex space-x-2 pt-2">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(pelanggan)}
                      variant="secondary"
                      className="flex-1 text-sm"
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(pelanggan.id_pelanggan)}
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
