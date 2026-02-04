import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { COLORS, SPACING } from '@/constants/theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Cari barang...', 
  onClear 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <Input
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        style={styles.input}
        onSubmitEditing={handleSearch}
      />
      {query ? (
        <Button
          title="Clear"
          onPress={handleClear}
          variant="secondary"
          size="small"
          style={styles.button}
        />
      ) : (
        <Button
          title="Cari"
          onPress={handleSearch}
          variant="primary"
          size="small"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.background,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
  },
  button: {
    minWidth: 60,
  },
});
