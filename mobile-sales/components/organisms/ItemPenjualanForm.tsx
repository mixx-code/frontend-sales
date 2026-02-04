import { COLORS, SPACING } from '@/constants/theme';
import { Barang, CreateItemPenjualanPayload, ItemPenjualan, UpdateItemPenjualanPayload } from '@/types';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import BarangSelector from '../molecules/BarangSelector';
import FormInput from '../molecules/FormInput';

interface ItemPenjualanFormProps {
  initialData?: ItemPenjualan;
  nota: string;
  onSubmit: (data: CreateItemPenjualanPayload | UpdateItemPenjualanPayload) => void;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export default function ItemPenjualanForm({ 
  initialData, 
  nota,
  onSubmit, 
  onCancel, 
  loading = false,
  isEdit = false
}: ItemPenjualanFormProps) {
  const [formData, setFormData] = useState({
    nota: nota,
    kode_barang: initialData?.kode_barang || '',
    qty: initialData?.qty || 1,
  });
  
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.kode_barang.trim()) {
      newErrors.kode_barang = 'Kode Barang wajib diisi';
    }
    if (!formData.qty || formData.qty <= 0) {
      newErrors.qty = 'Qty harus lebih dari 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const submitData = isEdit 
        ? {
            qty: formData.qty,
          }
        : {
            nota: formData.nota,
            kode_barang: formData.kode_barang,
            qty: formData.qty,
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

  const showProductSearch = () => {
    Alert.alert('Info', 'Product search akan diimplementasikan dengan modal atau autocomplete');
  };

  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        {isEdit ? 'Edit Item Penjualan' : 'Tambah Item Penjualan'}
      </Text>

      {!isEdit && (
        <FormInput
          label="Nota"
          value={formData.nota}
          onChangeText={() => {}}
          editable={false}
        />
      )}

      <BarangSelector
        selectedKodeBarang={formData.kode_barang}
        onBarangSelected={(barang: Barang) => {
          setSelectedBarang(barang);
          updateFormData('kode_barang', barang.kode);
        }}
        error={errors.kode_barang}
        required
      />

      <FormInput
        label="Quantity"
        value={formData.qty.toString()}
        onChangeText={(value) => updateFormData('qty', parseInt(value) || 0)}
        placeholder="Masukkan quantity"
        keyboardType="numeric"
        error={errors.qty}
        required
      />

      <View style={styles.infoContainer}>
        <Text variant="caption" style={styles.infoText}>
          💡 Subtotal akan dihitung otomatis berdasarkan harga barang × quantity
        </Text>
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
          title={isEdit ? 'Update' : 'Tambah'}
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
  infoContainer: {
    backgroundColor: COLORS.info,
    padding: SPACING.sm,
    borderRadius: 8,
    marginVertical: SPACING.md,
  },
  infoText: {
    color: COLORS.white,
    textAlign: 'center',
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
