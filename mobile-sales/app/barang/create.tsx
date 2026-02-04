import BarangForm from '@/components/organisms/BarangForm';
import MainLayout from '@/components/templates/MainLayout';
import { createBarang } from '@/lib/barangServices';
import { CreateBarangPayload, UpdateBarangPayload } from '@/types';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function CreateBarangScreen() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateBarangPayload | UpdateBarangPayload) => {
    try {
      setLoading(true);
      await createBarang(data as CreateBarangPayload);
      Alert.alert('Sukses', 'Barang berhasil ditambahkan');
      router.back();
    } catch (error) {
      console.error('Error creating barang:', error);
      Alert.alert('Error', 'Gagal menambahkan barang');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <MainLayout>
      <BarangForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isEdit={false}
      />
    </MainLayout>
  );
}
