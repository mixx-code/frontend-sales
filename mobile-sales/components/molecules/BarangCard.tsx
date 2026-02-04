import { View, StyleSheet } from 'react-native';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { Barang } from '@/types';
import { COLORS, SPACING } from '@/constants/theme';

interface BarangCardProps {
  barang: Barang;
  onEdit: (barang: Barang) => void;
  onDelete: (barang: Barang) => void;
  onPress?: (barang: Barang) => void;
}

export default function BarangCard({ barang, onEdit, onDelete, onPress }: BarangCardProps) {
  return (
    <Card style={styles.container} onPress={() => onPress?.(barang)}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text variant="h3" style={styles.kode}>{barang.kode}</Text>
          <Text variant="body" style={styles.nama}>{barang.nama}</Text>
          <Text variant="small" style={styles.kategori}>{barang.kategori}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text variant="h3" style={styles.price}>
            Rp {barang.harga.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={() => onEdit(barang)}
          variant="secondary"
          size="small"
          style={styles.button}
        />
        <Button
          title="Hapus"
          onPress={() => onDelete(barang)}
          variant="danger"
          size="small"
          style={styles.button}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  info: {
    flex: 1,
  },
  kode: {
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  nama: {
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  kategori: {
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: COLORS.success,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  button: {
    minWidth: 80,
  },
});
