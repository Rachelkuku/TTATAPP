import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MD3 } from '../../../constants/colors';
import { M3Card } from '../../../components/common/M3Card';
import { M3Chip } from '../../../components/common/M3Chip';
import { mockBenefits } from '../../../utils/mockData';
import { BenefitCategory, CouponStatus } from '../../../types';
import { useAuthStore } from '../../../store/useAuthStore';

const mascotImg = require('../../../assets/mascot_clean.png');
const bgTexture = require('../../../assets/bg_lavender.png');

type FilterTab = 'all' | BenefitCategory | 'coupon';

const TABS: { key: FilterTab; label: string; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { key: 'all', label: '전체', icon: 'grid-outline' },
  { key: 'fnb', label: 'F&B', icon: 'restaurant-outline' },
  { key: 'shopping', label: '쇼핑', icon: 'bag-outline' },
  { key: 'hotel', label: '호텔', icon: 'bed-outline' },
  { key: 'exhibition', label: '전시/문화', icon: 'images-outline' },
  { key: 'coupon', label: '쿠폰함', icon: 'ticket-outline' },
];

const PREMIUM_BENEFITS = [
  { icon: 'cafe', title: '전용 라운지 이용', sub: '프리미엄 라운지 무료 이용' },
  { icon: 'car', title: '주차 할인', sub: '주차 요금 20% 할인' },
  { icon: 'gift', title: '제휴사 혜택', sub: '다양한 제휴사 할인 혜택 제공' },
  { icon: 'ticket', title: '이벤트 초대', sub: 'VIP 전용 이벤트 초대' },
];

