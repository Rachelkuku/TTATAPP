import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../constants/colors';

// 비회원 잠금 안내 — 자물쇠 아이콘 + 안내문 (+선택적 로그인 버튼)
export const LockNotice: React.FC<{ message: string; showButton?: boolean; compact?: boolean }> = ({
  message,
  showButton,
  compact,
}) => (
  <View style={[styles.box, compact && styles.boxCompact]}>
    <Ionicons name="lock-closed" size={16} color={MD3.onSurfaceVariant} />
    <Text style={styles.text}>{message}</Text>
    {showButton && (
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/my' as any)} hitSlop={8}>
        <Text style={styles.btnText}>로그인</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: MD3.surfaceVariant,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: Tokens.minTouch,
  },
  boxCompact: { paddingVertical: 10 },
  text: { flex: 1, fontSize: 13, color: MD3.onSurfaceVariant, lineHeight: 18 },
  btn: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: MD3.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
});
