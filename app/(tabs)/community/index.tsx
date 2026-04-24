import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../../constants/colors';
import { M3Card } from '../../../components/common/M3Card';
import { M3Chip } from '../../../components/common/M3Chip';
import { M3Button } from '../../../components/common/M3Button';
import { M3TextField } from '../../../components/common/M3TextField';
import { mockCommunityPosts, mockPolls } from '../../../utils/mockData';
import { PostCategory, Poll, PollStatus } from '../../../types';
import { useAuthStore } from '../../../store/useAuthStore';

// ── 탭 정의 ───────────────────────────────────────────────

type MainTab = 'community' | 'poll';
type PostFilterTab = 'all' | PostCategory;

const POST_TABS: { key: PostFilterTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'recruitment', label: '채용/홍보' },
  { key: 'secondhand', label: '중고나눔' },
  { key: 'event', label: '사내행사' },
  { key: 'partnership', label: '제휴제안' },
  { key: 'brand', label: '브랜드소개' },
];

const CAT_LABEL: Record<PostCategory, string> = {
  recruitment: '채용/홍보',
  secondhand: '중고나눔',
  event: '사내행사',
  partnership: '제휴제안',
  brand: '브랜드소개',
  poll: '설문/투표',
};

const CAT_COLOR: Record<PostCategory, string> = {
  recruitment: MD3.primary,
  secondhand: MD3.success,
  event: MD3.warning,
  partnership: MD3.tertiary,
  brand: MD3.onSurface,
  poll: MD3.tertiary,
};

const CAT_BG: Record<PostCategory, string> = {
  recruitment: MD3.primaryContainer,
  secondhand: MD3.tertiaryContainer,
  event: MD3.secondaryContainer,
  partnership: MD3.tertiaryContainer,
  brand: MD3.surfaceVariant,
  poll: MD3.tertiaryContainer,
};

// ── 투표 상태 메타 ─────────────────────────────────────────

const POLL_STATUS: Record<PollStatus, { label: string; color: string; bg: string; dot: string }> = {
  ongoing: { label: '진행 중', color: MD3.success, bg: MD3.tertiaryContainer, dot: MD3.success },
  ended:   { label: '종료',    color: MD3.onSurfaceVariant, bg: MD3.surfaceVariant, dot: MD3.outline },
  upcoming:{ label: '예정',    color: MD3.primary, bg: MD3.primaryContainer, dot: MD3.primary },
};

// ── 투표 카드 ──────────────────────────────────────────────

