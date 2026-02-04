import { View, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

export default function Card({ children, onPress, style }: CardProps) {
  const Component = onPress ? Pressable : View;
  
  return (
    <Component 
      style={[styles.card, style]} 
      onPress={onPress}
      android_ripple={onPress ? { color: 'rgba(0,0,0,0.05)' } : undefined}
    >
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
