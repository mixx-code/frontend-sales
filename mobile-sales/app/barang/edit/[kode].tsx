import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import BarangForm from '@/components/organisms/BarangForm';
import MainLayout from '@/components/templates/MainLayout';
import { getBarangById, updateBarang } from '@/lib/barangServices';
import { Barang, UpdateBarangPayload } from '@/types';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function EditBarangScreen() {
  const [barang, setBarang] = useState<Barang | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { kode } = useLocalSearchParams<{ kode: string }>();
  const navigation = useNavigation();
  

  useEffect(() => {
    navigation.setOptions({
      title: 'Edit Barang'
    });
  }, [navigation]);

  useEffect(() => {
    loadBarang();
  }, [kode]);

  const loadBarang = async () => {
    if (!kode) return;
    
    try {
      setInitialLoading(true);
      const data = await getBarangById(kode);
      setBarang(data);
    } catch (error) {
      console.error('Error loading barang:', error);
      Alert.alert('Error', 'Gagal memuat data barang');
      router.back();
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (data: UpdateBarangPayload) => {
    if (!kode) return;
    
    try {
      setLoading(true);
      await updateBarang(kode, data);
      Alert.alert('Sukses', 'Barang berhasil diupdate');
      router.back();
    } catch (error) {
      console.error('Error updating barang:', error);
      Alert.alert('Error', 'Gagal mengupdate barang');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (initialLoading || !barang) {
    return (
      <MainLayout>
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BarangForm
        barang={barang}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isEdit={true}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
