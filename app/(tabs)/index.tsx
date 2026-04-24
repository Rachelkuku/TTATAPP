import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../constants/colors';
import { M3Card } from '../../components/common/M3Card';
import { mockNotices, mockBenefits, mockCoexEvents, mockParkingInfo } from '../../utils/mockData';
import { useAuthStore } from '../../store/useAuthStore';
import { ParkingStatus } from '../../types';

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

const PARKING_COLOR: Record<ParkingStatus, string> = {
  free: MD3.success,
  busy: MD3.warning,
  full: MD3.error,
  unknown: MD3.onSurfaceVariant,
};

const PARKING_CONTAINER: Record<ParkingStatus, string> = {
  free: MD3.tertiaryContainer,
  busy: MD3.secondaryContainer,
  full: MD3.errorContainer,
  unknown: MD3.surfaceVariant,
};

const QUICK_MENUS = [
  { label: '방문자\n신청', icon: 'person-add-outline' as const },
  { label: '임시정차\n신청', icon: 'car-outline' as const },
  { label: '냉난방\n신청', icon: 'thermometer-outline' as const },
  { label: '회의실\n대관', icon: 'business-outline' as const },
  { label: '화물E/V\n신청', icon: 'arrow-up-circle-outline' as const },
  { label: '고객센터', icon: 'call-outline' as const },
];

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const parking = mockParkingInfo;
  const todayNotices = mockNotices.slice(0, 3);
  const todayBenefits = mockBenefits.slice(0, 3);
  const ongoingEvents = mockCoexEvents.filter((e) => e.isActive).slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      {/* M3 Medium Top App Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appBarHeadline}>WTC Membership</Text>
          {user && (
            <Text style={styles.appBarSub}>안녕하세요, {user.name}님</Text>
          )}
        </View>
        <View style={styles.appBarActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => Linking.openURL('tel:02-6000-0114')}>
            <Ionicons name="call-outline" size={24} color={MD3.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color={MD3.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Parking status — M3 Filled Card */}
        <M3Card
          variant="filled"
          style={[styles.parkingCard, { backgroundColor: PARKING_CONTAINER[parking.status] }]}
          onPress={() => {}}
        >
          <View style={styles.parkingInner}>
            <View style={styles.parkingLeft}>
              <Ionicons name="car" size={28} color={PARKING_COLOR[parking.status]} />
              <View>
                <Text style={[styles.parkingStatus, { color: PARKING_COLOR[parking.status] }]}>
                  {PARKING_LABEL[parking.status]}
                </Text>
                <Text style={styles.parkingName}>{parking.parkingName}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={MD3.onSurfaceVariant} />
          </View>
        </M3Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>빠른 신청</Text>
          <View style={styles.quickGrid}>
            {QUICK_MENUS.map((m) => (
              <TouchableOpacity
                key={m.label}
                style={styles.quickItem}
                onPress={() => router.push('/(tabs)/apply/index' as any)}
              >
                <View style={styles.quickIcon}>
                  <Ionicons name={m.icon} size={24} color={MD3.primary} />
                </View>
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
                <View
                  style={[
                    styles.noticeCatBadge,
                    { backgroundColor: NOTICE_CAT_BG[notice.category] },
                  ]}
                >
                  <Text style={[styles.noticeCatText, { color: NOTICE_CAT_COLOR[notice.category] }]}>
                    {NOTICE_CAT_LABEL[notice.category]}
                  </Text>
                </View>
                <Text style={styles.listItemTitle} numberOfLines={1}>{notice.title}</Text>
                {notice.isUrgent && (
                  <Ionicons name="alert-circle" size={16} color={MD3.error} />
                )}
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
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
          </ScrollView>
        </View>

        {/* Coex Events */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>코엑스 전시 일정</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>전체보기</Text>
            </TouchableOpacity>
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

        {/* Customer Service FAB-style Banner */}
        <TouchableOpacity
          style={styles.csBanner}
          onPress={() => Linking.openURL('tel:02-6000-0114')}
        >
          <View style={styles.csBannerIcon}>
            <Ionicons name="headset" size={24} color={MD3.onPrimary} />
          </View>
          <View>
            <Text style={styles.csBannerTitle}>고객센터 바로 연결</Text>
            <Text style={styles.csBannerPhone}>02-6000-0114</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={MD3.onSurfaceVariant} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3.background },

  // Top App Bar (Medium variant)
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: MD3.surface,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 0,
    elevation: 0,
  },
  appBarHeadline: { fontSize: 22, fontWeight: '400', color: MD3.onSurface },
  appBarSub: { fontSize: 13, color: MD3.onSurfaceVariant, marginTop: 2 },
  appBarActions: { flexDirection: 'row', gap: 4 },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { flex: 1 },

  // Parking
  parkingCard: { margin: 16 },
  parkingInner: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  parkingLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  parkingStatus: { fontSize: 18, fontWeight: '700' },
  parkingName: { fontSize: 12, color: MD3.onSurfaceVariant, marginTop: 2 },

  // Sections
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: MD3.onSurface },
  seeAll: { fontSize: 13, color: MD3.primary, fontWeight: '500' },

  // Quick
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickItem: { width: '30%', alignItems: 'center' },
  quickIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: MD3.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickLabel: { fontSize: 11, color: MD3.onSurfaceVariant, textAlign: 'center', lineHeight: 16 },

  // List card
  listCard: { overflow: 'hidden' },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  listDivider: { borderBottomWidth: 1, borderBottomColor: MD3.outlineVariant },
  listItemTitle: { flex: 1, fontSize: 14, fontWeight: '500', color: MD3.onSurface },

  noticeCatBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  noticeCatText: { fontSize: 11, fontWeight: '700' },

  // Benefit card
  benefitCard: { width: 160 },
  benefitImgBox: {
    height: 90,
    backgroundColor: MD3.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitContent: { padding: 12 },
  benefitBrand: { fontSize: 11, color: MD3.onSurfaceVariant, marginBottom: 3 },
  benefitTitle: { fontSize: 13, fontWeight: '600', color: MD3.onSurface, marginBottom: 8, lineHeight: 18 },
  discountChip: {
    alignSelf: 'flex-start',
    backgroundColor: MD3.primaryContainer,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountChipText: { fontSize: 11, fontWeight: '700', color: MD3.onPrimaryContainer },

  // Coex
  eventDateBox: {
    backgroundColor: MD3.surfaceVariant,
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    minWidth: 52,
  },
  eventDateText: { fontSize: 11, fontWeight: '700', color: MD3.onSurfaceVariant },
  eventDateSep: { fontSize: 9, color: MD3.outline },
  eventLocation: { fontSize: 11, color: MD3.onSurfaceVariant, marginTop: 2 },
  tenantChip: {
    backgroundColor: MD3.secondaryContainer,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tenantChipText: { fontSize: 11, fontWeight: '700', color: MD3.onSecondaryContainer },

  // Customer Service
  csBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MD3.surface,
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: MD3.outlineVariant,
  },
  csBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: MD3.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  csBannerTitle: { fontSize: 14, fontWeight: '600', color: MD3.onSurface },
  csBannerPhone: { fontSize: 18, fontWeight: '700', color: MD3.primary, marginTop: 2 },
});
