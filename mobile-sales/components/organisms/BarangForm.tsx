import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import FormInput from '../molecules/FormInput';
import { Barang, CreateBarangPayload, UpdateBarangPayload } from '@/types';
import { COLORS, SPACING } from '@/constants/theme';

interface BarangFormProps {
  barang?: Barang;
  onSubmit: (data: CreateBarangPayload | UpdateBarangPayload) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export default function BarangForm({ 
  barang, 
  onSubmit, 
  onCancel, 
  loading = false,
  isEdit = false 
}: BarangFormProps) {
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    kategori: '',
    harga: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (barang && isEdit) {
      setFormData({
        kode: barang.kode,
        nama: barang.nama,
        kategori: barang.kategori,
        harga: barang.harga.toString(),
      });
    }
  }, [barang, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!isEdit && !formData.kode.trim()) {
      newErrors.kode = 'Kode barang wajib diisi';
    }

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama barang wajib diisi';
    }

    if (!formData.kategori.trim()) {
      newErrors.kategori = 'Kategori wajib diisi';
    }

    if (!formData.harga.trim()) {
      newErrors.harga = 'Harga wajib diisi';
    } else if (isNaN(Number(formData.harga)) || Number(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus berupa angka positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const submitData = isEdit 
        ? {
            nama: formData.nama.trim(),
            kategori: formData.kategori.trim(),
            harga: Number(formData.harga),
          } as UpdateBarangPayload
        : {
            kode: formData.kode.trim(),
            nama: formData.nama.trim(),
            kategori: formData.kategori.trim(),
            harga: Number(formData.harga),
          } as CreateBarangPayload;

      await onSubmit(submitData);
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data barang');
    }
  };

  const handleCancel = () => {
    if (loading) return;
    
    const hasChanges = isEdit 
      ? barang?.nama !== formData.nama.trim() ||
        barang?.kategori !== formData.kategori.trim() ||
        barang?.harga !== Number(formData.harga)
      : Object.values(formData).some(value => value.trim() !== '');

    if (hasChanges) {
      Alert.alert(
        'Batalkan',
        'Perubahan akan hilang. Apakah Anda yakin?',
        [
          {
            text: 'Tidak',
            style: 'cancel',
          },
          {
            text: 'Ya',
            style: 'destructive',
            onPress: onCancel,
          },
        ]
      );
    } else {
      onCancel();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text variant="h2" style={styles.title}>
          {isEdit ? 'Edit Barang' : 'Tambah Barang'}
        </Text>

        {!isEdit && (
          <FormInput
            label="Kode Barang"
            value={formData.kode}
            onChangeText={(text) => setFormData({ ...formData, kode: text })}
            placeholder="Masukkan kode barang"
            error={errors.kode}
            required
            editable={!loading}
          />
        )}

        <FormInput
          label="Nama Barang"
          value={formData.nama}
          onChangeText={(text) => setFormData({ ...formData, nama: text })}
          placeholder="Masukkan nama barang"
          error={errors.nama}
          required
          editable={!loading}
        />

        <FormInput
          label="Kategori"
          value={formData.kategori}
          onChangeText={(text) => setFormData({ ...formData, kategori: text })}
          placeholder="Masukkan kategori barang"
          error={errors.kategori}
          required
          editable={!loading}
        />

        <FormInput
          label="Harga"
          value={formData.harga}
          onChangeText={(text) => setFormData({ ...formData, harga: text })}
          placeholder="Masukkan harga barang"
          error={errors.harga}
          required
          keyboardType="numeric"
          editable={!loading}
        />

        <View style={styles.actions}>
          <Button
            title="Batal"
            onPress={handleCancel}
            variant="secondary"
            disabled={loading}
            style={styles.button}
          />
          <Button
            title={isEdit ? 'Update' : 'Simpan'}
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: SPACING.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  button: {
    flex: 1,
  },
});
