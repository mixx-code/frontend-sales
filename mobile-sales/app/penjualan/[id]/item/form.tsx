import Text from '@/components/atoms/Text';
import ItemPenjualanForm from '@/components/organisms/ItemPenjualanForm';
import FormLayout from '@/components/templates/FormLayout';
import { createItemPenjualan, getItemPenjualanById, updateItemPenjualan } from '@/lib/transaksiServices';
import { CreateItemPenjualanPayload, ItemPenjualan, UpdateItemPenjualanPayload } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function ItemPenjualanFormScreen() {
  const { id, kode_barang } = useLocalSearchParams<{ id: string; kode_barang?: string }>();
  const isEdit = !!kode_barang;
  const [initialData, setInitialData] = useState<ItemPenjualan | undefined>();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id && kode_barang) {
      loadItemPenjualan();
    }
  }, [id, kode_barang, isEdit]);

  async function loadItemPenjualan() {
    try {
      const data = await getItemPenjualanById(id as string, kode_barang as string);
      setInitialData(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data item penjualan');
      console.error(error);
      router.back();
    } finally {
      setFetchLoading(false);
    }
  }

  async function handleSubmit(data: CreateItemPenjualanPayload | UpdateItemPenjualanPayload) {
    setLoading(true);
    try {
      if (isEdit && id && kode_barang) {
        await updateItemPenjualan(id as string, kode_barang as string, data as UpdateItemPenjualanPayload);
        Alert.alert('Success', 'Item penjualan berhasil diupdate');
      } else {
        const createdItem = await createItemPenjualan(data as CreateItemPenjualanPayload);
        Alert.alert('Success', 'Item penjualan berhasil ditambahkan');
        console.log('Created item:', createdItem);
      }
      router.back();
    } catch (error) {
      Alert.alert('Error', isEdit ? 'Gagal mengupdate item penjualan' : 'Gagal menambahkan item penjualan');
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
      <ItemPenjualanForm
        initialData={initialData}
        nota={id as string}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isEdit={isEdit}
      />
    </FormLayout>
  );
}
