import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../constants/colors';
import { useAuthStore } from '../../store/useAuthStore';

// 공통 상단바 — 좌: 로고, 우: 알림 벨 + 프로필/로그인
// 알림 벨은 공사·점검 탭으로 이동(스펙 §7: 알림 화면 위치 미정, 임시 매핑)
export const TopBar: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { isLoggedIn } = useAuthStore();

  return (
    <View style={styles.safeTop}>
      <View style={styles.bar}>
        <View style={styles.left}>
          {onBack ? (
            <TouchableOpacity style={styles.backBtn} onPress={onBack} hitSlop={8}>
              <Ionicons name="chevron-back" size={24} color={MD3.onSurface} />
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.logoTile}>
                <Ionicons name="business" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.logoText}>무역센터</Text>
            </>
          )}
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.iconBtn}
            hitSlop={8}
            onPress={() => router.push('/(tabs)/notice' as any)}
          >
            <Ionicons name="notifications-outline" size={22} color={MD3.onSurface} />
            <View style={styles.dot} />
          </TouchableOpacity>

          {isLoggedIn ? (
            <TouchableOpacity style={styles.avatarBtn} hitSlop={8} onPress={() => router.push('/my' as any)}>
              <Ionicons name="person" size={18} color={MD3.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginBtn} hitSlop={8} onPress={() => router.push('/my' as any)}>
              <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeTop: {
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 0 : 0,
    backgroundColor: Tokens.bg,
  },
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Tokens.bg,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: Tokens.minTouch },
  backBtn: {
    width: Tokens.minTouch,
    height: Tokens.minTouch,
    marginLeft: -12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTile: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: MD3.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { fontSize: 17, fontWeight: '700', color: Tokens.text },
  right: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: {
    width: Tokens.minTouch,
    height: Tokens.minTouch,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: MD3.error,
  },
  avatarBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: MD3.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    minHeight: Tokens.minTouch,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: { fontSize: 15, fontWeight: '700', color: MD3.primary },
});
