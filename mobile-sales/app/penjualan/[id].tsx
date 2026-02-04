import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import ItemPenjualanList from '@/components/organisms/ItemPenjualanList';
import MainLayout from '@/components/templates/MainLayout';
import { COLORS, SPACING } from '@/constants/theme';
import { deletePenjualan, getItemsByNota, getPenjualanById } from '@/lib/transaksiServices';
import { ItemPenjualan, Penjualan } from '@/types';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function PenjualanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [penjualan, setPenjualan] = useState<Penjualan | null>(null);
  const [items, setItems] = useState<ItemPenjualan[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Detail Penjualan'
    });
  }, [navigation]);

  useEffect(() => {
    if (id) {
      loadPenjualan();
      loadItems();
    }
  }, [id]);

  async function loadPenjualan() {
    try {
      const data = await getPenjualanById(id as string);
      console.log(data);
      setPenjualan(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data penjualan');
      console.error(error);
      router.back();
    } finally {
      setLoading(false);
    }
  }

  async function loadItems() {
    try {
      const response = await getItemsByNota(id as string);
      setItems(response.data.data);
    } catch (error) {
      console.error('Gagal memuat items:', error);
    } finally {
      setItemsLoading(false);
    }
  }

  function handleEdit() {
    if (penjualan) {
      router.push({
        pathname: '/penjualan/form' as any,
        params: { id: penjualan.id_nota }
      } as any);
    }
  }

  function handleDelete() {
    if (!penjualan) return;

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
              router.back();
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus penjualan');
              console.error(error);
            }
          }
        }
      ]
    );
  }

  function handleAddItem() {
    if (penjualan) {
      router.push(`/penjualan/${penjualan.id_nota}/item/form` as any);
    }
  }

  function handleEditItem(item: ItemPenjualan) {
    router.push(`/penjualan/${item.nota}/item/form?kode_barang=${item.kode_barang}` as any);
  }

  function handleDeleteItem(item: ItemPenjualan) {
    Alert.alert(
      'Hapus Item',
      `Apakah Anda yakin ingin menghapus item ${item.kode_barang}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              // Import and use deleteItemPenjualan
              const { deleteItemPenjualan } = await import('@/lib/transaksiServices');
              await deleteItemPenjualan(item.nota, item.kode_barang);
              Alert.alert('Success', 'Item berhasil dihapus');
              loadItems(); // Refresh items
              loadPenjualan(); // Refresh penjualan for updated subtotal
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus item');
              console.error(error);
            }
          }
        }
      ]
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateItemsTotal = () => {
    return items.reduce((total, item) => {
      return total + ((item.barang?.harga || 0) * item.qty);
    }, 0);
  };

  if (loading) {
    return (
      <MainLayout scrollable={false}>
        <View style={styles.loadingContainer}>
          <Text variant="body">Loading...</Text>
        </View>
      </MainLayout>
    );
  }

  if (!penjualan) {
    return (
      <MainLayout scrollable={false}>
        <View style={styles.errorContainer}>
          <Text variant="h3">Data tidak ditemukan</Text>
          <Button title="Kembali" onPress={() => router.back()} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout scrollable={false}>
      <ItemPenjualanList
        data={items}
        onItemEdit={handleEditItem}
        onItemDelete={handleDeleteItem}
        onRefresh={loadItems}
        refreshing={false}
        loading={itemsLoading}
        showActions={true}
        nota={penjualan.id_nota}
        headerComponent={
          <View style={styles.container}>
            <Card style={styles.infoCard}>
              <Text variant="h3" style={styles.title}>
                Detail Penjualan
              </Text>
              
              <View style={styles.infoRow}>
                <Text variant="body" style={styles.label}>
                  ID Nota:
                </Text>
                <Text variant="body" style={styles.value}>
                  {penjualan.id_nota}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="body" style={styles.label}>
                  Tanggal:
                </Text>
                <Text variant="body" style={styles.value}>
                  {formatDate(penjualan.tgl)}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="body" style={styles.label}>
                  Pelanggan:
                </Text>
                <Text variant="body" style={styles.value}>
                  {penjualan.kode_pelanggan}
                </Text>
              </View>
              
              <View style={styles.totalRow}>
                <Text variant="h4" style={styles.totalLabel}>
                  Subtotal:
                </Text>
                <Text variant="h4" style={styles.totalValue}>
                  {formatCurrency(penjualan.subtotal)}
                </Text>
              </View>

              <View style={styles.actionButtonsContainer}>
                <Button
                  title="Edit"
                  onPress={handleEdit}
                  variant="primary"
                  style={styles.editButton}
                />
                <Button
                  title="Hapus"
                  onPress={handleDelete}
                  variant="danger"
                  style={styles.deleteButton}
                />
              </View>
            </Card>

            <View style={styles.itemsSection}>
              <View style={styles.itemsHeader}>
                <Text variant="h4" style={styles.itemsTitle}>
                  Items Penjualan
                </Text>
                <Button
                  title="Tambah Item"
                  onPress={handleAddItem}
                  size="small"
                />
              </View>
            </View>
          </View>
        }
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.danger,
  },
  infoCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
    color: COLORS.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  label: {
    color: COLORS.textLight,
    flex: 1,
  },
  value: {
    color: COLORS.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalLabel: {
    color: COLORS.text,
  },
  totalValue: {
    color: COLORS.success,
    fontWeight: '600',
  },
  itemsSection: {
    marginBottom: SPACING.md,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  itemsTitle: {
    color: COLORS.text,
  },
});