export default function MembershipScreen() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedPlan, setSelectedPlan] = useState('vip');
  const { isLoggedIn } = useAuthStore();

  const filteredBenefits = activeTab === 'all' || activeTab === 'coupon'
    ? mockBenefits
    : mockBenefits.filter((b) => b.category === activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 헤더 — 라벤더 빌딩 배경 + 마스코트 오른쪽 */}
      <ImageBackground
        source={bgTexture}
        style={styles.headerBg}
        resizeMode="cover"
        imageStyle={{ opacity: 0.55 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.topBar}>
            <View style={{ width: 40 }} />
            <Text style={styles.appBarHeadline}>멤버십</Text>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.headerContent}>
            <View style={styles.greetingBox}>
              <Text style={styles.greetingTitle}>ASEM·TRADE</Text>
              <Text style={styles.greetingSubtitle}>입주사 전용{'\n'}프리미엄 혜택</Text>
            </View>
            <Image source={mascotImg} style={styles.headerCharImg} resizeMode="contain" />
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Main Content Area */}
      <View style={styles.contentWrapper}>
        <View style={styles.whitePanel}>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

            {/* Crown & Title */}
            <View style={styles.crownBox}>
              <View style={styles.crownIconCircle}>
                <Ionicons name="sparkles" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.premiumTitle}>ASEM TRADE 프리미엄 멤버십</Text>
              <Text style={styles.premiumSubtitle}>코엑스의 다양한 혜택을 누려보세요</Text>
            </View>

            {/* Premium Benefits List */}
            <View style={styles.premiumBenefitList}>
              {PREMIUM_BENEFITS.map((b, idx) => (
                <TouchableOpacity key={idx} style={styles.premiumBenefitRow}>
                  <View style={styles.benefitIconBg}>
                    <Ionicons name={b.icon as any} size={20} color="#888" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pbTitle}>{b.title}</Text>
                    <Text style={styles.pbSub}>{b.sub}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#BBB" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Plans */}
            <View style={styles.planContainer}>
              {[
                { key: 'premium', label: 'ASEM TRADE 프리미엄 멤버십', sub: '모든 혜택을 합리적인 가격에 무제한으로 누리세요', price: '월 2,990원', icon: 'star' },
              ].map((plan) => (
                <TouchableOpacity
                  key={plan.key}
                  style={[styles.planCard, selectedPlan === plan.key && styles.planCardActive]}
                  onPress={() => setSelectedPlan(plan.key)}
                >
                  <Ionicons name={plan.icon as any} size={20} color={selectedPlan === plan.key ? MD3.primary : '#AAA'} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.planTitle, selectedPlan === plan.key && styles.planTitleActive]}>{plan.label}</Text>
                    <Text style={[styles.planSub, selectedPlan === plan.key && styles.planSubActive]}>{plan.sub}</Text>
                  </View>
                  <Text style={[styles.planPrice, selectedPlan === plan.key && styles.planPriceActive]}>{plan.price}</Text>
                  <View style={[styles.radioIcon, selectedPlan === plan.key && styles.radioIconActive]}>
                    {selectedPlan === plan.key && <Ionicons name="checkmark" size={12} color="#FFF" />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => Alert.alert('멤버십 가입', '멤버십 가입을 진행합니다.')}
            >
              <Text style={styles.joinBtnText}>멤버십 가입하기</Text>
            </TouchableOpacity>

            {/* Filter & List */}
            <View style={styles.chipBar}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                {TABS.map((tab) => (
                  <M3Chip
                    key={tab.key}
                    label={tab.label}
                    selected={activeTab === tab.key}
                    onPress={() => setActiveTab(tab.key)}
                    icon={activeTab === tab.key ? <Ionicons name={tab.icon} size={14} color={MD3.onPrimaryContainer} /> : undefined}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>{filteredBenefits.length}개의 기타 혜택</Text>
              {activeTab === 'coupon' ? (
                <Text style={{ textAlign: 'center', color: '#888', padding: 20 }}>쿠폰 내역</Text>
              ) : (
                filteredBenefits.slice(0, 3).map((benefit) => (
                  <M3Card key={benefit.id} variant="elevated" style={{ marginBottom: 12 }}>
                    <View style={{ padding: 14 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600' }}>{benefit.title}</Text>
                      <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{benefit.brandName} · {benefit.discountText}</Text>
                    </View>
                  </M3Card>
                ))
              )}
            </View>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#DDD8F5' },
  headerBg: {
    height: Platform.OS === 'ios' ? 250 : 230,
    width: '100%',
    backgroundColor: '#DDD8F5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    height: 56,
  },
  appBarHeadline: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  headerContent: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 24 },
  greetingBox: { flex: 1, paddingBottom: 16 },
  greetingTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', lineHeight: 30 },
  greetingSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  headerCharImg: { width: 322, height: 255, position: 'absolute', right: -10, bottom: -20 },

  contentWrapper: { flex: 1, marginTop: -32 },
  whitePanel: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    overflow: 'hidden', paddingTop: 32,
  },
  scroll: { flex: 1 },

  crownBox: { alignItems: 'center', marginBottom: 24 },
  crownIconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#7CBAD9',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  premiumTitle: { fontSize: 20, fontWeight: '700', color: MD3.onSurface, marginBottom: 6 },
  premiumSubtitle: { fontSize: 13, color: '#888' },

  premiumBenefitList: { paddingHorizontal: 24, marginBottom: 24, gap: 16 },
  premiumBenefitRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  benefitIconBg: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center',
  },
  pbTitle: { fontSize: 15, fontWeight: '600', color: MD3.onSurface, marginBottom: 2 },
  pbSub: { fontSize: 12, color: '#888' },

  planContainer: { paddingHorizontal: 20, marginBottom: 24, gap: 12 },
  planCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 1, borderColor: 'transparent', gap: 12,
  },
  planCardActive: { backgroundColor: '#F0F4FF', borderColor: '#D0DFFF' },
  planTitle: { fontSize: 15, fontWeight: '600', color: MD3.onSurface, marginBottom: 2 },
  planTitleActive: { color: MD3.primary },
  planSub: { fontSize: 12, color: '#888' },
  planSubActive: { color: '#6EA4BD' },
  planPrice: { fontSize: 14, fontWeight: '700', color: '#666' },
  planPriceActive: { color: MD3.primary },
  radioIcon: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#CCC',
    alignItems: 'center', justifyContent: 'center',
  },
  radioIconActive: { borderColor: MD3.primary, backgroundColor: MD3.primary },

  joinBtn: {
    backgroundColor: '#4A9EC4', borderRadius: 16,
    paddingVertical: 18, alignItems: 'center',
    marginHorizontal: 20, marginBottom: 32,
  },
  joinBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF' },

  chipBar: { borderTopWidth: 1, borderTopColor: '#EEE' },
  chipRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
});
