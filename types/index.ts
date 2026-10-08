export type UserRole = 'guest' | 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
  companyName: string;
  role: UserRole;
  isTenantVerified: boolean;
}

export type NoticeCategory =
  | 'construction'  // 공사: 인테리어·보수 공사, 소음·분진·냄새 작업, 공용부 공사
  | 'inspection'    // 점검: 단수·정전, 엘리베이터, 공조·냉난방, 소방·전기 설비 점검
  | 'parking'       // 주차·동선: 주차 혼잡, 전시 연계 혼잡, 출입구·통로 차단, 우회 동선
  | 'event'         // 이벤트: 입주사 행사, 코엑스 전시, 별마당 행사, 제휴 혜택
  | 'operations';   // 운영·기타: 운영시간, 이용 규정, 청소·방역, 신청 마감, 관리 안내

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  content: string;
  targetBuilding: string;
  startDate: string;
  endDate: string;
  isUrgent: boolean;
  attachmentUrl?: string;
  imageUrl?: string;
  contactPhone?: string;
  createdAt: string;
}

export type BenefitCategory = 'fnb' | 'shopping' | 'hotel' | 'exhibition';

export interface Benefit {
  id: string;
  title: string;
  brandName: string;
  category: BenefitCategory;
  description: string;
  discountText: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  couponId?: string;
  isActive: boolean;
  usageMethod: string;
  notes: string;
}

export type CouponStatus = 'available' | 'used' | 'expired';

export interface Coupon {
  id: string;
  title: string;
  benefitId: string;
  brandName: string;
  code: string;
  qrUrl?: string;
  barcodeUrl?: string;
  startDate: string;
  endDate: string;
  status: CouponStatus;
  downloadedAt?: string;
  usedAt?: string;
}

export interface CoexEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
  officialUrl: string;
  isActive: boolean;
  hasTenantDiscount: boolean;
}

export type PostCategory =
  | 'recruitment'
  | 'secondhand'
  | 'event'
  | 'partnership'
  | 'brand'
  | 'poll';

export type PostStatus =
  | 'published'
  | 'draft'
  | 'hidden'
  | 'reported'
  | 'deleted'
  | 'completed';

export interface CommunityPost {
  id: string;
  userId: string;
  authorName: string;
  companyName: string;
  category: PostCategory;
  title: string;
  content: string;
  imageUrl?: string;
  contact?: string;
  email?: string;
  link?: string;
  status: PostStatus;
  viewCount: number;
  commentCount: number;
  createdAt: string;
}

export type ParkingStatus = 'free' | 'busy' | 'full' | 'unknown';

export interface ParkingInfo {
  parkingName: string;
  status: ParkingStatus;
  updatedAt: string;
}

export interface ContactDept {
  id: string;
  name: string;
  phone: string;
  icon: string;
}

// ── Poll / Survey ──────────────────────────────────────────

export type QuestionType = 'single' | 'multiple' | 'text' | 'score' | 'rating';

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface PollQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: PollOption[];
  required: boolean;
  minScore?: number;
  maxScore?: number;
}

export type PollStatus = 'upcoming' | 'ongoing' | 'ended';

export interface Poll {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  isAnonymous: boolean;
  allowMultiple: boolean;
  questions: PollQuestion[];
  showResults: boolean;
  totalParticipants: number;
  status: PollStatus;
  createdAt: string;
}

// 사용자 응답 (로컬 상태용)
export type AnswerMap = Record<string, string | string[] | number>;

