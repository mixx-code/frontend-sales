import { COLORS, SPACING } from '@/constants/theme';
import { Penjualan } from '@/types';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Text from '../atoms/Text';
import PenjualanCard from '../molecules/PenjualanCard';

interface PenjualanListProps {
  data: Penjualan[];
  onItemPress: (penjualan: Penjualan) => void;
  onRefresh: () => void;
  refreshing: boolean;
  loading: boolean;
}

export default function PenjualanList({
  data,
  onItemPress,
  onRefresh,
  refreshing,
  loading,
}: PenjualanListProps) {
  const renderPenjualan = ({ item }: { item: Penjualan }) => (
    <PenjualanCard
      penjualan={item}
      onPress={() => onItemPress(item)}
    />
  );

  const renderEmptyState = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text variant="h3" style={styles.emptyTitle}>
          Belum Ada Data Penjualan
        </Text>
        <Text variant="body" style={styles.emptyText}>
          Tambahkan penjualan baru untuk memulai
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderPenjualan}
      keyExtractor={(item) => item.id_nota}
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
      ListEmptyComponent={renderEmptyState}
      
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: SPACING.sm,
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    color: COLORS.text,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: COLORS.textLight,
    marginTop: 2,
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
  },
});
