import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../constants/colors';
import { M3TextField } from '../../components/common/M3TextField';
import { M3Button } from '../../components/common/M3Button';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>WTC</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>WTC Membership</Text>
            <Text style={styles.heroSubtitle}>WTC SEOUL 입주사 전용 플랫폼</Text>
          </View>

          {/* M3 Card Form */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>로그인</Text>

            <M3TextField
              label="이메일"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="example@company.com"
            />

            <View style={styles.passwordRow}>
              <M3TextField
                label="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ flex: 1 }}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword((v) => !v)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={MD3.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>

            <M3Button
              label="로그인"
              onPress={handleLogin}
              loading={isLoading}
              style={{ marginTop: 8 }}
            />

            <M3Button
              label="비회원으로 둘러보기"
              variant="tonal"
              onPress={() => router.replace('/(tabs)')}
              style={{ marginTop: 12 }}
            />

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>

          {/* Register */}
          <View style={styles.registerRow}>
            <Text style={styles.registerHint}>WTC 입주사 직원이신가요?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3.background },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32 },
  hero: { alignItems: 'center', marginBottom: 32 },
  logoContainer: { marginBottom: 16 },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: MD3.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: MD3.scrim,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    color: MD3.onPrimary,
    letterSpacing: 3,
  },
  heroTitle: { fontSize: 28, fontWeight: '400', color: MD3.onBackground, letterSpacing: 0.5 },
  heroSubtitle: { fontSize: 14, color: MD3.onSurfaceVariant, marginTop: 6 },
  card: {
    backgroundColor: MD3.surface,
    borderRadius: 28,
    padding: 24,
    elevation: 1,
    shadowColor: MD3.scrim,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: MD3.onSurface,
    marginBottom: 24,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 20,
    padding: 8,
  },
  forgotRow: { alignItems: 'center', marginTop: 16 },
  forgotText: { fontSize: 14, color: MD3.primary, fontWeight: '500' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  registerHint: { fontSize: 14, color: MD3.onSurfaceVariant },
  registerLink: { fontSize: 14, color: MD3.primary, fontWeight: '700' },
});
