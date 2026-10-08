import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MD3, Tokens } from '../../../constants/colors';
import { TopBar } from '../../../components/common/TopBar';
import { M3Card } from '../../../components/common/M3Card';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface BenefitRow {
  title: string;
  sub: string;
  icon: IconName;
  comingSoon?: boolean;
  onPress?: () => void;
}

function Group({ title, items }: { title: string; items: BenefitRow[] }) {
  return (
    <M3Card variant="outlined" style={{ overflow: 'hidden' }}>
      <Text style={styles.groupTitle}>{title}</Text>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={item.title}
          style={[styles.row, idx > 0 && styles.rowDivider]}
          onPress={item.onPress ?? (() => Alert.alert(item.title, item.comingSoon ? '곧 오픈 예정입니다.' : item.sub))}
        >
          <View style={styles.rowIcon}>
            <Ionicons name={item.icon} size={20} color={MD3.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowSub} numberOfLines={1}>{item.sub}</Text>
          </View>
          {item.comingSoon && (
            <View style={styles.soonBadge}>
              <Text style={styles.soonBadgeText}>곧 오픈</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={18} color={MD3.onSurfaceVariant} />
        </TouchableOpacity>
      ))}
    </M3Card>
  );
}

export default function BenefitScreen() {
  const exhibitEventItems: BenefitRow[] = [
    { title: '코엑스 전시 일정·혜택', sub: '진행 중·예정 전시 / 무료입장·할인', icon: 'calendar-outline' },
    { title: '별마당도서관 행사', sub: '북토크 · 강연 · 전시', icon: 'book-outline' },
  ];

  const foodItems: BenefitRow[] = [
    { title: '스타필드 레스토랑', sub: '점심·회식 장소 찾기', icon: 'restaurant-outline' },
  ];

  const discountItems: BenefitRow[] = [
    { title: '쇼핑 할인 쿠폰', sub: '스타필드 코엑스몰 · 앱 인증만으로 발급', icon: 'bag-outline', comingSoon: true },
    { title: '아쿠아리움·메가박스', sub: '비수기·특정 시간대 할인', icon: 'grid-outline', comingSoon: true },
    { title: '호텔 숙박·F&B', sub: '파르나스 · 웨스틴조선 · 신라스테이', icon: 'bed-outline', comingSoon: true },
    { title: '건강검진 (광동병원)', sub: '직원가 검진 · 협의 후 오픈', icon: 'heart-outline', comingSoon: true },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
        <View>
          <Text style={styles.title}>혜택</Text>
          <Text style={styles.subtitle}>입주사 임직원이라 누리는 것들</Text>
        </View>

        <Group title="전시·행사" items={exhibitEventItems} />
        <Group title="맛집·카페" items={foodItems} />
        <Group title="할인" items={discountItems} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Tokens.bg },
  title: { fontSize: 24, fontWeight: '700', color: Tokens.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: Tokens.textSub, marginTop: 4 },

  groupTitle: { fontSize: 16, fontWeight: '700', color: Tokens.text, padding: 16, paddingBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, minHeight: Tokens.minTouch },
  rowDivider: { borderTopWidth: 1, borderTopColor: Tokens.divider },
  rowIcon: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: MD3.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  rowTitle: { fontSize: 14, fontWeight: '600', color: Tokens.text },
  rowSub: { fontSize: 12, color: Tokens.textSub, marginTop: 2 },
  soonBadge: { backgroundColor: MD3.tertiaryContainer, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  soonBadgeText: { fontSize: 11, fontWeight: '700', color: MD3.onTertiaryContainer },
});
