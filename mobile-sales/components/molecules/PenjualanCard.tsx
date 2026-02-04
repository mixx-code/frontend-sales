import { COLORS, SPACING } from '@/constants/theme';
import { Penjualan } from '@/types';
import { StyleSheet, View } from 'react-native';
import Card from '../atoms/Card';
import TextAtom from '../atoms/Text';

interface PenjualanCardProps {
  penjualan: Penjualan;
  onPress?: () => void;
}

export default function PenjualanCard({ penjualan, onPress }: PenjualanCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
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

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <TextAtom variant="h4" style={styles.nota}>
          {penjualan.id_nota}
        </TextAtom>
        <TextAtom variant="caption" style={styles.date}>
          {formatDate(penjualan.tgl)}
        </TextAtom>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <TextAtom variant="body" style={styles.label}>
            Pelanggan:
          </TextAtom>
          <TextAtom variant="body" style={styles.value}>
            {penjualan.pelanggan?.nama || penjualan.kode_pelanggan}
          </TextAtom>
        </View>
        
        <View style={styles.totalRow}>
          <TextAtom variant="h4" style={styles.totalLabel}>
            Total:
          </TextAtom>
          <TextAtom variant="h4" style={styles.totalValue}>
            {formatCurrency(penjualan.subtotal)}
          </TextAtom>
        </View>
      </View>
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
  nota: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  date: {
    color: COLORS.textLight,
  },
  content: {
    gap: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
