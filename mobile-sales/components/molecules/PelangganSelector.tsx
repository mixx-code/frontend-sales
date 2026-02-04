import { COLORS } from '@/constants/theme';
import { getPelanggan } from '@/lib/services';
import { Pelanggan } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface PelangganSelectorProps {
  selectedKodePelanggan?: string;
  onPelangganSelected: (pelanggan: Pelanggan) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function PelangganSelector({
  selectedKodePelanggan,
  onPelangganSelected,
  placeholder = 'Pilih pelanggan...',
  error,
  required = false,
  disabled = false,
}: PelangganSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPelanggan, setSelectedPelanggan] = useState<Pelanggan | null>(null);

  useEffect(() => {
    loadPelanggan();
  }, []);

  useEffect(() => {
    if (selectedKodePelanggan && pelangganList.length > 0) {
      const pelanggan = pelangganList.find(p => p.id_pelanggan === selectedKodePelanggan);
      setSelectedPelanggan(pelanggan || null);
    }
  }, [selectedKodePelanggan, pelangganList]);

  async function loadPelanggan() {
    try {
      setLoading(true);
      const response = await getPelanggan();
      setPelangganList(response.data.data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data pelanggan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectPelanggan(pelanggan: Pelanggan) {
    setSelectedPelanggan(pelanggan);
    onPelangganSelected(pelanggan);
    setShowDropdown(false);
  }

  function renderPelangganItem({ item }: { item: Pelanggan }) {
    return (
      <Pressable
        style={styles.item}
        onPress={() => handleSelectPelanggan(item)}
      >
        <Text style={styles.kode}>{item.id_pelanggan}</Text>
        <Text style={styles.nama}>{item.nama}</Text>
        <Text style={styles.domisili}>{item.domisili}</Text>
      </Pressable>
    );
  }

  const displayText = selectedPelanggan 
    ? `${selectedPelanggan.id_pelanggan} - ${selectedPelanggan.nama}`
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
          ) : pelangganList.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Belum ada data pelanggan</Text>
            </View>
          ) : (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {pelangganList.map((item: Pelanggan) => (
                <Pressable
                  key={item.id_pelanggan}
                  style={styles.item}
                  onPress={() => handleSelectPelanggan(item)}
                >
                  <Text style={styles.kode}>{item.id_pelanggan}</Text>
                  <Text style={styles.nama}>{item.nama}</Text>
                  <Text style={styles.domisili}>{item.domisili}</Text>
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
  domisili: {
    color: COLORS.textLight,
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
