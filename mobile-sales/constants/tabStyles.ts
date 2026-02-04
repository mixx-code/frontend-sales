import { StyleSheet } from 'react-native';
import { SPACING } from './theme';

export const tabScreenStyles = StyleSheet.create({
  header: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  title: {
    marginBottom: SPACING.md,
    textAlign: 'center' as const,
  },
  addButton: {
    marginBottom: SPACING.md,
  },
});
