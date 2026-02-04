import React, { useState } from 'react';
import { Penjualan, CreatePenjualanRequest, UpdatePenjualanRequest, Pelanggan } from '@/types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Card, CardHeader, CardContent } from '../molecules/Card';

interface PenjualanFormProps {
  penjualan?: Penjualan;
  pelangganList: Pelanggan[];
  onSubmit: (data: CreatePenjualanRequest | UpdatePenjualanRequest) => void;
  onCancel: () => void;
  loading?: boolean;
  className?: string;
}

export const PenjualanForm: React.FC<PenjualanFormProps> = ({
  penjualan,
  pelangganList,
  onSubmit,
  onCancel,
  loading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    id_nota: penjualan?.id_nota || '',
    tgl: penjualan?.tgl || new Date().toISOString().split('T')[0],
    kode_pelanggan: penjualan?.kode_pelanggan || '',
    subtotal: penjualan?.subtotal || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!penjualan && !formData.id_nota.trim()) {
      newErrors.id_nota = 'Nota wajib diisi';
    }
    if (!formData.tgl.trim()) {
      newErrors.tgl = 'Tanggal wajib diisi';
    }
    if (!formData.kode_pelanggan.trim()) {
      newErrors.kode_pelanggan = 'Pelanggan wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = penjualan
      ? {
          tgl: formData.tgl,
          kode_pelanggan: formData.kode_pelanggan,
          subtotal: formData.subtotal,
        }
      : {
          id_nota: formData.id_nota,
          tgl: formData.tgl,
          kode_pelanggan: formData.kode_pelanggan,
          subtotal: formData.subtotal,
        };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPelangganName = (kode: string) => {
    const pelanggan = pelangganList.find(p => p.id_pelanggan === kode);
    return pelanggan?.nama || kode;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">
          {penjualan ? 'Edit Penjualan' : 'Tambah Penjualan Baru'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!penjualan && (
              <Input
                label="Nota"
                value={formData.id_nota}
                onChange={(value) => handleChange('id_nota', value)}
                placeholder="Masukkan nomor nota"
                error={errors.id_nota}
                required
              />
            )}
            <Input
              label="Tanggal"
              type="date"
              value={formData.tgl}
              onChange={(value) => handleChange('tgl', value)}
              error={errors.tgl}
              required
              className={!penjualan ? 'md:col-span-2' : ''}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pelanggan <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.kode_pelanggan}
                onChange={(e) => handleChange('kode_pelanggan', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.kode_pelanggan ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Pilih Pelanggan</option>
                {pelangganList.map((pelanggan) => (
                  <option key={pelanggan.id_pelanggan} value={pelanggan.id_pelanggan}>
                    {pelanggan.nama} ({pelanggan.id_pelanggan})
                  </option>
                ))}
              </select>
              {errors.kode_pelanggan && (
                <p className="text-sm text-red-600 mt-1">{errors.kode_pelanggan}</p>
              )}
            </div>
            <Input
              label="Subtotal"
              type="number"
              value={formData.subtotal.toString()}
              onChange={(value) => handleChange('subtotal', parseInt(value) || 0)}
              placeholder="0"
              error={errors.subtotal}
              disabled // Subtotal akan dihitung otomatis dari item
              className="bg-gray-100"
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Catatan:</strong> Subtotal akan dihitung otomatis dari item penjualan yang ditambahkan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? 'Menyimpan...' : (penjualan ? 'Update' : 'Simpan')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
