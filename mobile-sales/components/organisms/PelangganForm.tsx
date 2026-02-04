import { SPACING } from '@/constants/theme';
import { CreatePelangganPayload, Pelanggan, UpdatePelangganPayload } from '@/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import RadioButton from '../atoms/RadioButton';
import Text from '../atoms/Text';
import FormInput from '../molecules/FormInput';

interface PelangganFormProps {
  initialData?: Pelanggan;
  onSubmit: (data: CreatePelangganPayload | UpdatePelangganPayload) => void;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export default function PelangganForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false,
  isEdit = false
}: PelangganFormProps) {
  const [formData, setFormData] = useState({
    id_pelanggan: initialData?.id_pelanggan || '',
    nama: initialData?.nama || '',
    domisili: initialData?.domisili || '',
    jenis_kelamin: initialData?.jenis_kelamin || 'Pria' as 'Pria' | 'Wanita',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!isEdit && !formData.id_pelanggan.trim()) {
      newErrors.id_pelanggan = 'ID Pelanggan wajib diisi';
    }
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    }
    if (!formData.domisili.trim()) {
      newErrors.domisili = 'Domisili wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const submitData = isEdit 
        ? {
            nama: formData.nama,
            domisili: formData.domisili,
            jenis_kelamin: formData.jenis_kelamin,
          }
        : formData;
      
      onSubmit(submitData);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        {isEdit ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
      </Text>

      {!isEdit && (
        <FormInput
          label="ID Pelanggan"
          value={formData.id_pelanggan}
          onChangeText={(value) => updateFormData('id_pelanggan', value)}
          placeholder="Masukkan ID Pelanggan"
          error={errors.id_pelanggan}
          required
        />
      )}

      <FormInput
        label="Nama"
        value={formData.nama}
        onChangeText={(value) => updateFormData('nama', value)}
        placeholder="Masukkan nama pelanggan"
        error={errors.nama}
        required
      />

      <FormInput
        label="Domisili"
        value={formData.domisili}
        onChangeText={(value) => updateFormData('domisili', value)}
        placeholder="Masukkan domisili pelanggan"
        error={errors.domisili}
        required
      />

      <View style={styles.jenisKelaminContainer}>
        <Text style={styles.label}>Jenis Kelamin *</Text>
        <View style={styles.radioContainer}>
          <View style={styles.radioOption}>
            <RadioButton
              label="Pria"
              selected={formData.jenis_kelamin?.toLowerCase() === 'pria'}
              onPress={() => updateFormData('jenis_kelamin', 'Pria')}
            />
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              label="Wanita"
              selected={formData.jenis_kelamin?.toLowerCase() === 'wanita'}
              onPress={() => updateFormData('jenis_kelamin', 'Wanita')}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Batal"
          onPress={onCancel}
          variant="secondary"
          style={styles.button}
          disabled={loading}
        />
        <Button
          title={isEdit ? 'Update' : 'Simpan'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  title: {
    marginBottom: SPACING.lg,
    textAlign: 'center' as const,
  },
  label: {
    marginBottom: SPACING.sm,
    fontSize: 16,
    fontWeight: '500',
  },
  jenisKelaminContainer: {
    marginBottom: SPACING.md,
  },
  radioContainer: {
    paddingLeft: SPACING.xs,
  },
  radioOption: {
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
  },
});
