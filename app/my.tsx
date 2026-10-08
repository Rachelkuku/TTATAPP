import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../constants/colors';
import { TopBar } from '../components/common/TopBar';
import { M3Card } from '../components/common/M3Card';
import { M3Button } from '../components/common/M3Button';
import { M3TextField } from '../components/common/M3TextField';
import { useAuthStore } from '../store/useAuthStore';

export default function MyScreen() {
  const { user, isLoggedIn, isLoading, login, logout } = useAuthStore();
  const [kakaoWeekly, setKakaoWeekly] = useState(true);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = async () => {
    if (!id || !pw) {
      Alert.alert('입력 오류', '아이디와 비밀번호를 입력해주세요.');
      return;
    }
    try {
      await login(id, pw);
    } catch {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  const handleLogout = () =>
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onBack={() => router.back()} />
      <View style={styles.titleRow}>
        <Text style={styles.title}>내 정보</Text>
      </View>

      {isLoggedIn ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* 프로필 카드 */}
          <M3Card variant="outlined" style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={28} color={MD3.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.profileName}>{user?.name ?? '-'} 님</Text>
                <Text style={styles.profileSub}>{user?.companyName ?? '-'} · 트레이드타워</Text>
              </View>
              {user?.isTenantVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>총무 인증</Text>
                </View>
              )}
            </View>
          </M3Card>

          {/* 모바일 사원증 (곧 오픈) */}
          <TouchableOpacity activeOpacity={0.85} onPress={() => Alert.alert('모바일 사원증', '곧 오픈 예정입니다.')}>
            <View style={styles.idCard}>
              <View style={styles.idCardIcon}>
                <Ionicons name="card-outline" size={22} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.idCardTitle}>모바일 사원증</Text>
                <Text style={styles.idCardSub}>명함 공유 · 입주사 할인 확인</Text>
              </View>
              <View style={styles.soonBadge}>
                <Text style={styles.soonBadgeText}>곧 오픈</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* 내 신청 내역 + 주간 소식 */}
          <M3Card variant="outlined" style={{ overflow: 'hidden' }}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => Alert.alert('내 신청 내역', '기존 홈페이지 연동 예정')}
            >
              <Text style={styles.rowLabel}>내 신청 내역</Text>
              <Ionicons name="chevron-forward" size={18} color={MD3.onSurfaceVariant} />
            </TouchableOpacity>
            <View style={[styles.row, styles.rowDivider]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>주간 소식 카카오톡으로 받기</Text>
                <Text style={styles.rowSub}>매주 월요일 오전 8시 · 핵심 공지만</Text>
              </View>
              <Switch
                value={kakaoWeekly}
                onValueChange={setKakaoWeekly}
                trackColor={{ false: MD3.outlineVariant, true: MD3.primaryContainer }}
                thumbColor={kakaoWeekly ? MD3.primary : MD3.outline}
              />
            </View>
          </M3Card>

          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
            <Text style={styles.logoutText}>로그아웃 (비회원 화면 보기)</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
            <M3Card variant="outlined" style={styles.card}>
              <Text style={styles.loginTitle}>입주사 임직원 로그인</Text>
              <M3TextField label="아이디" value={id} onChangeText={setId} autoCapitalize="none" placeholder="아이디" />
              <M3TextField label="비밀번호" value={pw} onChangeText={setPw} secureTextEntry placeholder="비밀번호" />
              <M3Button label="로그인" onPress={handleLogin} loading={isLoading} style={{ marginTop: 4 }} />
              <Text style={styles.registerHint}>
                처음이신가요? 회원가입 후 소속 회사 총무팀의 임직원 인증이 완료되면 모든 서비스를 이용할 수 있어요.
              </Text>
            </M3Card>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Tokens.bg },
  titleRow: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: Tokens.text, letterSpacing: -0.5 },
  scroll: { padding: 16, paddingTop: 0, gap: 12 },

  card: { padding: 18 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  profileName: { fontSize: 17, fontWeight: '700', color: Tokens.text },
  profileSub: { fontSize: 13, color: Tokens.textSub, marginTop: 2 },
  verifiedBadge: { backgroundColor: MD3.tertiaryContainer, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  verifiedBadgeText: { fontSize: 12, fontWeight: '700', color: MD3.onTertiaryContainer },

  idCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: MD3.inverseSurface, borderRadius: Tokens.cardRadius,
    padding: 18, marginVertical: 4,
  },
  idCardIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  idCardTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  idCardSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  soonBadge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  soonBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },

  row: { flexDirection: 'row', alignItems: 'center', padding: 16, minHeight: Tokens.minTouch },
  rowDivider: { borderTopWidth: 1, borderTopColor: Tokens.divider },
  rowLabel: { fontSize: 15, fontWeight: '500', color: Tokens.text },
  rowSub: { fontSize: 12, color: Tokens.textSub, marginTop: 3 },

  logoutRow: { alignItems: 'center', paddingVertical: 16, minHeight: Tokens.minTouch, justifyContent: 'center' },
  logoutText: { fontSize: 14, fontWeight: '600', color: MD3.onSurfaceVariant },

  loginTitle: { fontSize: 18, fontWeight: '700', color: Tokens.text, marginBottom: 16 },
  registerHint: { fontSize: 12, color: Tokens.textSub, lineHeight: 18, marginTop: 4, textAlign: 'center' },
});
