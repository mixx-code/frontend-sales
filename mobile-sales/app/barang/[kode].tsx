import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import Text from '@/components/atoms/Text';
import MainLayout from '@/components/templates/MainLayout';
import { COLORS, SPACING } from '@/constants/theme';
import { getBarangById } from '@/lib/barangServices';
import { Barang } from '@/types';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function BarangDetailScreen() {
  const [barang, setBarang] = useState<Barang | null>(null);
  const [loading, setLoading] = useState(true);
  const { kode } = useLocalSearchParams<{ kode: string }>();
  const navigation = useNavigation();
  

  useEffect(() => {
    navigation.setOptions({
      title: 'Detail Barang'
    });
  }, [navigation]);

  useEffect(() => {
    loadBarang();
  }, [kode]);

  const loadBarang = async () => {
    if (!kode) return;
    
    try {
      setLoading(true);
      const data = await getBarangById(kode);
      setBarang(data);
    } catch (error) {
      console.error('Error loading barang:', error);
      Alert.alert('Error', 'Gagal memuat data barang');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push({
      pathname: '/barang/edit/[kode]',
      params: { kode }
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      </MainLayout>
    );
  }

  if (!barang) {
    return (
      <MainLayout>
        <View style={styles.errorContainer}>
          <Text variant="body" style={styles.errorText}>
            Data barang tidak ditemukan
          </Text>
          <Button title="Kembali" onPress={handleBack} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>Detail Barang</Text>
          <Button
            title="Edit"
            onPress={handleEdit}
            variant="primary"
            style={styles.editButton}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text variant="body" style={styles.label}>Kode Barang:</Text>
            <Text variant="body" style={styles.value}>{barang.kode}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="body" style={styles.label}>Nama Barang:</Text>
            <Text variant="body" style={styles.value}>{barang.nama}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="body" style={styles.label}>Kategori:</Text>
            <Text variant="body" style={styles.value}>{barang.kategori}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="body" style={styles.label}>Harga:</Text>
            <Text variant="h3" style={styles.price}>
              Rp {barang.harga.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Kembali"
            onPress={handleBack}
            variant="secondary"
            style={styles.button}
          />
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: SPACING.lg,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: SPACING.md,
    color: COLORS.textLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
  },
  editButton: {
    minWidth: 80,
  },
  content: {
    flex: 1,
    paddingVertical: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    flex: 1,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  value: {
    flex: 2,
    textAlign: 'right',
    color: COLORS.text,
  },
  price: {
    flex: 2,
    textAlign: 'right',
    color: COLORS.success,
    fontWeight: '700',
  },
  actions: {
    paddingTop: SPACING.lg,
  },
  button: {
    width: '100%',
  },
});
