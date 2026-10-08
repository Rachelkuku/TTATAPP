import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../../constants/colors';
import { TopBar } from '../../../components/common/TopBar';
import { M3Card } from '../../../components/common/M3Card';
import { M3Chip } from '../../../components/common/M3Chip';
import { LockNotice } from '../../../components/common/LockNotice';
import { mockNotices } from '../../../utils/mockData';
import { useAuthStore } from '../../../store/useAuthStore';
import { NoticeCategory } from '../../../types';

const NOTICE_TONE: Record<NoticeCategory, { fg: string; bg: string; label: string }> = {
  urgent: { ...Tokens.red, label: '긴급' },
  construction: { ...Tokens.orange, label: '공사' },
  outage: { ...Tokens.skyOutage, label: '단수·정전' },
  parking: { ...Tokens.coolParking, label: '주차혼잡' },
  operations: { ...Tokens.slate, label: '운영' },
  event: { ...Tokens.blue, label: '행사' },
};

type FilterKey = 'all' | NoticeCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'urgent', label: '긴급' },
  { key: 'construction', label: '공사' },
  { key: 'outage', label: '단수·정전' },
  { key: 'parking', label: '주차혼잡' },
  { key: 'operations', label: '운영' },
  { key: 'event', label: '행사' },
];

export default function NoticeScreen() {
  const { isLoggedIn } = useAuthStore();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? mockNotices : mockNotices.filter((n) => n.category === filter)),
    [filter]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar />
      <View style={styles.titleBox}>
        <Text style={styles.title}>공사·점검 공지</Text>
        <Text style={styles.subtitle}>불편하실 수 있는 일정을 항목별로 모았어요</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {FILTERS.map((f) => (
          <M3Chip key={f.key} label={f.label} selected={filter === f.key} onPress={() => setFilter(f.key)} />
        ))}
      </ScrollView>

      {isLoggedIn ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingTop: 8, gap: 10 }}>
          {filtered.map((n) => {
            const tone = NOTICE_TONE[n.category];
            return (
              <TouchableOpacity key={n.id} onPress={() => router.push(`/notice/${n.id}` as any)}>
                <M3Card variant="outlined" style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={[styles.tagBadge, { backgroundColor: tone.bg }]}>
                      <Text style={[styles.tagText, { color: tone.fg }]}>{tone.label}</Text>
                    </View>
                    <Text style={styles.cardDate}>{n.createdAt === n.startDate ? '오늘' : n.startDate.slice(5)}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{n.title}</Text>
                  <Text style={styles.cardLocation}>{n.targetBuilding}</Text>
                </M3Card>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.howtoRow}
            onPress={() => Alert.alert('공사·작업 신청방법 안내', '절차 · 구비서류 · 작업 가능 시간')}
          >
            <View style={styles.howtoIcon}>
              <Ionicons name="hammer-outline" size={20} color={MD3.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.howtoTitle}>공사·작업 신청방법 안내</Text>
              <Text style={styles.howtoSub}>절차 · 구비서류 · 작업 가능 시간</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={MD3.onSurfaceVariant} />
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{ padding: 16 }}>
          <LockNotice message="입주사 임직원 인증 후 공지를 볼 수 있어요" showButton />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Tokens.bg },
  titleBox: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: Tokens.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: Tokens.textSub, marginTop: 4 },
  chipRow: { gap: 8, paddingHorizontal: 16, paddingBottom: 8 },

  card: { padding: 16, gap: 6 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tagBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 11, fontWeight: '700' },
  cardDate: { fontSize: 12, color: Tokens.textSub },
  cardTitle: { fontSize: 15, fontWeight: '500', color: Tokens.text, lineHeight: 21 },
  cardLocation: { fontSize: 12, color: Tokens.textSub },

  howtoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Tokens.card, borderRadius: Tokens.cardRadius,
    padding: 14, borderWidth: 1, borderColor: Tokens.divider, minHeight: Tokens.minTouch,
  },
  howtoIcon: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  howtoTitle: { fontSize: 14, fontWeight: '600', color: Tokens.text },
  howtoSub: { fontSize: 12, color: Tokens.textSub, marginTop: 2 },
});
