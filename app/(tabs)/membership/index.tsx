import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../../constants/colors';
import { M3Card } from '../../../components/common/M3Card';
import { M3Chip } from '../../../components/common/M3Chip';
import { M3Button } from '../../../components/common/M3Button';
import { mockBenefits, mockCoupons } from '../../../utils/mockData';
import { BenefitCategory, CouponStatus } from '../../../types';
import { useAuthStore } from '../../../store/useAuthStore';

type FilterTab = 'all' | BenefitCategory | 'coupon';

const TABS: { key: FilterTab; label: string; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { key: 'all', label: '전체', icon: 'grid-outline' },
  { key: 'fnb', label: 'F&B', icon: 'restaurant-outline' },
  { key: 'shopping', label: '쇼핑', icon: 'bag-outline' },
  { key: 'hotel', label: '호텔', icon: 'bed-outline' },
  { key: 'exhibition', label: '전시/문화', icon: 'images-outline' },
  { key: 'coupon', label: '쿠폰함', icon: 'ticket-outline' },
];

const COUPON_STATUS: Record<CouponStatus, { label: string; color: string; bg: string }> = {
  available: { label: '사용 가능', color: MD3.success, bg: MD3.tertiaryContainer },
  used: { label: '사용 완료', color: MD3.onSurfaceVariant, bg: MD3.surfaceVariant },
  expired: { label: '기간 만료', color: MD3.error, bg: MD3.errorContainer },
};

