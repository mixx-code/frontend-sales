import { BORDER_RADIUS, COLORS, SPACING } from '@/constants/theme';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  error?: boolean;
}

export default function Input({ error, ...props }: InputProps) {
  return (
    <TextInput
      style={[
        styles.input,
        error && styles.inputError,
        props.style
      ]}
      placeholderTextColor={COLORS.textLight}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
});
