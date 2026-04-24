import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MD3 } from '../../constants/colors';

interface M3ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const M3Chip: React.FC<M3ChipProps> = ({ label, selected, onPress, icon }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {icon && <View style={styles.icon}>{icon}</View>}
    <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: MD3.outlineVariant,
    backgroundColor: MD3.surface,
  },
  chipSelected: {
    backgroundColor: MD3.primaryContainer,
    borderColor: MD3.primaryContainer,
  },
  icon: { marginRight: 6 },
  label: { fontSize: 14, fontWeight: '500', color: MD3.onSurfaceVariant, letterSpacing: 0.1 },
  labelSelected: { color: MD3.onPrimaryContainer, fontWeight: '600' },
});
