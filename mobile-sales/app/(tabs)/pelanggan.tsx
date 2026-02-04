import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ActionModal from '@/components/molecules/ActionModal';
import { PelangganList } from '@/components/organisms/PelangganList';
import MainLayout from '@/components/templates/MainLayout';
import { SPACING } from '@/constants/theme';
import { deletePelanggan, getPelanggan } from '@/lib/services';
import { Pelanggan } from '@/types';
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

export default function PelangganScreen() {
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPelanggan, setSelectedPelanggan] = useState<Pelanggan | null>(null);

  useEffect(() => {
    loadPelanggan();
  }, []);

  async function loadPelanggan() {
    try {
      const response = await getPelanggan();
      setPelangganList(response.data.data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data pelanggan');
      console.error('Error loading pelanggan:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadPelanggan();
  }

  function handleAdd() {
    router.push('/pelanggan/form' as any);
  }

  function handleDetail(pelanggan: Pelanggan) {
    router.push(`/pelanggan/${pelanggan.id_pelanggan}` as any);
  }

  function handleEdit(pelanggan: Pelanggan) {
    router.push({
      pathname: '/pelanggan/form' as any,
      params: { id: pelanggan.id_pelanggan }
    } as any);
  }

  function handleDelete(pelanggan: Pelanggan) {
    Alert.alert(
      'Hapus Pelanggan',
      `Apakah Anda yakin ingin menghapus ${pelanggan.nama}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePelanggan(pelanggan.id_pelanggan);
              Alert.alert('Success', 'Pelanggan berhasil dihapus');
              await loadPelanggan();
            } catch (error: any) {
              if (error?.message?.includes('foreign key constraint') || 
                  error?.message?.includes('Cannot delete or update a parent row') ||
                  error?.response?.data?.message?.includes('terhubung') ||
                  error?.response?.data?.message?.includes('referenced')) {
                Alert.alert(
                  'Tidak Dapat Menghapus',
                  `Pelanggan "${pelanggan.nama}" masih terhubung dengan data penjualan.\n\nHapus data penjualan terlebih dahulu.`,
                  [{ text: 'OK', style: 'default' }]
                );
              } else {
                Alert.alert('Error', 'Gagal menghapus pelanggan. Silakan coba lagi.');
              }
            }
          }
        }
      ]
    );
  }

  function handleItemPress(pelanggan: Pelanggan) {
    setSelectedPelanggan(pelanggan);
    setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
    setSelectedPelanggan(null);
  }

  return (
    <MainLayout scrollable={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text variant="h2" style={styles.title}>
              Data Pelanggan
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Total: {pelangganList.length} pelanggan
            </Text>
          </View>
          <Button
            title="Tambah"
            onPress={handleAdd}
            style={styles.addButton}
          />
        </View>
      </View>

      <PelangganList
        data={pelangganList}
        onItemPress={handleItemPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        loading={loading}
      />

      <ActionModal
        visible={modalVisible}
        onClose={handleModalClose}
        title={selectedPelanggan?.nama || ''}
        actions={[
          { 
            text: 'Lihat Detail', 
            onPress: () => selectedPelanggan && handleDetail(selectedPelanggan) 
          },
          { 
            text: 'Edit', 
            onPress: () => selectedPelanggan && handleEdit(selectedPelanggan) 
          },
          { 
            text: 'Hapus', 
            style: 'destructive',
            onPress: () => selectedPelanggan && handleDelete(selectedPelanggan) 
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
