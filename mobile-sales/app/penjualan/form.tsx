import Text from '@/components/atoms/Text';
import PenjualanForm from '@/components/organisms/PenjualanForm';
import FormLayout from '@/components/templates/FormLayout';
import { createPenjualan, getPenjualanById, updatePenjualan } from '@/lib/transaksiServices';
import { CreatePenjualanPayload, Penjualan, UpdatePenjualanPayload } from '@/types';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function PenjualanFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEdit = !!id;
  const [initialData, setInitialData] = useState<Penjualan | undefined>();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit Penjualan' : 'Tambah Penjualan'
    });
  }, [navigation]);

  useEffect(() => {
    if (isEdit && id) {
      loadPenjualan();
    }
  }, [id, isEdit]);

  async function loadPenjualan() {
    try {
      const data = await getPenjualanById(id as string);
      setInitialData(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data penjualan');
      console.error(error);
      router.back();
    } finally {
      setFetchLoading(false);
    }
  }

  async function handleSubmit(data: CreatePenjualanPayload | UpdatePenjualanPayload) {
    setLoading(true);
    try {
      if (isEdit && id) {
        await updatePenjualan(id, data as UpdatePenjualanPayload);
        Alert.alert('Success', 'Penjualan berhasil diupdate');
      } else {
        await createPenjualan(data as CreatePenjualanPayload);
        Alert.alert('Success', 'Penjualan berhasil ditambahkan');
      }
      router.back();
    } catch (error) {
      Alert.alert('Error', isEdit ? 'Gagal mengupdate penjualan' : 'Gagal menambahkan penjualan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.back();
  }

  if (fetchLoading) {
    return (
      <FormLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <PenjualanForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isEdit={isEdit}
      />
    </FormLayout>
  );
}
