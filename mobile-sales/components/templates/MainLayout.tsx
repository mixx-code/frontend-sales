import { COLORS } from '@/constants/theme';
import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
  backgroundColor?: string;
}

export default function MainLayout({ 
  children, 
  scrollable = true,
  backgroundColor = COLORS.background 
}: MainLayoutProps) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {scrollable ? (
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});
