import { COLORS, SPACING } from '@/constants/theme';
import { ItemPenjualan } from '@/types';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Text from '../atoms/Text';
import ItemPenjualanCard from '../molecules/ItemPenjualanCard';

interface ItemPenjualanListProps {
  data: ItemPenjualan[];
  onItemEdit: (item: ItemPenjualan) => void;
  onItemDelete: (item: ItemPenjualan) => void;
  onRefresh: () => void;
  refreshing: boolean;
  loading: boolean;
  showActions?: boolean;
  nota: string;
  headerComponent?: React.ReactElement;
}

export default function ItemPenjualanList({
  data,
  onItemEdit,
  onItemDelete,
  onRefresh,
  refreshing,
  loading,
  showActions = true,
  nota,
  headerComponent,
}: ItemPenjualanListProps) {
  const renderItem = ({ item }: { item: ItemPenjualan }) => (
    <ItemPenjualanCard
      item={item}
      onEdit={() => onItemEdit(item)}
      onDelete={() => onItemDelete(item)}
      showActions={showActions}
    />
  );

  const renderEmptyState = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text variant="h3" style={styles.emptyTitle}>
          Belum Ada Item
        </Text>
        <Text variant="body" style={styles.emptyText}>
          Tambahkan item untuk penjualan {nota}
        </Text>
        {showActions && (
          <Button
            title="Tambah Item"
            onPress={() => {}} // Will be handled by parent
            style={styles.emptyButton}
          />
        )}
      </View>
    );
  };

  const calculateTotal = () => {
    return data.reduce((total, item) => {
      return total + ((item.barang?.harga || 0) * item.qty);
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.nota}-${item.kode_barang}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={
          data.length > 0 ? (
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text variant="h4" style={styles.totalLabel}>
                  Total:
                </Text>
                <Text variant="h4" style={styles.totalValue}>
                  {formatCurrency(calculateTotal())}
                </Text>
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: COLORS.text,
  },
  totalValue: {
    color: COLORS.success,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptyText: {
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  emptyButton: {
    paddingHorizontal: SPACING.lg,
  },
});
