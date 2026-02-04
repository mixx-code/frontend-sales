import BarangList from '@/components/organisms/BarangList';
import MainLayout from '@/components/templates/MainLayout';
import {
  deleteBarang,
  getBarang
} from '@/lib/barangServices';
import { Barang } from '@/types';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function BarangScreen() {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBarang();
  }, []);

  const loadBarang = async () => {
    try {
      setLoading(true);
      const response = await getBarang();
      setBarangList(response.data.data);
    } catch (error) {
      console.error('Error loading barang:', error);
      Alert.alert('Error', 'Gagal memuat data barang');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    router.push('/barang/create');
  };

  const handleEdit = (barang: Barang) => {
    router.push({
      pathname: '/barang/edit/[kode]',
      params: { kode: barang.kode }
    });
  };

  const handleDelete = async (barang: Barang) => {
    try {
      await deleteBarang(barang.kode);
      Alert.alert('Sukses', 'Barang berhasil dihapus');
      loadBarang();
    } catch (error: any) {
      if (error?.message?.includes('foreign key constraint') || 
          error?.message?.includes('Cannot delete or update a parent row') ||
          error?.response?.data?.message?.includes('terhubung') ||
          error?.response?.data?.message?.includes('referenced')) {
        Alert.alert(
          'Tidak Dapat Menghapus',
          `Barang "${barang.nama}" masih terhubung dengan data penjualan.\n\nHapus item penjualan terlebih dahulu.`,
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        Alert.alert('Error', 'Gagal menghapus barang. Silakan coba lagi.');
      }
    }
  };

  const handleView = (barang: Barang) => {
    router.push({
      pathname: '/barang/[kode]',
      params: { kode: barang.kode }
    });
  };

  return (
    <MainLayout scrollable={false}>
      <BarangList
        data={barangList}
        loading={loading}
        onRefresh={loadBarang}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPress={handleView}
      />
    </MainLayout>
  );
}
