import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Linking,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../../constants/colors';
import { M3Card } from '../../../components/common/M3Card';
import { M3Chip } from '../../../components/common/M3Chip';
import { useAuthStore } from '../../../store/useAuthStore';
import { mockNotices } from '../../../utils/mockData';

const mascotImg = require('../../../assets/mascot_clean.png');
const bgTexture = require('../../../assets/mascot.png');

const APPLY_MENUS = [
  { id: 'visitor', label: '방문자\n사전신청', icon: 'person-add-outline' as const, requireLogin: true },
  { id: 'parking', label: '임시정차\n신청', icon: 'car-outline' as const, requireLogin: true },
  { id: 'hvac', label: '냉난방\n신청', icon: 'thermometer-outline' as const, requireLogin: true },
  { id: 'elevator', label: '화물E/V\n전용신청', icon: 'arrow-up-circle-outline' as const, requireLogin: true },
  { id: 'meeting', label: '회의실\n대관신청', icon: 'business-outline' as const, requireLogin: true },
  { id: 'ceiling', label: '천장텍스\n신청', icon: 'construct-outline' as const, requireLogin: true },
  { id: 'voc', label: '고객의\n소리', icon: 'chatbubble-ellipses-outline' as const, requireLogin: true },
  { id: 'construction', label: '공사·작업\n신청방법', icon: 'hammer-outline' as const, requireLogin: false },
];

type NotiTab = 'all' | 'operations' | 'construction' | 'urgent';

const NOTICE_TABS: { key: NotiTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'operations', label: '운영공지' },
  { key: 'construction', label: '공사·점검' },
  { key: 'urgent', label: '긴급' },
];

const CAT_COLOR: Record<string, string> = {
  operations: MD3.primary,
  construction: MD3.warning,
  urgent: MD3.error,
};

const CAT_BG: Record<string, string> = {
  operations: MD3.primaryContainer,
  construction: MD3.secondaryContainer,
  urgent: MD3.errorContainer,
};

const CAT_LABEL: Record<string, string> = {
  operations: '운영',
  construction: '공사',
  urgent: '긴급',
};

