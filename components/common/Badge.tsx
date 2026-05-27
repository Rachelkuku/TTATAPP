import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MD3 } from '../../constants/colors';

interface BadgeProps {
  label: string;
  color?: string;
  bgColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = MD3.onPrimaryContainer,
  bgColor = MD3.primaryContainer,
}) => (
  <View style={[styles.badge, { backgroundColor: bgColor }]}>
    <Text style={[styles.label, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
