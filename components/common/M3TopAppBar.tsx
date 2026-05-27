import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../constants/colors';

interface M3TopAppBarProps {
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  variant?: 'small' | 'medium' | 'large';
}

export const M3TopAppBar: React.FC<M3TopAppBarProps> = ({
  title,
  onBack,
  actions,
  variant = 'small',
}) => {
  if (variant === 'large') {
    return (
      <View style={styles.largeBar}>
        <View style={styles.row}>
          {onBack && (
            <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
              <Ionicons name="arrow-back" size={24} color={MD3.onSurface} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          {actions}
        </View>
        <Text style={styles.largeTitle}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.smallBar}>
      {onBack && (
        <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={MD3.onSurface} />
        </TouchableOpacity>
      )}
      <Text style={styles.smallTitle} numberOfLines={1}>{title}</Text>
      <View style={styles.actions}>{actions}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MD3.surface,
    paddingHorizontal: 4,
    paddingVertical: 4,
    height: 64,
  },
  largeBar: {
    backgroundColor: MD3.surface,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 28,
  },
  row: { flexDirection: 'row', alignItems: 'center', height: 64, paddingHorizontal: 4 },
  iconBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  smallTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '500',
    color: MD3.onSurface,
    marginLeft: 4,
  },
  largeTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: MD3.onSurface,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  actions: { flexDirection: 'row' },
});
