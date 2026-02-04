import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import Text from '@/components/atoms/Text';
import { PelangganCard } from '@/components/molecules/PelangganCard';
import MainLayout from '@/components/templates/MainLayout';
import { SPACING } from '@/constants/theme';
import { deletePelanggan, getPelangganById } from '@/lib/services';
import { Pelanggan } from '@/types';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function PelangganDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pelanggan, setPelanggan] = useState<Pelanggan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: 'Detail Pelanggan'
    });
  }, [navigation]);

  useEffect(() => {
    loadPelanggan();
  }, [id]);

  async function loadPelanggan() {
    try {
      const data = await getPelangganById(id);
      console.log(data);
      setPelanggan(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data pelanggan');
      console.error(error);
      router.back();
    } finally {
      setLoading(false);
    }
  }

  function handleEdit() {
    if (pelanggan) {
      router.push({
        pathname: '/pelanggan/form' as any,
        params: { id: pelanggan.id_pelanggan }
      } as any);
    }
  }

  function handleDelete() {
    if (!pelanggan) return;

    Alert.alert(
      'Hapus Pelanggan',
      `Apakah Anda yakin ingin menghapus ${pelanggan.nama}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePelanggan(pelanggan.id_pelanggan);
              Alert.alert('Success', 'Pelanggan berhasil dihapus');
              router.back();
            } catch (error: any) {
              if (error?.message?.includes('foreign key constraint') || 
                  error?.message?.includes('Cannot delete or update a parent row') ||
                  error?.response?.data?.message?.includes('terhubung') ||
                  error?.response?.data?.message?.includes('referenced')) {
                Alert.alert(
                  'Tidak Dapat Menghapus',
                  `Pelanggan "${pelanggan.nama}" masih terhubung dengan data penjualan.\n\nHapus data penjualan terlebih dahulu.`,
                  [{ text: 'OK', style: 'default' }]
                );
              } else {
                Alert.alert('Error', 'Gagal menghapus pelanggan. Silakan coba lagi.');
              }
            }
          }
        }
      ]
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (!pelanggan) {
    return (
      <MainLayout>
        <Text variant="h3" style={styles.errorText}>
          Pelanggan tidak ditemukan
        </Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Text variant="h2" style={styles.title}>
        Detail Pelanggan
      </Text>

      <PelangganCard pelanggan={pelanggan} />

      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={handleEdit}
          variant="secondary"
          style={styles.button}
        />
        <Button
          title="Hapus"
          onPress={handleDelete}
          variant="danger"
          style={styles.button}
        />
      </View>
    </MainLayout>
  );
}

const styles = {
  title: {
    marginBottom: SPACING.md,
    textAlign: 'center' as const,
  },
  buttonContainer: {
    flexDirection: 'row' as const,
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center' as const,
    marginTop: SPACING.xxl,
  },
};
