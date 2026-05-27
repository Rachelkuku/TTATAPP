import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../constants/colors';
import { I18N, Lang } from '../constants/i18n';
import { useAuthStore } from '../store/useAuthStore';

const bgWtc = require('../assets/bg_wtc.jpg');
const mascotImg = require('../assets/cacl.png');
const { width } = Dimensions.get('window');

export default function GatewayScreen() {
  const [lang, setLang] = useState<Lang>('KR');
  const { userType, setVisitor } = useAuthStore();
  const t = I18N.gateway;

  const handleTenant = () => {
    // 이미 로그인된 입주사라면 바로 탭으로
    if (userType === 'tenant') {
      router.replace('/(tabs)');
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleVisitor = () => {
    setVisitor();
    router.replace('/(visitor)');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 배경 이미지 */}
      <ImageBackground
        source={bgWtc}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        imageStyle={{ top: -30 }}
      >
        <LinearGradient
          colors={['rgba(5,15,40,0.55)', 'rgba(10,30,70,0.80)', 'rgba(5,15,40,0.95)']}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      {/* 마스코트 */}
      <Image source={mascotImg} style={styles.mascot} resizeMode="contain" />

      <SafeAreaView style={styles.safe}>
        {/* 언어 토글 */}
        <View style={styles.langRow}>
          <TouchableOpacity
            style={[styles.langBtn, lang === 'KR' && styles.langBtnActive]}
            onPress={() => setLang('KR')}
          >
            <Text style={[styles.langText, lang === 'KR' && styles.langTextActive]}>KR</Text>
          </TouchableOpacity>
          <View style={styles.langDivider} />
          <TouchableOpacity
            style={[styles.langBtn, lang === 'EN' && styles.langBtnActive]}
            onPress={() => setLang('EN')}
          >
            <Text style={[styles.langText, lang === 'EN' && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
        </View>

        {/* 타이틀 영역 */}
        <View style={styles.titleArea}>
          {/* WTC 로고 배지 */}
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>WTC SEOUL</Text>
          </View>
          <Text style={styles.welcomeTitle}>{t.welcome[lang]}</Text>
        </View>

        {/* 분기 버튼 영역 */}
        <View style={styles.cardsArea}>
          {/* 입주사 임직원 */}
          <TouchableOpacity style={styles.choiceCard} onPress={handleTenant} activeOpacity={0.85}>
            <LinearGradient
              colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)']}
              style={styles.choiceCardInner}
            >
              <View style={styles.choiceIconBox}>
                <Ionicons name="business-outline" size={30} color={MD3.primary} />
              </View>
              <View style={styles.choiceTextBox}>
                <Text style={styles.choiceTitle}>{t.tenantTitle[lang]}</Text>
                <Text style={styles.choiceSub}>{t.tenantSub[lang]}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.5)" />
            </LinearGradient>
          </TouchableOpacity>

          {/* 방문객 */}
          <TouchableOpacity style={styles.choiceCard} onPress={handleVisitor} activeOpacity={0.85}>
            <LinearGradient
              colors={['rgba(74,158,196,0.35)', 'rgba(74,158,196,0.15)']}
              style={[styles.choiceCardInner, styles.visitorCardInner]}
            >
              <View style={[styles.choiceIconBox, styles.visitorIconBox]}>
                <Ionicons name="earth-outline" size={30} color="#FFFFFF" />
              </View>
              <View style={styles.choiceTextBox}>
                <Text style={[styles.choiceTitle, styles.visitorTitle]}>{t.visitorTitle[lang]}</Text>
                <Text style={[styles.choiceSub, styles.visitorSub]}>{t.visitorSub[lang]}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 하단 서브텍스트 */}
        <Text style={styles.footerText}>
          {lang === 'KR'
            ? 'WORLD TRADE CENTER SEOUL · 서울특별시 강남구 테헤란로 511'
            : 'WORLD TRADE CENTER SEOUL · 511 Teheran-ro, Gangnam-gu, Seoul'}
        </Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050F28' },
  safe: { flex: 1 },

  mascot: {
    position: 'absolute',
    width: 200,
    height: 160,
    right: -10,
    top: Platform.OS === 'ios' ? 80 : 60,
    opacity: 0.18,
  },

  // ── 언어 토글 ───────────────────────────────
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 12 : 16 + (StatusBar.currentHeight ?? 0),
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 17,
  },
  langBtnActive: {
    backgroundColor: MD3.primary,
  },
  langDivider: { width: 0 },
  langText: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.5)' },
  langTextActive: { color: '#FFFFFF' },

  // ── 타이틀 ──────────────────────────────────
  titleArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  logoBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  logoText: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 },
  welcomeTitle: {
    fontSize: width > 380 ? 30 : 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: width > 380 ? 42 : 36,
    letterSpacing: -0.3,
  },

  // ── 분기 카드 ────────────────────────────────
  cardsArea: {
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 16,
  },
  choiceCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  choiceCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 16,
  },
  visitorCardInner: {
    borderWidth: 0,
  },
  choiceIconBox: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  visitorIconBox: {
    backgroundColor: MD3.primary,
    borderColor: 'transparent',
  },
  choiceTextBox: { flex: 1 },
  choiceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  visitorTitle: { color: '#FFFFFF' },
  choiceSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 17,
  },
  visitorSub: { color: 'rgba(255,255,255,0.75)' },

  // ── 푸터 ─────────────────────────────────────
  footerText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 8 : 16,
    paddingHorizontal: 20,
  },
});
