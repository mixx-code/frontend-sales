import Text from '@/components/atoms/Text';
import PelangganForm from '@/components/organisms/PelangganForm';
import FormLayout from '@/components/templates/FormLayout';
import { createPelanggan, getPelangganById, updatePelanggan } from '@/lib/services';
import { CreatePelangganPayload, Pelanggan, UpdatePelangganPayload } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function PelangganFormScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEdit = !!id;
  const [initialData, setInitialData] = useState<Pelanggan | undefined>();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit Pelanggan' : 'Tambah Pelanggan'
    });
  }, [isEdit, navigation]);

  useEffect(() => {
    if (isEdit && id) {
      loadPelanggan();
    }
  }, [id, isEdit]);

  async function loadPelanggan() {
    try {
      const data = await getPelangganById(id as string);
      setInitialData(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data pelanggan');
      console.error(error);
      navigation.goBack();
    } finally {
      setFetchLoading(false);
    }
  }

  async function handleSubmit(data: CreatePelangganPayload | UpdatePelangganPayload) {
    setLoading(true);
    try {
      if (isEdit && id) {
        await updatePelanggan(id, data as UpdatePelangganPayload);
        Alert.alert('Success', 'Pelanggan berhasil diupdate');
      } else {
        await createPelanggan(data as CreatePelangganPayload);
        Alert.alert('Success', 'Pelanggan berhasil ditambahkan');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', isEdit ? 'Gagal mengupdate pelanggan' : 'Gagal menambahkan pelanggan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigation.goBack();
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
      <PelangganForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isEdit={isEdit}
      />
    </FormLayout>
  );
}
