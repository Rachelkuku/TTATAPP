import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../constants/colors';
import { M3Card } from '../../components/common/M3Card';
import { mockNotices, mockBenefits, mockCoexEvents, mockParkingInfo } from '../../utils/mockData';
import { useAuthStore } from '../../store/useAuthStore';
import { ParkingStatus } from '../../types';

const mascotImg = require('../../assets/mascot_clean.png');
const bgTexture = require('../../assets/mascot2.png');

const NOTICE_CAT_LABEL: Record<string, string> = {
  operations: '운영',
  construction: '공사',
  urgent: '긴급',
};

const NOTICE_CAT_COLOR: Record<string, string> = {
  operations: MD3.primary,
  construction: MD3.secondary,
  urgent: MD3.error,
};

const NOTICE_CAT_BG: Record<string, string> = {
  operations: MD3.primaryContainer,
  construction: MD3.secondaryContainer,
  urgent: MD3.errorContainer,
};

const PARKING_LABEL: Record<ParkingStatus, string> = {
  free: '여유',
  busy: '혼잡',
  full: '만차',
  unknown: '정보없음',
};

const QUICK_MENUS = [
  { label: '방문자 신청', icon: 'person-add-outline' as const },
  { label: '임시주차 신청', icon: 'car-outline' as const },
  { label: '냉난방 신청', icon: 'thermometer-outline' as const },
  { label: '회의실 대관', icon: 'business-outline' as const },
  { label: '화물EV 신청', icon: 'arrow-up-circle-outline' as const },
  { label: '고객센터', icon: 'call-outline' as const },
];

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const todayNotices = mockNotices.slice(0, 3);
  const todayBenefits = mockBenefits.slice(0, 3);
  const ongoingEvents = mockCoexEvents.filter((e) => e.isActive).slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 헤더 — 하늘색 빌딩 배경 + 마스코트 오른쪽 */}
      <ImageBackground
        source={bgTexture}
        style={styles.headerBg}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.topBar}>
            <Text style={styles.appBarHeadline}>WTC ASEM·TRADE</Text>
            <View style={styles.appBarActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => Linking.openURL('tel:02-6000-0114')}>
                <Ionicons name="call-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.greetingBox}>
              <Text style={styles.greetingTitle}>
                {user ? `안녕하세요,\n${user.name}님!` : '안녕하세요!'}
              </Text>
              <Text style={styles.greetingSubtitle}>오늘도 함께 해요 😊</Text>
            </View>
            <Image source={mascotImg} style={styles.headerCharImg} resizeMode="contain" />
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Main Content Area */}
      <View style={styles.contentWrapper}>
        <View style={styles.whitePanel}>
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

            {/* Quick Actions */}
            <View style={styles.quickGridContainer}>
              <View style={styles.quickGrid}>
                {QUICK_MENUS.map((m) => (
                  <TouchableOpacity
                    key={m.label}
                    style={styles.quickItem}
                    onPress={() => router.push('/(tabs)/apply/index' as any)}
                  >
                    <LinearGradient
                      colors={['#FFFFFF', '#E6F0FA']}
                      style={styles.quickIcon}
                    >
                      <Ionicons name={m.icon} size={28} color={MD3.primary} />
                    </LinearGradient>
                    <Text style={styles.quickLabel}>{m.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Today's Notices */}
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>오늘의 공지</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/apply/index' as any)}>
                  <Text style={styles.seeAll}>전체보기</Text>
                </TouchableOpacity>
              </View>
              <M3Card variant="outlined" style={styles.listCard}>
                {todayNotices.map((notice, idx) => (
                  <TouchableOpacity
                    key={notice.id}
                    style={[styles.listRow, idx < todayNotices.length - 1 && styles.listDivider]}
                    onPress={() => router.push(`/notice/${notice.id}` as any)}
                  >
                    <View style={[styles.noticeCatBadge, { backgroundColor: NOTICE_CAT_BG[notice.category] }]}>
                      <Text style={[styles.noticeCatText, { color: NOTICE_CAT_COLOR[notice.category] }]}>
                        {NOTICE_CAT_LABEL[notice.category]}
                      </Text>
                    </View>
                    <Text style={styles.listItemTitle} numberOfLines={1}>{notice.title}</Text>
                    {notice.isUrgent && <Ionicons name="alert-circle" size={16} color={MD3.error} />}
                    <Ionicons name="chevron-forward" size={16} color={MD3.onSurfaceVariant} />
                  </TouchableOpacity>
                ))}
              </M3Card>
            </View>

            {/* Today's Benefits */}
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>오늘의 혜택</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/membership/index' as any)}>
                  <Text style={styles.seeAll}>전체보기</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16 }}>
                {todayBenefits.map((b) => (
                  <M3Card key={b.id} variant="elevated" style={styles.benefitCard} onPress={() => {}}>
                    <View style={styles.benefitImgBox}>
                      <Ionicons name="gift" size={32} color={MD3.primary} />
                    </View>
                    <View style={styles.benefitContent}>
                      <Text style={styles.benefitBrand}>{b.brandName}</Text>
                      <Text style={styles.benefitTitle} numberOfLines={2}>{b.title}</Text>
                      <View style={styles.discountChip}>
                        <Text style={styles.discountChipText}>{b.discountText}</Text>
                      </View>
                    </View>
                  </M3Card>
                ))}
              </View>
            </View>

            {/* Coex Events */}
            <View style={[styles.section, { paddingHorizontal: 16 }]}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>코엑스 전시 일정</Text>
                <TouchableOpacity><Text style={styles.seeAll}>전체보기</Text></TouchableOpacity>
              </View>
              <M3Card variant="outlined" style={styles.listCard}>
                {ongoingEvents.map((ev, idx) => (
                  <TouchableOpacity
                    key={ev.id}
                    style={[styles.listRow, idx < ongoingEvents.length - 1 && styles.listDivider]}
                    onPress={() => router.push(`/coex/${ev.id}` as any)}
                  >
                    <View style={styles.eventDateBox}>
                      <Text style={styles.eventDateText}>{ev.startDate.slice(5).replace('-', '/')}</Text>
                      <Text style={styles.eventDateSep}>~</Text>
                      <Text style={styles.eventDateText}>{ev.endDate.slice(5).replace('-', '/')}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.listItemTitle} numberOfLines={1}>{ev.title}</Text>
                      <Text style={styles.eventLocation}>{ev.location}</Text>
                    </View>
                    {ev.hasTenantDiscount && (
                      <View style={styles.tenantChip}>
                        <Text style={styles.tenantChipText}>할인</Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={16} color={MD3.onSurfaceVariant} />
                  </TouchableOpacity>
                ))}
              </M3Card>
            </View>

            {/* Customer Service Banner */}
            <TouchableOpacity style={styles.csBanner} onPress={() => Linking.openURL('tel:02-6000-0114')}>
              <View style={styles.csBannerIcon}>
                <Ionicons name="headset" size={24} color={MD3.onPrimary} />
              </View>
              <View>
                <Text style={styles.csBannerTitle}>고객센터 바로 연결</Text>
                <Text style={styles.csBannerPhone}>02-6000-0114</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={MD3.onSurfaceVariant} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3B82F6' },
  headerBg: {
    height: Platform.OS === 'ios' ? 250 : 230,
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    height: 56,
  },
  appBarHeadline: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  appBarActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 24,
  },
  greetingBox: { flex: 1, paddingBottom: 16 },
  greetingTitle: { fontSize: 22, fontWeight: '700', color: '#1A3A5C', lineHeight: 30 },
  greetingSubtitle: { fontSize: 14, color: '#2A5070', marginTop: 4 },
  headerCharImg: { width: 322, height: 255, position: 'absolute', right: -10, bottom: -20 },

  contentWrapper: { flex: 1, marginTop: -32 },
  whitePanel: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  scroll: { flex: 1 },

  quickGridContainer: { paddingHorizontal: 16, marginBottom: 32 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  quickItem: { width: '30%', alignItems: 'center', marginBottom: 12 },
  quickIcon: {
    width: 64, height: 64, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
    borderWidth: 1, borderColor: '#F0F8FF',
    shadowColor: '#4A9EC4', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  quickLabel: { fontSize: 13, color: MD3.onSurface, textAlign: 'center', fontWeight: '500' },

  section: { marginBottom: 32 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: MD3.onSurface },
  seeAll: { fontSize: 14, color: '#888', fontWeight: '500' },

  listCard: { overflow: 'hidden' },
  listRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
  listDivider: { borderBottomWidth: 1, borderBottomColor: MD3.outlineVariant },
  listItemTitle: { flex: 1, fontSize: 15, fontWeight: '500', color: MD3.onSurface },
  noticeCatBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  noticeCatText: { fontSize: 12, fontWeight: '700' },

  benefitCard: { flex: 1 },
  benefitImgBox: { height: 90, backgroundColor: '#F5F8FF', alignItems: 'center', justifyContent: 'center' },
  benefitContent: { padding: 12 },
  benefitBrand: { fontSize: 11, color: '#888', marginBottom: 4 },
  benefitTitle: { fontSize: 14, fontWeight: '600', color: MD3.onSurface, marginBottom: 8, lineHeight: 18 },
  discountChip: {
    alignSelf: 'flex-start', backgroundColor: '#E4ECFB',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4,
  },
  discountChipText: { fontSize: 12, fontWeight: '700', color: MD3.primary },

  eventDateBox: {
    backgroundColor: '#F5F8FF', borderRadius: 8, padding: 8,
    alignItems: 'center', minWidth: 56,
  },
  eventDateText: { fontSize: 12, fontWeight: '700', color: MD3.onSurfaceVariant },
  eventDateSep: { fontSize: 10, color: '#888', marginVertical: 2 },
  eventLocation: { fontSize: 12, color: '#888', marginTop: 4 },
  tenantChip: { backgroundColor: '#FFF0F0', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  tenantChipText: { fontSize: 12, fontWeight: '700', color: MD3.error },

  csBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F9FAFB', borderRadius: 16,
    marginHorizontal: 16, padding: 16, gap: 16,
    borderWidth: 1, borderColor: '#EEEEEE',
  },
  csBannerIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: MD3.primary, alignItems: 'center', justifyContent: 'center',
  },
  csBannerTitle: { fontSize: 14, fontWeight: '600', color: MD3.onSurface },
  csBannerPhone: { fontSize: 18, fontWeight: '700', color: MD3.primary, marginTop: 4 },
});
