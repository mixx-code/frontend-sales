import { SPACING } from '@/constants/theme';
import { Pelanggan } from '@/types';
import { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Text from '../atoms/Text';
import { PelangganCard } from '../molecules/PelangganCard';

interface PelangganListProps {
  data: Pelanggan[];
  onItemPress: (pelanggan: Pelanggan) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  loading?: boolean;
  onEndReached?: () => void;
  ListEmptyComponent?: React.ComponentType<any>;
}

function PelangganListComponent({ 
  data, 
  onItemPress, 
  onRefresh,
  refreshing = false,
  loading = false,
  onEndReached,
  ListEmptyComponent
}: PelangganListProps) {
  if (loading && data.length === 0) {
    return <LoadingSpinner />;
  }

  const DefaultEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text variant="h3" style={styles.emptyTitle}>
        Tidak Ada Data
      </Text>
      <Text variant="body" style={styles.emptyMessage}>
        Belum ada data pelanggan yang tersedia
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id_pelanggan}
      renderItem={({ item }) => (
        <PelangganCard 
          pelanggan={item} 
          onPress={onItemPress}
        />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={ListEmptyComponent || DefaultEmptyComponent}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyTitle: {
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    opacity: 0.7,
  },
});

export const PelangganList = memo(PelangganListComponent);
