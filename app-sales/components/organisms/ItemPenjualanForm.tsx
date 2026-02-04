import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ItemPenjualan, CreateItemPenjualanRequest, UpdateItemPenjualanRequest, Barang } from '@/types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Card, CardHeader, CardContent } from '../molecules/Card';

interface ItemPenjualanFormProps {
  item?: ItemPenjualan;
  barangList: Barang[];
  nota: string;
  onSubmit: (data: CreateItemPenjualanRequest | UpdateItemPenjualanRequest) => void;
  onCancel: () => void;
  onBack?: () => void;
  loading?: boolean;
  className?: string;
}

export const ItemPenjualanForm: React.FC<ItemPenjualanFormProps> = ({
  item,
  barangList,
  nota,
  onSubmit,
  onCancel,
  onBack,
  loading = false,
  className = '',
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kode_barang: item?.kode_barang || '',
    qty: item?.qty || 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.kode_barang.trim()) {
      newErrors.kode_barang = 'Barang wajib dipilih';
    }
    if (!formData.qty || formData.qty <= 0) {
      newErrors.qty = 'Quantity harus lebih dari 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = item
      ? {
          qty: formData.qty,
        }
      : {
          nota: nota,
          kode_barang: formData.kode_barang,
          qty: formData.qty,
        };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getBarangName = (kode: string) => {
    const barang = barangList.find(b => b.kode === kode);
    return barang?.nama || kode;
  };

  const getBarangHarga = (kode: string) => {
    const barang = barangList.find(b => b.kode === kode);
    return barang?.harga || 0;
  };

  const selectedBarang = barangList.find(b => b.kode === formData.kode_barang);
  const subtotal = selectedBarang ? formData.qty * selectedBarang.harga : 0;

  const formatHarga = (harga: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(harga);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">
          {item ? 'Edit Item Penjualan' : 'Tambah Item Penjualan'}
        </h2>
        <p className="text-sm text-gray-600">Nota: {nota}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barang <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.kode_barang}
                onChange={(e) => handleChange('kode_barang', e.target.value)}
                disabled={!!item} // Edit tidak bisa ganti barang
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.kode_barang ? 'border-red-500' : 'border-gray-300'
                } ${item ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                required
              >
                <option value="">Pilih Barang</option>
                {barangList.map((barang) => (
                  <option key={barang.kode} value={barang.kode}>
                    {barang.nama} ({barang.kode}) - {formatHarga(barang.harga)}
                  </option>
                ))}
              </select>
              {errors.kode_barang && (
                <p className="text-sm text-red-600 mt-1">{errors.kode_barang}</p>
              )}
            </div>
            <Input
              label="Quantity"
              type="number"
              value={formData.qty.toString()}
              onChange={(value) => handleChange('qty', parseInt(value) || 0)}
              placeholder="1"
              error={errors.qty}
              required
            />
          </div>
          
          {selectedBarang && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Detail Barang</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Nama:</span>
                  <p className="font-medium">{selectedBarang.nama}</p>
                </div>
                <div>
                  <span className="text-gray-600">Harga:</span>
                  <p className="font-medium">{formatHarga(selectedBarang.harga)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Subtotal:</span>
                  <p className="font-medium text-green-600">{formatHarga(subtotal)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Catatan:</strong> Subtotal penjualan akan dihitung ulang otomatis saat item ditambahkan, diubah, atau dihapus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  router.push('/penjualan');
                }
              }}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              ← Kembali
            </Button>
            <Button
              type="submit"
              disabled={loading || !selectedBarang}
              className="w-full sm:w-auto"
            >
              {loading ? 'Menyimpan...' : (item ? 'Update' : 'Tambah')}
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
