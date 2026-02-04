import { COLORS } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface DatePickerProps {
  label: string;
  value: string;
  onDateChange: (date: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function DatePicker({ 
  label, 
  value, 
  onDateChange,
  error,
  required = false,
  disabled = false
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(() => {
    return value ? new Date(value) : new Date();
  });

  const showDatePicker = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onDateChange(formattedDate);
    }
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return 'Pilih tanggal';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <Pressable
        style={[styles.input, error && styles.inputError, disabled && styles.inputDisabled]}
        onPress={showDatePicker}
        disabled={disabled}
      >
        <Text style={[styles.inputText, disabled && styles.inputTextDisabled]}>
          {formatDateDisplay(value)}
        </Text>
        <Text style={styles.placeholder}>📅</Text>
      </Pressable>
      
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()}
          style={styles.dateTimePicker}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: COLORS.text,
  },
  required: {
    color: '#FF3B30',
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
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  inputTextDisabled: {
    color: COLORS.textLight,
  },
  placeholder: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  dateTimePicker: {
    marginTop: 10,
  },
});
