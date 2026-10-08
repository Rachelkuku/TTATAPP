import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import qrcode from 'qrcode-generator';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../constants/colors';
import { TopBar } from '../../components/common/TopBar';
import { M3Card } from '../../components/common/M3Card';
import { M3Chip } from '../../components/common/M3Chip';
import { LockNotice } from '../../components/common/LockNotice';
import { CarFinderIcon } from '../../components/common/CarFinderIcon';
import { mockNotices, mockCoexEvents, mockParkingInfo } from '../../utils/mockData';
import { useAuthStore } from '../../store/useAuthStore';
import { NoticeCategory, ParkingStatus } from '../../types';

function QRView({ value, size = 180 }: { value: string; size?: number }) {
  const matrix: boolean[][] = React.useMemo(() => {
    try {
      const qr = qrcode(0, 'M');
      qr.addData(value);
      qr.make();
      const count = qr.getModuleCount();
      return Array.from({ length: count }, (_, r) =>
        Array.from({ length: count }, (_, c) => qr.isDark(r, c))
      );
    } catch {
      return [];
    }
  }, [value]);

  if (!matrix.length) return null;
  const cell = size / matrix.length;

  return (
    <View style={{ width: size, height: size }}>
      {matrix.map((row, r) => (
        <View key={r} style={{ flexDirection: 'row' }}>
          {row.map((dark, c) => (
            <View key={c} style={{ width: cell, height: cell, backgroundColor: dark ? '#1A3A5C' : '#FFFFFF' }} />
          ))}
        </View>
      ))}
    </View>
  );
}

const NOTICE_TONE: Record<NoticeCategory, { fg: string; bg: string; label: string }> = {
  urgent: { ...Tokens.red, label: '긴급' },
  construction: { ...Tokens.orange, label: '공사' },
  outage: { ...Tokens.skyOutage, label: '단수·정전' },
  parking: { ...Tokens.coolParking, label: '주차혼잡' },
  operations: { ...Tokens.slate, label: '운영' },
  event: { ...Tokens.blue, label: '행사' },
};

const PARKING_LABEL: Record<ParkingStatus, string> = {
  free: '여유', busy: '보통', full: '혼잡', unknown: '정보없음',
};

const QUICK_MENUS = [
  { label: '공사·점검', icon: 'warning-outline' as const, onPress: () => router.push('/(tabs)/notice' as any) },
  { label: '주차', icon: 'car-outline' as const, onPress: () => router.push('/(tabs)/service' as any) },
  { label: '냉난방', icon: 'thermometer-outline' as const, memberOnly: true, onPress: () => router.push('/(tabs)/service' as any) },
  { label: '할인', icon: 'pricetag-outline' as const, onPress: () => router.push('/(tabs)/benefit' as any) },
  { label: '민원·신고', icon: 'chatbox-outline' as const, onPress: () => router.push('/(tabs)/talk' as any) },
];

const NEWS_TABS: { key: string; label: string; categories: NoticeCategory[] }[] = [
  { key: 'construction', label: '공사·점검', categories: ['construction', 'outage', 'parking'] },
  { key: 'event', label: '행사·혜택', categories: ['event'] },
  { key: 'operations', label: '운영', categories: ['operations'] },
];