function PollCard({ poll }: { poll: Poll }) {
  const sm = POLL_STATUS[poll.status];
  const total = poll.totalParticipants;
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(poll.endDate).getTime() - Date.now()) / 86400000)
  );

  return (
    <M3Card
      variant="elevated"
      style={ps.card}
      onPress={() => router.push(`/poll/${poll.id}` as any)}
    >
      {/* status row */}
      <View style={ps.headerRow}>
        <View style={[ps.statusPill, { backgroundColor: sm.bg }]}>
          <View style={[ps.statusDot, { backgroundColor: sm.dot }]} />
          <Text style={[ps.statusText, { color: sm.color }]}>{sm.label}</Text>
        </View>
        <View style={ps.catPill}>
          <Text style={ps.catText}>{poll.category}</Text>
        </View>
        {poll.isAnonymous && (
          <View style={ps.anonPill}>
            <Ionicons name="eye-off-outline" size={11} color={MD3.onSurfaceVariant} />
            <Text style={ps.anonText}>익명</Text>
          </View>
        )}
        <Text style={ps.date}>{poll.endDate}까지</Text>
      </View>

      {/* title */}
      <Text style={ps.title}>{poll.title}</Text>
      <Text style={ps.desc} numberOfLines={2}>{poll.description}</Text>

      {/* footer */}
      <View style={ps.footer}>
        <View style={ps.footerLeft}>
          <Ionicons name="bar-chart-outline" size={13} color={MD3.onSurfaceVariant} />
          <Text style={ps.footerText}>{poll.questions.length}개 문항</Text>
          <Ionicons name="people-outline" size={13} color={MD3.onSurfaceVariant} />
          <Text style={ps.footerText}>{total}명 참여</Text>
        </View>
        <View style={ps.footerRight}>
          {poll.status === 'ongoing' && daysLeft > 0 && (
            <View style={ps.dDayBadge}>
              <Text style={ps.dDayText}>D-{daysLeft}</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={16} color={MD3.onSurfaceVariant} />
        </View>
      </View>
    </M3Card>
  );
}

const ps = StyleSheet.create({
  card: { marginBottom: 12, padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12, flexWrap: 'wrap' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700' },
  catPill: { backgroundColor: MD3.surfaceVariant, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  catText: { fontSize: 11, color: MD3.onSurfaceVariant, fontWeight: '500' },
  anonPill: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, backgroundColor: MD3.surfaceVariant },
  anonText: { fontSize: 11, color: MD3.onSurfaceVariant },
  date: { fontSize: 11, color: MD3.outline, marginLeft: 'auto' },
  title: { fontSize: 16, fontWeight: '600', color: MD3.onSurface, marginBottom: 6, lineHeight: 22 },
  desc: { fontSize: 13, color: MD3.onSurfaceVariant, lineHeight: 19, marginBottom: 14 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 12, color: MD3.onSurfaceVariant, marginRight: 6 },
  footerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dDayBadge: { backgroundColor: MD3.primaryContainer, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  dDayText: { fontSize: 11, fontWeight: '700', color: MD3.onPrimaryContainer },
});

// ── 메인 화면 ──────────────────────────────────────────────

export default function CommunityScreen() {
  const [mainTab, setMainTab] = useState<MainTab>('community');
  const [postFilter, setPostFilter] = useState<PostFilterTab>('all');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newCat, setNewCat] = useState<PostCategory>('recruitment');
  const { isLoggedIn } = useAuthStore();

  const filteredPosts = postFilter === 'all'
    ? mockCommunityPosts
    : mockCommunityPosts.filter((p) => p.category === postFilter);

  const ongoingPolls = mockPolls.filter((p) => p.status === 'ongoing');
  const endedPolls   = mockPolls.filter((p) => p.status === 'ended');

  const handleWrite = () => {
    if (!isLoggedIn) {
      Alert.alert('로그인 필요', '게시글 작성은 입주사 로그인 후 가능합니다.');
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!title || !content) {
      Alert.alert('입력 오류', '제목과 내용을 입력해주세요.');
      return;
    }
    setShowModal(false);
    setTitle('');
    setContent('');
    Alert.alert('게시글 등록', '관리자 검토 후 게시됩니다.');
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Top App Bar */}
      <View style={s.topBar}>
        <Text style={s.headline}>커뮤니티</Text>
      </View>

      {/* 메인 탭 — 커뮤니티 / 설문투표 */}
      <View style={s.mainTabRow}>
        <TouchableOpacity
          style={[s.mainTab, mainTab === 'community' && s.mainTabActive]}
          onPress={() => setMainTab('community')}
        >
          <Ionicons
            name="people-outline"
            size={18}
            color={mainTab === 'community' ? MD3.primary : MD3.onSurfaceVariant}
          />
          <Text style={[s.mainTabText, mainTab === 'community' && s.mainTabTextActive]}>
            커뮤니티
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.mainTab, mainTab === 'poll' && s.mainTabActive]}
          onPress={() => setMainTab('poll')}
        >
          <Ionicons
            name="bar-chart-outline"
            size={18}
            color={mainTab === 'poll' ? MD3.primary : MD3.onSurfaceVariant}
          />
          <Text style={[s.mainTabText, mainTab === 'poll' && s.mainTabTextActive]}>
            설문/투표
          </Text>
          <View style={s.tabBadge}>
            <Text style={s.tabBadgeText}>{ongoingPolls.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── 커뮤니티 탭 ── */}
      {mainTab === 'community' && (
        <>
          <View style={s.chipBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
              {POST_TABS.map((tab) => (
                <M3Chip
                  key={tab.key}
                  label={tab.label}
                  selected={postFilter === tab.key}
                  onPress={() => setPostFilter(tab.key)}
                />
              ))}
            </ScrollView>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={s.section}>
              {filteredPosts.map((post) => (
                <M3Card
                  key={post.id}
                  variant="elevated"
                  style={s.postCard}
                  onPress={() => Alert.alert(post.title, post.content)}
                >
                  <View style={s.postHeader}>
                    <View style={[s.catBadge, { backgroundColor: CAT_BG[post.category] }]}>
                      <Text style={[s.catText, { color: CAT_COLOR[post.category] }]}>
                        {CAT_LABEL[post.category]}
                      </Text>
                    </View>
                    <Text style={s.postDate}>{post.createdAt}</Text>
                  </View>
                  <Text style={s.postTitle}>{post.title}</Text>
                  <Text style={s.postContent} numberOfLines={2}>{post.content}</Text>
                  <View style={s.postFooter}>
                    <View style={s.authorRow}>
                      <View style={s.avatarMini}>
                        <Text style={s.avatarMiniText}>{post.authorName[0]}</Text>
                      </View>
                      <Text style={s.authorName}>{post.authorName}</Text>
                      <Text style={s.authorCompany}>{post.companyName}</Text>
                    </View>
                    <View style={s.statsRow}>
                      <Ionicons name="eye-outline" size={13} color={MD3.onSurfaceVariant} />
                      <Text style={s.statNum}>{post.viewCount}</Text>
                      <Ionicons name="chatbubble-outline" size={13} color={MD3.onSurfaceVariant} />
                      <Text style={s.statNum}>{post.commentCount}</Text>
                    </View>
                  </View>
                </M3Card>
              ))}
              {filteredPosts.length === 0 && (
                <M3Card variant="filled" style={s.emptyCard}>
                  <Ionicons name="document-text-outline" size={48} color={MD3.onSurfaceVariant} />
                  <Text style={s.emptyText}>게시글이 없습니다</Text>
                </M3Card>
              )}
            </View>
            <View style={{ height: 88 }} />
          </ScrollView>

          {/* Extended FAB */}
          <TouchableOpacity style={s.fab} onPress={handleWrite}>
            <Ionicons name="add" size={24} color={MD3.onPrimaryContainer} />
            <Text style={s.fabLabel}>글쓰기</Text>
          </TouchableOpacity>
        </>
      )}

      {/* ── 설문/투표 탭 ── */}
      {mainTab === 'poll' && (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* 진행 중 */}
          {ongoingPolls.length > 0 && (
            <View style={s.section}>
              <View style={s.sectionRow}>
                <View style={s.sectionBullet} />
                <Text style={s.sectionTitle}>진행 중인 투표</Text>
                <Text style={s.sectionCount}>{ongoingPolls.length}개</Text>
              </View>
              {ongoingPolls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </View>
          )}

          {/* 종료된 */}
          {endedPolls.length > 0 && (
            <View style={s.section}>
              <View style={s.sectionRow}>
                <View style={[s.sectionBullet, { backgroundColor: MD3.outline }]} />
                <Text style={[s.sectionTitle, { color: MD3.onSurfaceVariant }]}>종료된 투표</Text>
                <Text style={s.sectionCount}>{endedPolls.length}개</Text>
              </View>
              {endedPolls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </View>
          )}

          {mockPolls.length === 0 && (
            <M3Card variant="filled" style={[s.emptyCard, { margin: 16 }]}>
              <Ionicons name="bar-chart-outline" size={48} color={MD3.onSurfaceVariant} />
              <Text style={s.emptyText}>진행 중인 투표가 없습니다</Text>
            </M3Card>
          )}
          <View style={{ height: 32 }} />
        </ScrollView>
      )}

      {/* 글쓰기 모달 */}
      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={s.modalSafe}>
          <View style={s.modalHeader}>
            <TouchableOpacity onPress={() => setShowModal(false)} style={s.modalClose}>
              <Ionicons name="close" size={24} color={MD3.onSurface} />
            </TouchableOpacity>
            <Text style={s.modalTitle}>게시글 작성</Text>
            <View style={{ width: 48 }} />
          </View>
          <ScrollView style={s.modalScroll} contentContainerStyle={{ paddingBottom: 48 }}>
            <Text style={s.fieldLabel}>카테고리</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 20 }}>
              {(Object.keys(CAT_LABEL) as PostCategory[]).filter((k) => k !== 'poll').map((cat) => (
                <M3Chip
                  key={cat}
                  label={CAT_LABEL[cat]}
                  selected={newCat === cat}
                  onPress={() => setNewCat(cat)}
                />
              ))}
            </ScrollView>
            <M3TextField label="제목" value={title} onChangeText={setTitle} placeholder="제목을 입력하세요" />
            <M3TextField
              label="내용"
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력하세요"
              multiline
              style={{ minHeight: 140 }}
            />
            <View style={s.modalInfo}>
              <Ionicons name="information-circle-outline" size={16} color={MD3.primary} />
              <Text style={s.modalInfoText}>관리자 검토 후 게시됩니다.</Text>
            </View>
            <M3Button label="게시글 등록" onPress={handleSubmit} style={{ marginTop: 8 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3.background },
  topBar: { backgroundColor: MD3.surface, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  headline: { fontSize: 28, fontWeight: '400', color: MD3.onSurface },

  // 메인 탭 바
  mainTabRow: {
    flexDirection: 'row',
    backgroundColor: MD3.surface,
    borderBottomWidth: 1,
    borderBottomColor: MD3.outlineVariant,
  },
  mainTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  mainTabActive: { borderBottomColor: MD3.primary },
  mainTabText: { fontSize: 14, fontWeight: '500', color: MD3.onSurfaceVariant },
  mainTabTextActive: { color: MD3.primary, fontWeight: '700' },
  tabBadge: {
    backgroundColor: MD3.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tabBadgeText: { fontSize: 11, fontWeight: '700', color: MD3.onPrimary },

  // 커뮤니티 칩 바
  chipBar: { backgroundColor: MD3.surface, borderBottomWidth: 1, borderBottomColor: MD3.outlineVariant },
  chipRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },

  section: { padding: 16 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionBullet: { width: 4, height: 16, borderRadius: 2, backgroundColor: MD3.primary },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: MD3.onSurface, flex: 1 },
  sectionCount: { fontSize: 13, color: MD3.onSurfaceVariant },

  // 게시글 카드
  postCard: { marginBottom: 12, padding: 16 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  catBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  catText: { fontSize: 12, fontWeight: '700' },
  postDate: { fontSize: 12, color: MD3.outline },
  postTitle: { fontSize: 16, fontWeight: '600', color: MD3.onSurface, marginBottom: 6 },
  postContent: { fontSize: 13, color: MD3.onSurfaceVariant, lineHeight: 20, marginBottom: 14 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatarMini: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: MD3.primaryContainer, alignItems: 'center', justifyContent: 'center',
  },
  avatarMiniText: { fontSize: 11, fontWeight: '700', color: MD3.onPrimaryContainer },
  authorName: { fontSize: 13, fontWeight: '600', color: MD3.onSurface },
  authorCompany: { fontSize: 12, color: MD3.onSurfaceVariant },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statNum: { fontSize: 12, color: MD3.onSurfaceVariant, marginRight: 6 },

  emptyCard: { alignItems: 'center', padding: 56, gap: 12 },
  emptyText: { fontSize: 15, color: MD3.onSurfaceVariant },

  // FAB
  fab: {
    position: 'absolute', right: 16, bottom: 16,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: MD3.primaryContainer, borderRadius: 16,
    paddingHorizontal: 20, paddingVertical: 14,
    elevation: 4,
    shadowColor: MD3.scrim,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  fabLabel: { fontSize: 14, fontWeight: '700', color: MD3.onPrimaryContainer },

  // Modal
  modalSafe: { flex: 1, backgroundColor: MD3.background },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 8, paddingVertical: 4,
    borderBottomWidth: 1, borderBottomColor: MD3.outlineVariant,
    backgroundColor: MD3.surface,
  },
  modalClose: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '500', color: MD3.onSurface },
  modalScroll: { flex: 1, padding: 24 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: MD3.primary, marginBottom: 10, letterSpacing: 0.5 },
  modalInfo: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: MD3.primaryContainer, borderRadius: 12, padding: 12, marginBottom: 16,
  },
  modalInfoText: { fontSize: 13, color: MD3.onPrimaryContainer },
});
