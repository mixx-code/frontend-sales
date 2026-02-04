import { COLORS, SPACING } from '@/constants/theme';
import { Pelanggan } from '@/types';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface PelangganCardProps {
  pelanggan: Pelanggan;
  onPress?: (pelanggan: Pelanggan) => void;
}

function PelangganCardComponent({ pelanggan, onPress }: PelangganCardProps) {
  return (
    <Card onPress={() => onPress?.(pelanggan)}>
      <View style={styles.header}>
        <Text variant="h4" style={styles.nama}>
          {pelanggan.nama}
        </Text>
        <View style={[styles.badge, pelanggan.jenis_kelamin === 'Pria' ? styles.pria : styles.wanita]}>
          <Text variant="caption" style={styles.badgeText}>
            {pelanggan.jenis_kelamin}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text variant="caption" style={styles.infoLabel}>
            ID Pelanggan:
          </Text>
          <Text variant="caption" style={styles.infoValue}>
            {pelanggan.id_pelanggan}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text variant="caption" style={styles.infoLabel}>
            Domisili:
          </Text>
          <Text variant="caption" style={styles.infoValue}>
            {pelanggan.domisili}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  nama: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  pria: {
    backgroundColor: COLORS.info,
  },
  wanita: {
    backgroundColor: COLORS.warning,
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  infoContainer: {
    gap: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: COLORS.textLight,
    flex: 1,
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
});

export const PelangganCard = memo(PelangganCardComponent);
