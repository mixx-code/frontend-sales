import { COLORS } from '@/constants/theme';
import { getBarang } from '@/lib/barangServices';
import { Barang } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface BarangSelectorProps {
  selectedKodeBarang?: string;
  onBarangSelected: (barang: Barang) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function BarangSelector({
  selectedKodeBarang,
  onBarangSelected,
  placeholder = 'Pilih barang...',
  error,
  required = false,
  disabled = false,
}: BarangSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);

  useEffect(() => {
    loadBarang();
  }, []);

  useEffect(() => {
    if (selectedKodeBarang && barangList.length > 0) {
      const barang = barangList.find(b => b.kode === selectedKodeBarang);
      setSelectedBarang(barang || null);
    }
  }, [selectedKodeBarang, barangList]);

  async function loadBarang() {
    try {
      setLoading(true);
      const response = await getBarang();
      setBarangList(response.data.data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data barang');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectBarang(barang: Barang) {
    setSelectedBarang(barang);
    onBarangSelected(barang);
    setShowDropdown(false);
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function renderBarangItem({ item }: { item: Barang }) {
    return (
      <Pressable
        style={styles.item}
        onPress={() => handleSelectBarang(item)}
      >
        <Text style={styles.kode}>{item.kode}</Text>
        <Text style={styles.nama}>{item.nama}</Text>
        <Text style={styles.harga}>{formatCurrency(item.harga)}</Text>
      </Pressable>
    );
  }

  const displayText = selectedBarang 
    ? `${selectedBarang.kode} - ${selectedBarang.nama}`
    : placeholder;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.input, error && styles.inputError, disabled && styles.inputDisabled]}
        onPress={() => !disabled && setShowDropdown(!showDropdown)}
        disabled={disabled}
      >
        <Text style={[styles.inputText, disabled && styles.inputTextDisabled]}>
          {displayText}
        </Text>
        <Text style={styles.arrow}>{showDropdown ? '▲' : '▼'}</Text>
      </Pressable>
      
      {showDropdown && (
        <View style={styles.dropdown}>
          {loading ? (
            <Text style={styles.loading}>Loading...</Text>
          ) : barangList.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Belum ada data barang</Text>
            </View>
          ) : (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {barangList.map((item: Barang) => (
                <Pressable
                  key={item.kode}
                  style={styles.item}
                  onPress={() => handleSelectBarang(item)}
                >
                  <Text style={styles.kode}>{item.kode}</Text>
                  <Text style={styles.nama}>{item.nama}</Text>
                  <Text style={styles.harga}>{formatCurrency(item.harga)}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      )}
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  inputDisabled: {
    backgroundColor: COLORS.gray[100],
    opacity: 0.5,
  },
  inputText: {
    flex: 1,
    color: COLORS.text,
  },
  inputTextDisabled: {
    color: COLORS.textLight,
  },
  arrow: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loading: {
    textAlign: 'center',
    padding: 20,
    color: COLORS.textLight,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  kode: {
    fontWeight: '600',
    color: COLORS.primary,
    flex: 1,
  },
  nama: {
    color: COLORS.text,
    flex: 2,
  },
  harga: {
    color: COLORS.success,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: COLORS.textLight,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
