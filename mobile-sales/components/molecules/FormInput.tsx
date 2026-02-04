import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Text from '../atoms/Text';
import Input from '../atoms/Input';
import { COLORS, SPACING } from '@/constants/theme';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  editable?: boolean;
}

export default function FormInput({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  error,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text variant="small" style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={!!error}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
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
    marginBottom: SPACING.xs,
    color: COLORS.text,
  },
  required: {
    color: COLORS.danger,
  },
  error: {
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});
