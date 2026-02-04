import { COLORS, SPACING } from '@/constants/theme';
import { Barang } from '@/types';
import { memo } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Text from '../atoms/Text';
import BarangCard from '../molecules/BarangCard';

interface BarangListProps {
  data: Barang[];
  loading?: boolean;
  onRefresh: () => void;
  onEdit: (barang: Barang) => void;
  onDelete: (barang: Barang) => void;
  onPress?: (barang: Barang) => void;
}

function BarangList({ 
  data, 
  loading = false, 
  onRefresh, 
  onEdit, 
  onDelete, 
  onPress 
}: BarangListProps) {
  const handleDelete = (barang: Barang) => {
    Alert.alert(
      'Hapus Barang',
      `Apakah Anda yakin ingin menghapus barang "${barang.nama}"?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => onDelete(barang),
        },
      ]
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="body" style={styles.emptyText}>
        Belum ada data barang
      </Text>
      <Button
        title="Refresh"
        onPress={onRefresh}
        variant="secondary"
        style={styles.refreshButton}
      />
    </View>
  );

  if (loading && data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.kode}
        renderItem={({ item }) => (
          <BarangCard
            barang={item}
            onEdit={onEdit}
            onDelete={() => handleDelete(item)}
            onPress={onPress}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingVertical: SPACING.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  refreshButton: {
    minWidth: 120,
  },
});

export default memo(BarangList);
