import { Pressable, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants/theme';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export default function RadioButton({ 
  label, 
  selected, 
  onPress, 
  disabled = false 
}: RadioButtonProps) {
  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
  },
  labelDisabled: {
    color: COLORS.textLight,
  },
});
