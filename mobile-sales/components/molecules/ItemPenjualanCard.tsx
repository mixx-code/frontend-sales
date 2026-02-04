import { COLORS, SPACING } from '@/constants/theme';
import { ItemPenjualan } from '@/types';
import { StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import TextAtom from '../atoms/Text';

interface ItemPenjualanCardProps {
  item: ItemPenjualan;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function ItemPenjualanCard({ 
  item, 
  onEdit, 
  onDelete, 
  showActions = true 
}: ItemPenjualanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const subtotal = (item.barang?.harga || 0) * item.qty;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <TextAtom variant="h4" style={styles.kodeBarang}>
          {item.kode_barang}
        </TextAtom>
        <View style={styles.qtyContainer}>
          <TextAtom variant="body" style={styles.qty}>
            Qty: {item.qty}
          </TextAtom>
        </View>
      </View>
      
      <View style={styles.content}>
        <TextAtom variant="body" style={styles.namaBarang}>
          {item.barang?.nama || 'Unknown Product'}
        </TextAtom>
        
        <View style={styles.priceRow}>
          <TextAtom variant="caption" style={styles.label}>
            Harga:
          </TextAtom>
          <TextAtom variant="body" style={styles.price}>
            {formatCurrency(item.barang?.harga || 0)}
          </TextAtom>
        </View>
        
        <View style={styles.categoryRow}>
          <TextAtom variant="caption" style={styles.label}>
            Kategori:
          </TextAtom>
          <TextAtom variant="body" style={styles.category}>
            {item.barang?.kategori || '-'}
          </TextAtom>
        </View>
        
        <View style={styles.subtotalRow}>
          <TextAtom variant="body" style={styles.subtotalLabel}>
            Subtotal:
          </TextAtom>
          <TextAtom variant="h4" style={styles.subtotalValue}>
            {formatCurrency(subtotal)}
          </TextAtom>
        </View>
      </View>
      
      {showActions && (
        <View style={styles.actions}>
          <Button
            title="Edit"
            onPress={onEdit || (() => {})}
            variant="secondary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Hapus"
            onPress={onDelete || (() => {})}
            variant="danger"
            size="small"
            style={styles.actionButton}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  kodeBarang: {
    color: COLORS.primary,
    fontWeight: '600',
    flex: 1,
  },
  qtyContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  qty: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 12,
  },
  content: {
    gap: SPACING.xs,
  },
  namaBarang: {
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: COLORS.textLight,
  },
  price: {
    color: COLORS.text,
    fontWeight: '500',
  },
  category: {
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  subtotalLabel: {
    color: COLORS.text,
  },
  subtotalValue: {
    color: COLORS.success,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
});
