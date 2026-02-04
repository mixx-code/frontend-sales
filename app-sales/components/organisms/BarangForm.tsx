import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Barang, CreateBarangRequest, UpdateBarangRequest } from '@/types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Card, CardHeader, CardContent } from '../molecules/Card';

interface BarangFormProps {
  barang?: Barang;
  onSubmit: (data: CreateBarangRequest | UpdateBarangRequest) => void;
  onCancel: () => void;
  onBack?: () => void;
  loading?: boolean;
  className?: string;
}

const kategoriOptions = [
  { value: 'Elektronik', label: 'Elektronik' },
  { value: 'Elektronik Gaming', label: 'Elektronik Gaming' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Pakaian', label: 'Pakaian' },
  { value: 'Makanan', label: 'Makanan' },
  { value: 'Minuman', label: 'Minuman' },
  { value: 'Alat Tulis', label: 'Alat Tulis' },
  { value: 'Lainnya', label: 'Lainnya' },
];

export const BarangForm: React.FC<BarangFormProps> = ({
  barang,
  onSubmit,
  onCancel,
  onBack,
  loading = false,
  className = '',
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kode: barang?.kode || '',
    nama: barang?.nama || '',
    kategori: barang?.kategori || '',
    harga: barang?.harga || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!barang && !formData.kode.trim()) {
      newErrors.kode = 'Kode barang wajib diisi';
    }
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama barang wajib diisi';
    }
    if (!formData.kategori.trim()) {
      newErrors.kategori = 'Kategori wajib diisi';
    }
    if (!formData.harga || formData.harga <= 0) {
      newErrors.harga = 'Harga harus lebih dari 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = barang
      ? {
          nama: formData.nama,
          kategori: formData.kategori,
          harga: formData.harga,
        }
      : {
          kode: formData.kode,
          nama: formData.nama,
          kategori: formData.kategori,
          harga: formData.harga,
        };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">
          {barang ? 'Edit Barang' : 'Tambah Barang Baru'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!barang && (
              <Input
                label="Kode Barang"
                value={formData.kode}
                onChange={(value) => handleChange('kode', value)}
                placeholder="Masukkan kode barang"
                error={errors.kode}
                required
              />
            )}
            <Input
              label="Nama Barang"
              value={formData.nama}
              onChange={(value) => handleChange('nama', value)}
              placeholder="Masukkan nama barang"
              error={errors.nama}
              required
              className={!barang ? 'md:col-span-2' : ''}
            />
            <div>
              <Input
                label="Kategori"
                value={formData.kategori}
                onChange={(value) => handleChange('kategori', value)}
                placeholder="Masukkan kategori"
                error={errors.kategori}
                required
              />
              <datalist id="kategori-list">
                {kategoriOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </datalist>
            </div>
            <Input
              label="Harga"
              type="number"
              value={formData.harga.toString()}
              onChange={(value) => handleChange('harga', parseInt(value) || 0)}
              placeholder="Masukkan harga"
              error={errors.harga}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  router.push('/barang');
                }
              }}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              ← Kembali
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? 'Menyimpan...' : (barang ? 'Update' : 'Simpan')}
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
