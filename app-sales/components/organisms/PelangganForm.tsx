import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pelanggan, CreatePelangganRequest, UpdatePelangganRequest } from '@/types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Card, CardHeader, CardContent } from '../molecules/Card';

interface PelangganFormProps {
  pelanggan?: Pelanggan;
  onSubmit: (data: CreatePelangganRequest | UpdatePelangganRequest) => void;
  onCancel: () => void;
  onBack?: () => void;
  loading?: boolean;
  className?: string;
}

const jenisKelaminOptions = [
  { value: 'pria', label: 'Laki-laki' },
  { value: 'wanita', label: 'Perempuan' },
];

export const PelangganForm: React.FC<PelangganFormProps> = ({
  pelanggan,
  onSubmit,
  onCancel,
  onBack,
  loading = false,
  className = '',
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_pelanggan: pelanggan?.id_pelanggan || '',
    nama: pelanggan?.nama || '',
    domisili: pelanggan?.domisili || '',
    jenis_kelamin: pelanggan?.jenis_kelamin || 'pria',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!pelanggan && !formData.id_pelanggan.trim()) {
      newErrors.id_pelanggan = 'ID Pelanggan wajib diisi';
    }
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    }
    if (!formData.domisili.trim()) {
      newErrors.domisili = 'Domisili wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = pelanggan
      ? {
          nama: formData.nama,
          domisili: formData.domisili,
          jenis_kelamin: formData.jenis_kelamin,
        }
      : {
          id_pelanggan: formData.id_pelanggan,
          nama: formData.nama,
          domisili: formData.domisili,
          jenis_kelamin: formData.jenis_kelamin,
        };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">
          {pelanggan ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!pelanggan && (
              <Input
                label="ID Pelanggan"
                value={formData.id_pelanggan}
                onChange={(value) => handleChange('id_pelanggan', value)}
                placeholder="Masukkan ID Pelanggan"
                error={errors.id_pelanggan}
                required
              />
            )}
            <Input
              label="Nama"
              value={formData.nama}
              onChange={(value) => handleChange('nama', value)}
              placeholder="Masukkan nama pelanggan"
              error={errors.nama}
              required
              className={!pelanggan ? 'md:col-span-2' : ''}
            />
            <Input
              label="Domisili"
              value={formData.domisili}
              onChange={(value) => handleChange('domisili', value)}
              placeholder="Masukkan domisili"
              error={errors.domisili}
              required
            />
            <Select
              label="Jenis Kelamin"
              value={formData.jenis_kelamin}
              onChange={(value) => handleChange('jenis_kelamin', value)}
              options={jenisKelaminOptions}
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
                  router.push('/pelanggan');
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
              {loading ? 'Menyimpan...' : (pelanggan ? 'Update' : 'Simpan')}
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