export default function ApplyScreen() {
  const { isLoggedIn } = useAuthStore();
  const [activeTab, setActiveTab] = useState<NotiTab>('all');

  const filtered = activeTab === 'all'
    ? mockNotices
    : mockNotices.filter((n) => n.category === activeTab);

  const handleApply = (menu: typeof APPLY_MENUS[0]) => {
    if (menu.requireLogin && !isLoggedIn) {
      Alert.alert('로그인 필요', '입주사 로그인 후 이용하실 수 있습니다.');
      return;
    }
    Alert.alert(menu.label.replace('\n', ' '), '기존 홈페이지 API 연동 예정');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 — 하늘색 배경 */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIconBox}>
              <Ionicons name="document-text" size={28} color={MD3.onSurface} />
            </View>
            <View>
              <Text style={styles.headline}>신청</Text>
              <Text style={styles.subHeadline}>입주사 전용 서비스</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Apply Menu Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>입주사 전용 신청</Text>
          <M3Card variant="outlined" style={styles.gridCard}>
            <View style={styles.grid}>
              {APPLY_MENUS.map((menu) => {
                const locked = menu.requireLogin && !isLoggedIn;
                return (
                  <TouchableOpacity
                    key={menu.id}
                    style={styles.gridItem}
                    onPress={() => handleApply(menu)}
                  >
                    <View style={[styles.gridIcon, locked && styles.gridIconLocked]}>
                      <Ionicons name={menu.icon} size={26} color={MD3.onSurfaceVariant} />
                      {locked && (
                        <View style={styles.lockDot}>
                          <Ionicons name="lock-closed" size={9} color={MD3.onSurfaceVariant} />
                        </View>
                      )}
                    </View>
                    <Text style={[styles.gridLabel, locked && styles.gridLabelLocked]}>
                      {menu.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </M3Card>
        </View>

        {/* My Menu (logged in) */}
        {isLoggedIn && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>마이페이지</Text>
            <M3Card variant="outlined" style={{ overflow: 'hidden' }}>
              {[
                { label: '신청 내역 조회', icon: 'list-outline' as const, sub: '3건 처리 중' },
                { label: '개인정보 수정', icon: 'person-outline' as const, sub: '' },
                { label: '입주사 회원관리', icon: 'people-outline' as const, sub: '' },
              ].map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.listRow, idx > 0 && styles.listDivider]}
                  onPress={() => Alert.alert(item.label, '기존 홈페이지 연동 예정')}
                >
                  <View style={styles.listIcon}>
                    <Ionicons name={item.icon} size={20} color="#4A9EC4" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listTitle}>{item.label}</Text>
                    {item.sub ? <Text style={styles.listSub}>{item.sub}</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={MD3.onSurfaceVariant} />
                </TouchableOpacity>
              ))}
            </M3Card>
          </View>
        )}

        {/* Notice Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>공지사항</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {NOTICE_TABS.map((tab) => (
              <M3Chip
                key={tab.key}
                label={tab.label}
                selected={activeTab === tab.key}
                onPress={() => setActiveTab(tab.key)}
              />
            ))}
          </ScrollView>
          <M3Card variant="outlined" style={{ overflow: 'hidden', marginTop: 12 }}>
            {filtered.map((notice, idx) => (
              <View key={notice.id} style={[styles.noticeItem, idx > 0 && styles.listDivider]}>
                <View style={styles.noticeMeta}>
                  <View style={[styles.catBadge, { backgroundColor: CAT_BG[notice.category] }]}>
                    <Text style={[styles.catText, { color: CAT_COLOR[notice.category] }]}>
                      {CAT_LABEL[notice.category]}
                    </Text>
                  </View>
                  {notice.isUrgent && notice.category !== 'urgent' && (
                    <View style={[styles.catBadge, { backgroundColor: MD3.errorContainer }]}>
                      <Text style={[styles.catText, { color: MD3.error }]}>긴급</Text>
                    </View>
                  )}
                  <Text style={styles.noticeDate}>{notice.createdAt}</Text>
                </View>
                <Text style={styles.noticeTitle}>{notice.title}</Text>
                <Text style={styles.noticeContent} numberOfLines={2}>{notice.content}</Text>
              </View>
            ))}
          </M3Card>
        </View>

        {/* Customer Service */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>고객센터</Text>
          <View style={styles.csCard}>
            <TouchableOpacity style={styles.csHalf} onPress={() => Linking.openURL('tel:02-6000-0114')}>
              <View style={styles.csIconBox}>
                <Ionicons name="headset" size={24} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.csLabel}>고객센터</Text>
                <Text style={styles.csPhone}>02-6000-0114</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.csDividerV} />
            <TouchableOpacity style={styles.csHalf} onPress={() => Linking.openURL('https://pf.kakao.com/_xjxocaT')}>
              <View style={styles.kakaoIconBox}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#3C1E1E" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.csLabel}>카카오톡 상담</Text>
                <Text style={styles.kakaoText}>고객센터 바로가기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#E4ECFB',
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#E4ECFB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginBottom: 4,
  },
  headerInner: { flexDirection: 'row', alignItems: 'flex-end', zIndex: 1 },
  headerLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16 },
  headerIconBox: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  headline: { fontSize: 26, fontWeight: '800', color: MD3.onSurface },
  subHeadline: { fontSize: 13, color: MD3.onSurfaceVariant, marginTop: 3 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: MD3.onSurface, marginBottom: 12 },
  gridCard: { padding: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '25%', alignItems: 'center', paddingVertical: 12 },
  gridIcon: {
    width: 60, height: 60, borderRadius: 18,
    backgroundColor: '#EAF4FA',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  gridIconLocked: { backgroundColor: MD3.surfaceVariant },
  lockDot: {
    position: 'absolute', right: 4, bottom: 4,
    backgroundColor: MD3.surface, borderRadius: 8,
    width: 16, height: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  gridLabel: { fontSize: 11, color: MD3.onSurfaceVariant, textAlign: 'center', lineHeight: 15 },
  gridLabelLocked: { color: MD3.outline },
  listRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  listDivider: { borderTopWidth: 1, borderTopColor: MD3.outlineVariant },
  listIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#EAF4FA',
    alignItems: 'center', justifyContent: 'center',
  },
  listTitle: { fontSize: 14, fontWeight: '500', color: MD3.onSurface },
  listSub: { fontSize: 12, color: '#4A9EC4', marginTop: 2 },
  chipRow: { gap: 8, paddingVertical: 4 },
  noticeItem: { padding: 16 },
  noticeMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  catText: { fontSize: 11, fontWeight: '700' },
  noticeDate: { fontSize: 11, color: MD3.outline, marginLeft: 'auto' },
  noticeTitle: { fontSize: 14, fontWeight: '600', color: MD3.onSurface, marginBottom: 4 },
  noticeContent: { fontSize: 13, color: MD3.onSurfaceVariant, lineHeight: 19 },
  csCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: MD3.surface, borderRadius: 16,
    borderWidth: 1, borderColor: MD3.outlineVariant,
    overflow: 'hidden',
  },
  csHalf: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    padding: 16, gap: 12,
  },
  csDividerV: {
    width: 1, height: 56, backgroundColor: MD3.outlineVariant,
  },
  csIconBox: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#4A9EC4',
    alignItems: 'center', justifyContent: 'center',
  },
  kakaoIconBox: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#FEE500',
    alignItems: 'center', justifyContent: 'center',
  },
  csLabel: { fontSize: 11, color: MD3.onSurfaceVariant, marginBottom: 3 },
  csPhone: { fontSize: 16, fontWeight: '700', color: MD3.onSurface },
  kakaoText: { fontSize: 14, fontWeight: '700', color: '#3C1E1E' },
});
