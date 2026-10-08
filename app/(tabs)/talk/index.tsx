import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Linking } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../../constants/colors';
import { TopBar } from '../../../components/common/TopBar';
import { M3Card } from '../../../components/common/M3Card';
import { mockPolls } from '../../../utils/mockData';
import { useAuthStore } from '../../../store/useAuthStore';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const REPORT_BUTTONS: { label: string; icon: IconName; onPress: () => void }[] = [
  { label: '사진으로\n안전신고', icon: 'camera-outline', onPress: () => router.push('/safety' as any) },
  { label: '카카오톡\n상담', icon: 'chatbubble-ellipses-outline', onPress: () => Linking.openURL('https://pf.kakao.com/_xjxocaT') },
  { label: '전화\n상담', icon: 'call-outline', onPress: () => Linking.openURL('tel:02-6000-0114') },
];

export default function TalkScreen() {
  const { isLoggedIn } = useAuthStore();
  const ongoingPollCount = mockPolls.filter((p) => p.status === 'ongoing').length;

  const guard = (label: string, action: () => void) => {
    if (!isLoggedIn) {
      router.push('/my' as any);
      return;
    }
    action();
  };

  const COMMUNITY_ITEMS = [
    { label: '무상 나눔', sub: '사무용품·생활용품 나눔', icon: 'gift-outline' as IconName },
    { label: '입주사 행사', sub: '입주사별 사내 행사 공유', icon: 'flag-outline' as IconName },
    { label: '채용·홍보', sub: '입주사 채용공고 · 홍보', icon: 'briefcase-outline' as IconName },
    { label: '설문·투표', sub: `진행 중인 설문 ${ongoingPollCount}건`, icon: 'bar-chart-outline' as IconName },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
        <View>
          <Text style={styles.title}>소통</Text>
          <Text style={styles.subtitle}>불편과 건의는 여기 한 곳으로</Text>
        </View>

        <M3Card variant="outlined" style={styles.section}>
          <Text style={styles.sectionTitle}>불편·건의 접수</Text>
          <View style={styles.reportRow}>
            {REPORT_BUTTONS.map((b) => (
              <TouchableOpacity key={b.label} style={styles.reportBtn} onPress={() => guard(b.label, b.onPress)}>
                <Ionicons name={b.icon} size={24} color={MD3.primary} />
                <Text style={styles.reportBtnText}>{b.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sectionHint}>
            안전신문고는 사진과 함께 신고하고, 처리 현황까지 확인할 수 있어요.
          </Text>
        </M3Card>

        <M3Card variant="outlined" style={{ overflow: 'hidden' }}>
          <Text style={styles.groupTitle}>입주사 커뮤니티</Text>
          {COMMUNITY_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.row, idx > 0 && styles.rowDivider]}
              onPress={() => guard(item.label, () => Alert.alert(item.label, '기존 홈페이지 연동 예정'))}
            >
              <View style={styles.rowIcon}>
                <Ionicons name={item.icon} size={20} color={MD3.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.label}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={MD3.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
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
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Tokens.text },
  sectionHint: { fontSize: 12, color: Tokens.textSub, lineHeight: 18 },
  reportRow: { flexDirection: 'row', gap: 10 },
  reportBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: MD3.primaryContainer, borderRadius: 16,
    paddingVertical: 16, minHeight: 84,
  },
  reportBtnText: { fontSize: 13, fontWeight: '700', color: MD3.onPrimaryContainer, textAlign: 'center', lineHeight: 17 },

  groupTitle: { fontSize: 16, fontWeight: '700', color: Tokens.text, padding: 16, paddingBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, minHeight: Tokens.minTouch },
  rowDivider: { borderTopWidth: 1, borderTopColor: Tokens.divider },
  rowIcon: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  rowTitle: { fontSize: 15, fontWeight: '600', color: Tokens.text },
  rowSub: { fontSize: 12, color: Tokens.textSub, marginTop: 2 },
});
