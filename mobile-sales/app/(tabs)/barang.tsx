import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ActionModal from '@/components/molecules/ActionModal';
import BarangList from '@/components/organisms/BarangList';
import MainLayout from '@/components/templates/MainLayout';
import { SPACING } from '@/constants/theme';
import { deleteBarang, getBarang } from '@/lib/barangServices';
import { Barang } from '@/types';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    flex: 1,
    textAlign: 'left' as const,
  },
  subtitle: {
    textAlign: 'left' as const,
    color: '#666',
  },
  addButton: {
    minWidth: 120,
  }
});

export default function BarangTabScreen() {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);

  useEffect(() => {
    loadBarang();
  }, []);

  async function loadBarang() {
    try {
      const response = await getBarang();
      setBarangList(response.data.data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data barang');
      console.error('Error loading barang:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadBarang();
  }

  function handleAdd() {
    router.push('/barang/create' as any);
  }

  function handleDetail(barang: Barang) {
    router.push(`/barang/${barang.kode}` as any);
  }

  function handleEdit(barang: Barang) {
    router.push({
      pathname: '/barang/edit/[kode]' as any,
      params: { kode: barang.kode }
    } as any);
  }

  async function handleDelete(barang: Barang) {
    try {
      await deleteBarang(barang.kode);
      Alert.alert('Success', 'Barang berhasil dihapus');
      await loadBarang();
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
  }

  function handleItemPress(barang: Barang) {
    setSelectedBarang(barang);
    setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
    setSelectedBarang(null);
  }

  return (
    <MainLayout scrollable={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text variant="h2" style={styles.title}>
              Data Barang
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Total: {barangList.length} barang
            </Text>
          </View>
          <Button
            title="Tambah"
            onPress={handleAdd}
            style={styles.addButton}
          />
        </View>
      </View>

      <BarangList
        data={barangList}
        loading={loading}
        onRefresh={handleRefresh}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPress={handleDetail}
      />

      <ActionModal
        visible={modalVisible}
        onClose={handleModalClose}
        title={selectedBarang?.nama || ''}
        actions={[
          { 
            text: 'Lihat Detail', 
            onPress: () => selectedBarang && handleDetail(selectedBarang) 
          },
          { 
            text: 'Edit', 
            onPress: () => selectedBarang && handleEdit(selectedBarang) 
          },
          { 
            text: 'Hapus', 
            style: 'destructive',
            onPress: () => selectedBarang && handleDelete(selectedBarang) 
          },
          { 
            text: 'Batal', 
            style: 'cancel',
            onPress: () => {} 
          }
        ]}
      />
    </MainLayout>
  );
}
