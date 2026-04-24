import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MD3 } from '../../constants/colors';

interface SectionHeaderProps {
  title: string;
  onMore?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onMore }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {onMore && (
      <TouchableOpacity onPress={onMore} style={styles.moreBtn}>
        <Text style={styles.moreText}>전체보기</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: MD3.onSurface,
  },
  moreBtn: { paddingVertical: 4, paddingHorizontal: 4 },
  moreText: {
    fontSize: 13,
    color: MD3.primary,
    fontWeight: '500',
  },
});
