import { View, StyleSheet } from 'react-native';
import Text from '../atoms/Text';
import RadioButton from '../atoms/RadioButton';
import { SPACING } from '@/constants/theme';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function RadioGroup({
  label,
  options,
  selectedValue,
  onValueChange,
  required = false,
  error,
  disabled = false,
}: RadioGroupProps) {
  return (
    <View style={styles.container}>
      <Text variant="body" style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <View style={styles.radioContainer}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onPress={() => onValueChange(option.value)}
            disabled={disabled}
          />
        ))}
      </View>
      
      {error && (
        <Text variant="caption" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    marginBottom: SPACING.sm,
    fontSize: 16,
    fontWeight: '500',
  },
  required: {
    color: '#FF3B30',
  },
  radioContainer: {
    paddingLeft: SPACING.xs,
  },
  error: {
    color: '#FF3B30',
    marginTop: SPACING.xs,
  },
});
