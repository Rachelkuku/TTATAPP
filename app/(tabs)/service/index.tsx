import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../../constants/colors';
import { TopBar } from '../../../components/common/TopBar';
import { M3Card } from '../../../components/common/M3Card';
import { useAuthStore } from '../../../store/useAuthStore';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ServiceItem {
  label: string;
  icon: IconName;
  comingSoon?: boolean;
  memberOnly?: boolean;
  onPress?: () => void;
}

const APPLY_ITEMS: ServiceItem[] = [
  { label: '방문자 사전신청', icon: 'person-add-outline' },
  { label: '임시정차 신청', icon: 'car-outline' },
  { label: '추가 냉난방 신청', icon: 'thermometer-outline' },
  { label: '화물EV 신청', icon: 'arrow-up-circle-outline' },
  { label: '웰컴이미지 신청', icon: 'desktop-outline', comingSoon: true },
  {
    label: '공사·작업 신청',
    icon: 'hammer-outline',
    onPress: () => Alert.alert('공사·작업 신청', '절차 · 구비서류 · 작업 가능 시간 안내 후 신청이 접수됩니다.'),
  },
];

const MOVE_ITEMS: ServiceItem[] = [
  { label: '내차찾기', icon: 'search-outline', memberOnly: true, onPress: () => router.push('/car-finder' as any) },
  { label: '할인주차권', icon: 'pricetag-outline', comingSoon: true },
  { label: '실내 길찾기', icon: 'navigate-outline' },
];

const BUILDING_ITEMS: ServiceItem[] = [
  { label: '편의시설 안내', icon: 'business-outline' },
  { label: '우산 대여', icon: 'umbrella-outline', comingSoon: true, memberOnly: true },
  { label: '공사·작업 안내', icon: 'hammer-outline' },
];

const TRIP_ITEMS: ServiceItem[] = [
  { label: '도심공항 리무진', icon: 'airplane-outline' },
  { label: '굿럭 (짐 배송)', icon: 'briefcase-outline' },
];

// 위 4개 그룹에 아직 없는 서비스만 모음 (메뉴 구조화 문서 기준)
const MORE_ITEMS: ServiceItem[] = [
  { label: '쿠폰함', icon: 'wallet-outline', comingSoon: true, memberOnly: true },
  { label: '스타필드몰 F&B 이용 스탬프', icon: 'cafe-outline', comingSoon: true, memberOnly: true },
];