export default function HomeScreen() {
  const { isLoggedIn } = useAuthStore();
  const parking = mockParkingInfo;
  const urgentNotice = mockNotices.find((n) => n.category === 'urgent');
  const [newsTab, setNewsTab] = useState(NEWS_TABS[0].key);

  const newsList = useMemo(() => {
    const cats = NEWS_TABS.find((t) => t.key === newsTab)?.categories ?? [];
    return mockNotices.filter((n) => cats.includes(n.category)).slice(0, 3);
  }, [newsTab]);

  const coexEvents = mockCoexEvents.slice(0, 2);

  const [qrVisible, setQrVisible] = useState(false);
  const openQR = useCallback(() => {
    if (!isLoggedIn) return;
    setQrVisible(true);
  }, [isLoggedIn]);

  const goGuest = () => router.push('/my' as any);

  // 주차 비율(%) — 여유 38% 데모값
  const parkingPercent = parking.status === 'free' ? 38 : parking.status === 'busy' ? 62 : 92;
  const parkingBarColor = parking.status === 'free' ? '#1B6B32' : parking.status === 'busy' ? MD3.warning : MD3.error;

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 2열: 실시간 주차 / 입장 QR */}
        <View style={styles.twoCol}>
          <M3Card variant="outlined" style={styles.parkCard}>
            <Text style={styles.parkLabel}>실시간 주차</Text>
            <View style={styles.parkPercentRow}>
              <Text style={styles.parkPercent}>{parkingPercent}%</Text>
              <Text style={styles.parkPercentSub}> {PARKING_LABEL[parking.status]}</Text>
            </View>
            <View style={styles.parkBarTrack}>
              <View style={[styles.parkBarFill, { width: `${parkingPercent}%`, backgroundColor: parkingBarColor }]} />
            </View>
            <Text style={styles.parkUpdated}>카카오T 연동 · 방금</Text>

            <TouchableOpacity
              style={styles.myCarBtn}
              onPress={isLoggedIn ? () => router.push('/car-finder' as any) : goGuest}
            >
              <CarFinderIcon size={14} color={MD3.onSurfaceVariant} />
              <Text style={styles.myCarBtnText}>내차찾기</Text>
              {!isLoggedIn && <Ionicons name="lock-closed" size={12} color={MD3.onSurfaceVariant} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.discountBtn}
              onPress={() => router.push('/(tabs)/service' as any)}
            >
              <Ionicons name="pricetag" size={14} color="#FFFFFF" />
              <Text style={styles.discountBtnText}>할인주차권</Text>
            </TouchableOpacity>
          </M3Card>

          <TouchableOpacity style={styles.qrCard} activeOpacity={0.9} onPress={isLoggedIn ? openQR : goGuest}>
            <Text style={styles.qrLabel}>입장 QR</Text>
            <View style={styles.qrPreviewBox}>
              {isLoggedIn ? (
                <Ionicons name="qr-code" size={64} color="#1A3A5C" />
              ) : (
                <Ionicons name="lock-closed" size={28} color="rgba(255,255,255,0.5)" />
              )}
            </View>
            <Text style={styles.qrHint} numberOfLines={2}>
              {isLoggedIn ? '스피드게이트에 대고 입장' : '로그인 후 사용할 수 있어요'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 긴급 띠 */}
        {urgentNotice && (
          <TouchableOpacity
            style={styles.urgentBanner}
            onPress={() => router.push(`/notice/${urgentNotice.id}` as any)}
          >
            <View style={styles.urgentChip}>
              <Text style={styles.urgentChipText}>긴급</Text>
            </View>
            <Text style={styles.urgentText} numberOfLines={1}>{urgentNotice.title}</Text>
            <Ionicons name="chevron-forward" size={18} color={Tokens.orange.fg} />
          </TouchableOpacity>
        )}

        {/* 자주 찾는 메뉴 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자주 찾는 메뉴</Text>
          <View style={styles.quickRow}>
            {QUICK_MENUS.map((m) => {
              const locked = m.memberOnly && !isLoggedIn;
              return (
                <TouchableOpacity
                  key={m.label}
                  style={styles.quickItem}
                  onPress={locked ? goGuest : m.onPress}
                >
                  <View style={styles.quickIcon}>
                    <Ionicons name={m.icon} size={24} color={MD3.primary} />
                    {locked && (
                      <View style={styles.quickLockDot}>
                        <Ionicons name="lock-closed" size={9} color={MD3.onSurfaceVariant} />
                      </View>
                    )}
                  </View>
                  <Text style={styles.quickLabel}>{m.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 이번 주 소식 */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>이번 주 소식</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/notice' as any)}>
              <Text style={styles.seeAll}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {NEWS_TABS.map((t) => (
              <M3Chip key={t.key} label={t.label} selected={newsTab === t.key} onPress={() => setNewsTab(t.key)} />
            ))}
          </ScrollView>

          {isLoggedIn ? (
            <M3Card variant="outlined" style={{ overflow: 'hidden', marginTop: 10 }}>
              {newsList.map((n, idx) => {
                const tone = NOTICE_TONE[n.category];
                return (
                  <TouchableOpacity
                    key={n.id}
                    style={[styles.newsRow, idx < newsList.length - 1 && styles.rowDivider]}
                    onPress={() => router.push(`/notice/${n.id}` as any)}
                  >
                    <View style={[styles.tagBadge, { backgroundColor: tone.bg }]}>
                      <Text style={[styles.tagText, { color: tone.fg }]}>{tone.label}</Text>
                    </View>
                    <Text style={styles.newsTitle} numberOfLines={1}>{n.title}</Text>
                    <Text style={styles.newsDate}>{n.createdAt.slice(5)}</Text>
                  </TouchableOpacity>
                );
              })}
            </M3Card>
          ) : (
            <View style={{ marginTop: 10 }}>
              <LockNotice message="입주사 임직원 인증 후 공지를 볼 수 있어요" />
            </View>
          )}
        </View>

        {/* 오늘 코엑스 전시 — 시각 비중 축소 */}
        <View style={[styles.section, { paddingHorizontal: 16 }]}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitleSmall}>오늘 코엑스 전시</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/benefit' as any)}>
              <Text style={styles.seeAll}>혜택 보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {coexEvents.map((ev) => (
              <TouchableOpacity
                key={ev.id}
                style={styles.coexCard}
                onPress={() => router.push(`/coex/${ev.id}` as any)}
              >
                <Text style={styles.coexBadge}>{ev.isActive ? '진행 중' : '예정'}</Text>
                <Text style={styles.coexTitle} numberOfLines={1}>{ev.title}</Text>
                <Text style={styles.coexSub}>{ev.location} · {ev.startDate.slice(5)}~{ev.endDate.slice(5)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* QR 모달 (회원) */}
      <Modal visible={qrVisible} transparent animationType="fade" onRequestClose={() => setQrVisible(false)}>
        <View style={styles.qrOverlay}>
          <View style={styles.qrSheet}>
            <View style={styles.qrSheetHeader}>
              <Text style={styles.qrSheetTitle}>스피드게이트 출입 QR</Text>
              <TouchableOpacity onPress={() => setQrVisible(false)} style={styles.qrCloseBtn}>
                <Ionicons name="close" size={22} color={MD3.onSurface} />
              </TouchableOpacity>
            </View>
            <View style={styles.qrCodeBox}>
              <QRView value={`WTC-GATE:${Date.now()}`} size={200} />
            </View>
            <Text style={styles.qrNotice}>본 QR은 스피드게이트 출입 전용입니다</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Tokens.bg },

  twoCol: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 4 },
  parkCard: { flex: 1, padding: 16, gap: 10 },
  parkLabel: { fontSize: 13, color: Tokens.textSub, fontWeight: '500' },
  parkPercentRow: { flexDirection: 'row', alignItems: 'flex-end' },
  parkPercent: { fontSize: 28, fontWeight: '800', color: Tokens.text },
  parkPercentSub: { fontSize: 12, color: Tokens.textSub, marginBottom: 4 },
  parkBarTrack: { height: 6, borderRadius: 3, backgroundColor: MD3.surfaceVariant, overflow: 'hidden' },
  parkBarFill: { height: 6, borderRadius: 3 },
  parkUpdated: { fontSize: 11, color: Tokens.textSub },
  myCarBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: MD3.surfaceVariant, borderRadius: 12,
    minHeight: Tokens.minTouch, paddingHorizontal: 12, justifyContent: 'center',
  },
  myCarBtnText: { fontSize: 13, fontWeight: '600', color: MD3.onSurfaceVariant },
  discountBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: MD3.primary, borderRadius: 12,
    minHeight: Tokens.minTouch,
  },
  discountBtnText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },

  qrCard: {
    flex: 1, backgroundColor: MD3.inverseSurface, borderRadius: Tokens.cardRadius,
    padding: 16, alignItems: 'center', justifyContent: 'space-between',
  },
  qrLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '500', alignSelf: 'flex-start' },
  qrPreviewBox: {
    width: 92, height: 92, borderRadius: 14, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center', marginVertical: 8,
  },
  qrHint: { fontSize: 11, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },

  urgentBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Tokens.orange.bg, borderRadius: 14,
    marginHorizontal: 16, marginTop: 14, paddingHorizontal: 14,
    minHeight: Tokens.minTouch,
  },
  urgentChip: { backgroundColor: Tokens.orange.fg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  urgentChipText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  urgentText: { flex: 1, fontSize: 13, fontWeight: '600', color: Tokens.orange.fg },

  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Tokens.text, marginBottom: 12 },
  sectionTitleSmall: { fontSize: 14, fontWeight: '700', color: Tokens.textSub },
  seeAll: { fontSize: 13, color: Tokens.textSub, fontWeight: '500' },

  quickRow: { flexDirection: 'row', justifyContent: 'space-between' },
  quickItem: { alignItems: 'center', width: '19%' },
  quickIcon: {
    width: 52, height: 52, borderRadius: 18, backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  quickLockDot: {
    position: 'absolute', right: -2, bottom: -2,
    width: 16, height: 16, borderRadius: 8, backgroundColor: MD3.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  quickLabel: { fontSize: 11, color: Tokens.text, textAlign: 'center' },

  chipRow: { gap: 8, paddingVertical: 2 },
  newsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, minHeight: Tokens.minTouch },
  rowDivider: { borderTopWidth: 1, borderTopColor: Tokens.divider },
  tagBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 11, fontWeight: '700' },
  newsTitle: { flex: 1, fontSize: 14, fontWeight: '500', color: Tokens.text },
  newsDate: { fontSize: 12, color: Tokens.textSub },

  coexCard: {
    width: 160, marginRight: 10, backgroundColor: Tokens.card,
    borderRadius: 14, padding: 12, borderWidth: 1, borderColor: Tokens.divider,
  },
  coexBadge: { fontSize: 10, fontWeight: '700', color: MD3.primary, marginBottom: 4 },
  coexTitle: { fontSize: 13, fontWeight: '600', color: Tokens.text, marginBottom: 2 },
  coexSub: { fontSize: 11, color: Tokens.textSub },

  qrOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' },
  qrSheet: {
    backgroundColor: '#FFFFFF', borderRadius: 28, paddingHorizontal: 28, paddingBottom: 28, paddingTop: 20,
    width: 320, alignItems: 'center',
  },
  qrSheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  qrSheetTitle: { fontSize: 17, fontWeight: '700', color: '#1A3A5C' },
  qrCloseBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  qrCodeBox: {
    padding: 16, borderRadius: 20, backgroundColor: '#FFFFFF',
    borderWidth: 1.5, borderColor: '#E8EEF8', marginBottom: 12,
  },
  qrNotice: { fontSize: 11, color: '#AAA', textAlign: 'center' },
});
