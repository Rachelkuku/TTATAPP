import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { MD3 } from '../../constants/colors';

type Variant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated';

interface M3ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const M3Button: React.FC<M3ButtonProps> = ({
  label,
  onPress,
  variant = 'filled',
  icon,
  disabled,
  loading,
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'filled' ? MD3.onPrimary : MD3.primary} />
      ) : (
        <View style={styles.inner}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.label, styles[`${variant}Label`], labelStyle]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  inner: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  label: { fontSize: 14, fontWeight: '600', letterSpacing: 0.1 },
  // Filled
  filled: { backgroundColor: MD3.primary, elevation: 0 },
  filledLabel: { color: MD3.onPrimary },
  // Tonal (Filled Tonal)
  tonal: { backgroundColor: MD3.primaryContainer, elevation: 0 },
  tonalLabel: { color: MD3.onPrimaryContainer },
  // Outlined
  outlined: { borderWidth: 1, borderColor: MD3.outline, backgroundColor: 'transparent' },
  outlinedLabel: { color: MD3.primary },
  // Text
  text: { backgroundColor: 'transparent' },
  textLabel: { color: MD3.primary },
  // Elevated
  elevated: {
    backgroundColor: MD3.surfaceTonal1,
    elevation: 2,
    shadowColor: MD3.scrim,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  elevatedLabel: { color: MD3.primary },
  // Disabled
  disabled: { opacity: 0.38 },
});
