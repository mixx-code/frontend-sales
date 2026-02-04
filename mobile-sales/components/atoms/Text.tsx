import { Text as RNText, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@/constants/theme';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export default function Text({ 
  children, 
  variant = 'body', 
  color = COLORS.text,
  style,
  numberOfLines
}: TextProps) {
  return (
    <RNText 
      style={[
        { color },
        TYPOGRAPHY[variant],
        style
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}
