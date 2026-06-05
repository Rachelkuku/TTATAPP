import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../constants/colors';
import { I18N } from '../../constants/i18n';
import { useAuthStore } from '../../store/useAuthStore';

const { width, height } = Dimensions.get('window');

export default function AttractionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { lang } = useAuthStore();
  const attractions = I18N.visitor.attractions;

  const item = attractions.find((att) => att.id === id);

  if (!item) {
    return (
      <View style={styles.errorWrap}>
        <Ionicons name="alert-circle-outline" size={48} color={MD3.error} />
        <Text style={styles.errorText}>
          {lang === 'KR' ? '명소 정보를 찾을 수 없습니다.' : 'Attraction not found.'}
        </Text>
        <TouchableOpacity style={styles.errorBtn} onPress={() => router.back()}>
          <Text style={styles.errorBtnText}>{lang === 'KR' ? '돌아가기' : 'Go Back'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 상단 이미지 영역 */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.mainImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.3)']}
          style={StyleSheet.absoluteFill}
        />
        
        {/* 오버레이 뒤로 가기 버튼 */}
        <SafeAreaView style={styles.backBtnSafe}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* 이미지 위에 얹어지는 간략 타이틀 */}
        <View style={styles.imageOverlayText}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category[lang]}</Text>
          </View>
          <Text style={styles.mainTitle}>{lang === 'KR' ? item.KR : item.EN}</Text>
        </View>
      </View>

      {/* 상세 설명 영역 (둥근 흰색 패널) */}
      <View style={styles.contentWrapper}>
        <View style={styles.whitePanel}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 위치 정보 섹션 */}
            <View style={styles.locationSection}>
              <View style={styles.locationIconBox}>
                <Ionicons name="location-sharp" size={20} color={MD3.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.locationLabel}>
                  {lang === 'KR' ? '찾아오시는 길' : 'Location'}
                </Text>
                <Text style={styles.locationText}>{item.location[lang]}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* 상세 소개 내용 */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>
                {lang === 'KR' ? '상세 소개' : 'About This Place'}
              </Text>
              <Text style={styles.descriptionText}>{item.desc[lang]}</Text>
            </View>

            {/* 안내 팁 박스 */}
            <View style={styles.tipBox}>
              <Ionicons name="information-circle" size={20} color="#0369A1" style={{ marginTop: 2 }} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.tipTitle}>
                  {lang === 'KR' ? 'WTCSEOUL 방문자 꿀팁' : 'Visitor Information'}
                </Text>
                <Text style={styles.tipText}>
                  {lang === 'KR' 
                    ? '무역센터(WTC) 멤버십 앱을 이용해 주차 현황과 맛집 정보를 함께 이용하시면 더욱 가볍고 스마트한 여행을 즐기실 수 있습니다.'
                    : 'Use WTC membership app to check real-time parking & dining guide to enjoy a more smart, hands-free journey.'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FCFF' },

  // ── 이미지 영역 ──────────────────────────────
  imageContainer: {
    height: height * 0.40,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backBtnSafe: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 28 + (StatusBar.currentHeight ?? 0),
    left: 16,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  imageOverlayText: {
    position: 'absolute',
    bottom: 38,
    left: 20,
    right: 20,
    gap: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: MD3.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: width > 380 ? 25 : 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ── 흰색 상세 패널 ───────────────────────────
  contentWrapper: {
    flex: 1,
    marginTop: -24,
  },
  whitePanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  locationIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: MD3.primary,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  locationText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: MD3.outlineVariant,
    marginVertical: 22,
  },
  aboutSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderLeftWidth: 4,
    borderLeftColor: '#0284C7',
    borderRadius: 12,
    padding: 14,
    marginTop: 28,
    gap: 12,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0369A1',
  },
  tipText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
  },

  // ── 에러 화면 ────────────────────────────────
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: 32,
    backgroundColor: '#F8FAFC',
  },
  errorText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },
  errorBtn: {
    backgroundColor: MD3.primary,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 11,
    elevation: 2,
  },
  errorBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
