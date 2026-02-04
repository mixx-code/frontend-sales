import { COLORS, SPACING } from '@/constants/theme';
import { CreatePenjualanPayload, Pelanggan, Penjualan, UpdatePenjualanPayload } from '@/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import DatePicker from '../atoms/DatePicker';
import Text from '../atoms/Text';
import FormInput from '../molecules/FormInput';
import PelangganSelector from '../molecules/PelangganSelector';

interface PenjualanFormProps {
  initialData?: Penjualan;
  onSubmit: (data: CreatePenjualanPayload | UpdatePenjualanPayload) => void;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export default function PenjualanForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false,
  isEdit = false
}: PenjualanFormProps) {
  const [formData, setFormData] = useState({
    id_nota: initialData?.id_nota || '',
    tgl: initialData?.tgl || new Date().toISOString().split('T')[0],
    kode_pelanggan: initialData?.kode_pelanggan || '',
    subtotal: initialData?.subtotal || 0,
  });
  
  const [selectedPelanggan, setSelectedPelanggan] = useState<Pelanggan | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!isEdit && !formData.id_nota.trim()) {
      newErrors.id_nota = 'ID Nota wajib diisi';
    }
    if (!formData.tgl.trim()) {
      newErrors.tgl = 'Tanggal wajib diisi';
    }
    if (!formData.kode_pelanggan.trim()) {
      newErrors.kode_pelanggan = 'Kode Pelanggan wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const submitData = isEdit 
        ? {
            tgl: formData.tgl,
            kode_pelanggan: formData.kode_pelanggan,
            subtotal: formData.subtotal,
          }
        : {
            id_nota: formData.id_nota,
            tgl: formData.tgl,
            kode_pelanggan: formData.kode_pelanggan,
            subtotal: formData.subtotal,
          };
      
      onSubmit(submitData);
    }
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        {isEdit ? 'Edit Penjualan' : 'Tambah Penjualan'}
      </Text>

      {!isEdit && (
        <FormInput
          label="ID Nota"
          value={formData.id_nota}
          onChangeText={(value) => updateFormData('id_nota', value)}
          placeholder="Masukkan ID Nota"
          error={errors.id_nota}
          required
        />
      )}

      <DatePicker
        label="Tanggal"
        value={formData.tgl}
        onDateChange={(date) => updateFormData('tgl', date)}
        error={errors.tgl}
        required
      />

      <Text variant="body" style={styles.label}>
        Kode Pelanggan <Text style={styles.required}>*</Text>
      </Text>
      <PelangganSelector
        selectedKodePelanggan={formData.kode_pelanggan}
        onPelangganSelected={(pelanggan: Pelanggan) => {
          setSelectedPelanggan(pelanggan);
          updateFormData('kode_pelanggan', pelanggan.id_pelanggan);
        }}
        error={errors.kode_pelanggan}
        required
      />

      <FormInput
        label="Subtotal"
        value={formData.subtotal.toString()}
        onChangeText={(value) => updateFormData('subtotal', parseInt(value) || 0)}
        placeholder="0"
        keyboardType="numeric"
        editable={false} // Auto-calculated from items
      />

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
    marginBottom: 8,
    color: COLORS.text,
    fontWeight: '500',
  },
  required: {
    color: '#FF3B30',
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
