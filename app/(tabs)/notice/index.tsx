import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Tokens } from '../../../constants/colors';
import { TopBar } from '../../../components/common/TopBar';
import { M3Card } from '../../../components/common/M3Card';
import { M3Chip } from '../../../components/common/M3Chip';
import { LockNotice } from '../../../components/common/LockNotice';
import { mockNotices } from '../../../utils/mockData';
import { useAuthStore } from '../../../store/useAuthStore';
import { NoticeCategory } from '../../../types';

const NOTICE_TONE: Record<NoticeCategory, { fg: string; bg: string; label: string }> = {
  construction: { ...Tokens.orange, label: '공사' },
  inspection: { ...Tokens.skyOutage, label: '점검' },
  parking: { ...Tokens.coolParking, label: '주차·동선' },
  event: { ...Tokens.blue, label: '이벤트' },
  operations: { ...Tokens.slate, label: '운영·기타' },
};

type FilterKey = 'all' | NoticeCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'construction', label: '공사' },
  { key: 'inspection', label: '점검' },
  { key: 'parking', label: '주차·동선' },
  { key: 'event', label: '이벤트' },
  { key: 'operations', label: '운영·기타' },
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
        <Text style={styles.title}>공지</Text>
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
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      <View style={[styles.tagBadge, { backgroundColor: tone.bg }]}>
                        <Text style={[styles.tagText, { color: tone.fg }]}>{tone.label}</Text>
                      </View>
                      {n.isUrgent && (
                        <View style={[styles.tagBadge, { backgroundColor: Tokens.red.bg }]}>
                          <Text style={[styles.tagText, { color: Tokens.red.fg }]}>긴급</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cardDate}>{n.createdAt === n.startDate ? '오늘' : n.startDate.slice(5)}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{n.title}</Text>
                  <Text style={styles.cardLocation}>{n.targetBuilding}</Text>
                </M3Card>
              </TouchableOpacity>
            );
          })}
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
});
