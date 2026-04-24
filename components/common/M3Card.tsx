import React from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { MD3 } from '../../constants/colors';

type Variant = 'elevated' | 'filled' | 'outlined';

interface M3CardProps {
  children: React.ReactNode;
  variant?: Variant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const M3Card: React.FC<M3CardProps> = ({
  children,
  variant = 'elevated',
  onPress,
  style,
}) => {
  const cardStyle = [styles.base, styles[variant], style];
  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.82}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: MD3.surfaceTonal1,
    elevation: 2,
    shadowColor: MD3.scrim,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  filled: {
    backgroundColor: MD3.surfaceVariant,
    elevation: 0,
  },
  outlined: {
    backgroundColor: MD3.surface,
    borderWidth: 1,
    borderColor: MD3.outlineVariant,
    elevation: 0,
  },
});