function ItemGrid({ items, isLoggedIn, onItem }: { items: ServiceItem[]; isLoggedIn: boolean; onItem: (i: ServiceItem) => void }) {
  return (
    <View style={styles.grid}>
      {items.map((item) => {
        const locked = item.memberOnly && !isLoggedIn;
        return (
          <TouchableOpacity key={item.label} style={styles.gridItem} onPress={() => onItem(item)}>
            <View style={[styles.gridIcon, locked && styles.gridIconLocked]}>
              <Ionicons name={item.icon} size={22} color={locked ? MD3.onSurfaceVariant : MD3.primary} />
            </View>
            <Text style={styles.gridLabel} numberOfLines={1}>{item.label}</Text>
            {item.comingSoon && (
              <View style={styles.soonBadge}>
                <Text style={styles.soonBadgeText}>곧 오픈</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ItemRowList({ items, isLoggedIn, onItem }: { items: ServiceItem[]; isLoggedIn: boolean; onItem: (i: ServiceItem) => void }) {
  return (
    <View>
      {items.map((item, idx) => {
        const locked = item.memberOnly && !isLoggedIn;
        return (
          <TouchableOpacity
            key={item.label}
            style={[styles.listRow, idx > 0 && styles.listDivider]}
            onPress={() => onItem(item)}
          >
            <View style={[styles.listIcon, locked && styles.gridIconLocked]}>
              <Ionicons name={item.icon} size={18} color={locked ? MD3.onSurfaceVariant : MD3.primary} />
            </View>
            <Text style={styles.listLabel}>{item.label}</Text>
            {item.comingSoon && (
              <View style={styles.soonBadge}>
                <Text style={styles.soonBadgeText}>곧 오픈</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={16} color={MD3.onSurfaceVariant} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ServiceScreen() {
  const { isLoggedIn, user } = useAuthStore();

  const handleItem = (item: ServiceItem) => {
    if (item.comingSoon) {
      Alert.alert(item.label, '곧 오픈 예정입니다.');
      return;
    }
    if (item.memberOnly && !isLoggedIn) {
      Alert.alert('로그인 필요', '입주사 로그인 후 이용하실 수 있습니다.');
      return;
    }
    if (item.onPress) {
      item.onPress();
      return;
    }
    Alert.alert(item.label, '기존 홈페이지 API 연동 예정');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
        <View>
          <Text style={styles.title}>서비스</Text>
          <Text style={styles.subtitle}>신청부터 건물 이용까지 한곳에서</Text>
        </View>

        {/* 신청 */}
        <M3Card variant="outlined" style={styles.section}>
          <View style={styles.sectionHeadRow}>
            <Text style={styles.sectionTitle}>신청</Text>
            {user?.isTenantVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedBadgeText}>총무 인증 계정</Text>
              </View>
            )}
          </View>
          <ItemGrid items={APPLY_ITEMS} isLoggedIn={isLoggedIn} onItem={handleItem} />
        </M3Card>

        {/* 이동 */}
        <M3Card variant="outlined" style={styles.section}>
          <Text style={styles.sectionTitle}>이동</Text>
          <ItemGrid items={MOVE_ITEMS} isLoggedIn={isLoggedIn} onItem={handleItem} />
        </M3Card>

        {/* 건물 이용 */}
        <M3Card variant="outlined" style={styles.section}>
          <Text style={styles.sectionTitle}>건물 이용</Text>
          <ItemGrid items={BUILDING_ITEMS} isLoggedIn={isLoggedIn} onItem={handleItem} />
        </M3Card>

        {/* 출장·이동 */}
        <M3Card variant="outlined" style={styles.section}>
          <Text style={styles.sectionTitle}>출장·이동</Text>
          <ItemGrid items={TRIP_ITEMS} isLoggedIn={isLoggedIn} onItem={handleItem} />
        </M3Card>

        {/* 전체서비스 — 위 4개 그룹에 없는 서비스만 추가로 */}
        <M3Card variant="outlined" style={[styles.section, { padding: 0, paddingTop: 16 }]}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>전체서비스</Text>
          <ItemRowList items={MORE_ITEMS} isLoggedIn={isLoggedIn} onItem={handleItem} />
        </M3Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Tokens.bg },
  title: { fontSize: 24, fontWeight: '700', color: Tokens.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: Tokens.textSub, marginTop: 4 },

  section: { padding: 16, gap: 12 },
  sectionHeadRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Tokens.text },
  verifiedBadge: { backgroundColor: MD3.tertiaryContainer, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  verifiedBadgeText: { fontSize: 11, fontWeight: '700', color: MD3.onTertiaryContainer },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: {
    width: '47%', backgroundColor: MD3.surfaceVariant, borderRadius: 16,
    padding: 14, gap: 10, minHeight: 84, justifyContent: 'center',
  },
  gridIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  gridIconLocked: { backgroundColor: MD3.surface },
  gridLabel: { fontSize: 14, fontWeight: '600', color: Tokens.text },
  soonBadge: { backgroundColor: MD3.tertiaryContainer, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  soonBadgeText: { fontSize: 10, fontWeight: '700', color: MD3.onTertiaryContainer },

  listRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, minHeight: Tokens.minTouch },
  listDivider: { borderTopWidth: 1, borderTopColor: Tokens.divider },
  listIcon: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  listLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Tokens.text },
});