export default function MembershipScreen() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const { isLoggedIn } = useAuthStore();

  const filteredBenefits = activeTab === 'all' || activeTab === 'coupon'
    ? mockBenefits
    : mockBenefits.filter((b) => b.category === activeTab);

  const handleCoupon = () => {
    if (!isLoggedIn) {
      Alert.alert('로그인 필요', '쿠폰을 받으려면 로그인이 필요합니다.');
      return;
    }
    Alert.alert('쿠폰 받기 완료', '쿠폰함에 저장되었습니다.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Hero Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.headline}>WTC 멤버십</Text>
        <Text style={styles.subHeadline}>입주사 전용 혜택</Text>
      </View>

      {/* Filter Chips */}
      <View style={styles.chipBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {TABS.map((tab) => (
            <M3Chip
              key={tab.key}
              label={tab.label}
              selected={activeTab === tab.key}
              onPress={() => setActiveTab(tab.key)}
              icon={
                activeTab === tab.key ? (
                  <Ionicons name={tab.icon} size={14} color={MD3.onPrimaryContainer} />
                ) : undefined
              }
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {activeTab === 'coupon' ? (
          /* ── 쿠폰함 ── */
          <View style={styles.section}>
            {!isLoggedIn ? (
              <M3Card variant="filled" style={styles.emptyCard}>
                <Ionicons name="ticket-outline" size={48} color={MD3.onSurfaceVariant} />
                <Text style={styles.emptyTitle}>로그인 후 이용하세요</Text>
                <Text style={styles.emptySub}>입주사 전용 쿠폰함</Text>
              </M3Card>
            ) : mockCoupons.length === 0 ? (
              <M3Card variant="filled" style={styles.emptyCard}>
                <Ionicons name="ticket-outline" size={48} color={MD3.onSurfaceVariant} />
                <Text style={styles.emptyTitle}>보유한 쿠폰이 없습니다</Text>
              </M3Card>
            ) : (
              mockCoupons.map((coupon) => {
                const status = COUPON_STATUS[coupon.status];
                return (
                  <M3Card key={coupon.id} variant="outlined" style={styles.couponCard}>
                    <View style={styles.couponDeco} />
                    <View style={styles.couponBody}>
                      <View style={styles.couponTop}>
                        <View>
                          <Text style={styles.couponBrand}>{coupon.brandName}</Text>
                          <Text style={styles.couponTitle}>{coupon.title}</Text>
                        </View>
                        <View style={[styles.statusChip, { backgroundColor: status.bg }]}>
                          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                        </View>
                      </View>
                      <View style={styles.couponDivider} />
                      <View style={styles.couponBottom}>
                        <Text style={styles.couponExpiry}>유효기간 ~{coupon.endDate}</Text>
                        {coupon.status === 'available' && (
                          <M3Button
                            label="사용하기"
                            variant="tonal"
                            style={styles.useBtn}
                            onPress={() => Alert.alert('쿠폰 사용', 'QR 코드를 매장에 제시해주세요.')}
                          />
                        )}
                      </View>
                    </View>
                  </M3Card>
                );
              })
            )}
          </View>
        ) : (
          /* ── 혜택 목록 ── */
          <View style={styles.section}>
            <Text style={styles.countLabel}>{filteredBenefits.length}개의 혜택</Text>
            {filteredBenefits.map((benefit) => (
              <M3Card key={benefit.id} variant="elevated" style={styles.benefitCard}>
                {/* Image area */}
                <View style={styles.benefitImg}>
                  <Ionicons name="gift" size={40} color={MD3.primary} />
                </View>

                <View style={styles.benefitBody}>
                  <View style={styles.benefitTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.benefitBrand}>{benefit.brandName}</Text>
                      <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    </View>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{benefit.discountText}</Text>
                    </View>
                  </View>

                  <View style={styles.benefitMeta}>
                    <Ionicons name="location-outline" size={13} color={MD3.onSurfaceVariant} />
                    <Text style={styles.metaText} numberOfLines={1}>{benefit.location}</Text>
                  </View>
                  <View style={styles.benefitMeta}>
                    <Ionicons name="calendar-outline" size={13} color={MD3.onSurfaceVariant} />
                    <Text style={styles.metaText}>~ {benefit.endDate}</Text>
                  </View>

                  <View style={styles.benefitActions}>
                    <M3Button
                      label="상세보기"
                      variant="text"
                      style={styles.actionBtn}
                      onPress={() =>
                        Alert.alert(benefit.title, `사용방법: ${benefit.usageMethod}\n\n유의사항: ${benefit.notes}`)
                      }
                    />
                    <M3Button
                      label="쿠폰 받기"
                      variant="tonal"
                      style={styles.actionBtn}
                      icon={<Ionicons name="download-outline" size={14} color={MD3.onPrimaryContainer} />}
                      onPress={handleCoupon}
                    />
                  </View>
                </View>
              </M3Card>
            ))}
          </View>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3.background },
  topBar: { backgroundColor: MD3.surface, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  headline: { fontSize: 28, fontWeight: '400', color: MD3.onSurface },
  subHeadline: { fontSize: 13, color: MD3.onSurfaceVariant, marginTop: 2 },
  chipBar: {
    backgroundColor: MD3.surface,
    borderBottomWidth: 1,
    borderBottomColor: MD3.outlineVariant,
  },
  chipRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  section: { padding: 16 },
  countLabel: { fontSize: 13, color: MD3.onSurfaceVariant, marginBottom: 12 },

  // Empty state
  emptyCard: { alignItems: 'center', padding: 48, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '500', color: MD3.onSurfaceVariant },
  emptySub: { fontSize: 13, color: MD3.outline },

  // Coupon card
  couponCard: { flexDirection: 'row', marginBottom: 12, overflow: 'hidden' },
  couponDeco: { width: 8, backgroundColor: MD3.primary },
  couponBody: { flex: 1, padding: 16 },
  couponTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  couponBrand: { fontSize: 12, color: MD3.onSurfaceVariant, marginBottom: 3 },
  couponTitle: { fontSize: 15, fontWeight: '600', color: MD3.onSurface },
  statusChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  couponDivider: {
    height: 1,
    backgroundColor: MD3.outlineVariant,
    marginVertical: 12,
    borderStyle: 'dashed',
  },
  couponBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  couponExpiry: { fontSize: 12, color: MD3.onSurfaceVariant },
  useBtn: { paddingVertical: 6, paddingHorizontal: 16 },

  // Benefit card
  benefitCard: { marginBottom: 12 },
  benefitImg: {
    height: 100,
    backgroundColor: MD3.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitBody: { padding: 16 },
  benefitTop: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  benefitBrand: { fontSize: 12, color: MD3.onSurfaceVariant, marginBottom: 3 },
  benefitTitle: { fontSize: 15, fontWeight: '600', color: MD3.onSurface },
  discountBadge: {
    backgroundColor: MD3.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  discountText: { fontSize: 12, fontWeight: '700', color: MD3.onPrimaryContainer },
  benefitMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  metaText: { fontSize: 13, color: MD3.onSurfaceVariant, flex: 1 },
  benefitActions: { flexDirection: 'row', gap: 8, marginTop: 12, justifyContent: 'flex-end' },
  actionBtn: { paddingHorizontal: 16 },
});
