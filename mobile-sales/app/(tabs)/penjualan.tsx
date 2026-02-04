import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ActionModal from '@/components/molecules/ActionModal';
import PenjualanList from '@/components/organisms/PenjualanList';
import MainLayout from '@/components/templates/MainLayout';
import { SPACING } from '@/constants/theme';
import { deletePenjualan, getPenjualan } from '@/lib/transaksiServices';
import { Penjualan } from '@/types';
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

export default function PenjualanScreen() {
  const [penjualanList, setPenjualanList] = useState<Penjualan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPenjualan, setSelectedPenjualan] = useState<Penjualan | null>(null);

  useEffect(() => {
    loadPenjualan();
  }, []);

  async function loadPenjualan() {
    try {
      const response = await getPenjualan();
      setPenjualanList(response.data.data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data penjualan');
      console.error('Error loading penjualan:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadPenjualan();
  }

  function handleAdd() {
    router.push('/penjualan/form' as any);
  }

  function handleDetail(penjualan: Penjualan) {
    router.push(`/penjualan/${penjualan.id_nota}` as any);
  }

  function handleEdit(penjualan: Penjualan) {
    router.push({
      pathname: '/penjualan/form' as any,
      params: { id: penjualan.id_nota }
    } as any);
  }

  function handleDelete(penjualan: Penjualan) {
    Alert.alert(
      'Hapus Penjualan',
      `Apakah Anda yakin ingin menghapus penjualan ${penjualan.id_nota}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePenjualan(penjualan.id_nota);
              Alert.alert('Success', 'Penjualan berhasil dihapus');
              await loadPenjualan();
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus penjualan');
              console.error(error);
            }
          }
        }
      ]
    );
  }

  function handleItemPress(penjualan: Penjualan) {
    setSelectedPenjualan(penjualan);
    setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
    setSelectedPenjualan(null);
  }

  return (
    <MainLayout scrollable={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text variant="h2" style={styles.title}>
              Data Penjualan
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Total: {penjualanList.length} transaksi
            </Text>
          </View>
          <Button
            title="Tambah"
            onPress={handleAdd}
            style={styles.addButton}
          />
        </View>
      </View>

      <PenjualanList
        data={penjualanList}
        onItemPress={handleItemPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        loading={loading}
      />

      <ActionModal
        visible={modalVisible}
        onClose={handleModalClose}
        title={`Aksi untuk ${selectedPenjualan?.id_nota || ''}`}
        actions={[
          { 
            text: 'Lihat Detail', 
            onPress: () => selectedPenjualan && handleDetail(selectedPenjualan) 
          },
          { 
            text: 'Edit', 
            onPress: () => selectedPenjualan && handleEdit(selectedPenjualan) 
          },
          { 
            text: 'Hapus', 
            style: 'destructive',
            onPress: () => selectedPenjualan && handleDelete(selectedPenjualan) 
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
