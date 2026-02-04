import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

        <Stack.Screen
          name="pelanggan/form"
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen
          name="pelanggan/[id]"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="penjualan/form"
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen
          name="penjualan/[id]"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="barang/form"
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen
          name="barang/[id]"
          options={{
            headerShown: true
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}