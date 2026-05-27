// 방문객 페이지 다국어 리소스 (KR / EN)
export type Lang = 'KR' | 'EN';

export const I18N = {
  // ── 게이트웨이 화면 ──────────────────────────────────────────
  gateway: {
    welcome: {
      KR: '안녕하세요!\n무역센터(WTCSEOUL) 방문을\n환영합니다.',
      EN: 'Welcome to\nWTCSEOUL!',
    },
    tenantTitle: { KR: '입주사 임직원이신가요?', EN: 'Tenant Staff' },
    tenantSub: { KR: '입주사 전용 어플 이용', EN: 'Access the tenant-only app' },
    visitorTitle: { KR: '일반 방문객이신가요?', EN: 'Visitor / Foreigner' },
    visitorSub: {
      KR: '실시간 주차, 코엑스 전시 일정,\n복합몰 맛집 및 K-컬처 명소 안내',
      EN: 'Parking status, COEX exhibitions,\ndining guide & K-Culture spots',
    },
  },

  // ── 방문객 메인 헤더 ─────────────────────────────────────────
  visitor: {
    headerTitle: { KR: 'WTCSEOUL 방문객 안내', EN: 'WTCSEOUL Visitor Guide' },
    headerSub: { KR: '무역센터에 오신 것을 환영합니다', EN: 'Welcome to World Trade Center Seoul' },

    // ① 주차
    parkingTitle: { KR: '실시간 주차 현황', EN: 'Parking Status' },
    parkingRate: { KR: '현재 주차율', EN: 'Current Parking Rate' },
    parkingStatus: { KR: '혼잡 여부', EN: 'Congestion Level' },
    parkingFreeLabel: { KR: '여유', EN: 'Available' },
    parkingBusyLabel: { KR: '혼잡', EN: 'Busy' },
    parkingFullLabel: { KR: '만차', EN: 'Full' },
    parkingFreeMsg: {
      KR: '현재 주차 공간에 여유가 있습니다.\n지하 주차장을 편리하게 이용하세요!',
      EN: 'There is plenty of parking space available.\nEnjoy convenient parking in our underground garage!',
    },
    parkingBusyMsg: {
      KR: '주차장이 다소 혼잡합니다. 대중교통 이용을 권장합니다.',
      EN: 'The parking lot is somewhat busy. Public transportation is recommended.',
    },

    // ② 코엑스 전시
    coexTitle: { KR: '이번 주 코엑스 전시회', EN: 'COEX Exhibitions This Week' },
    coexBtn: { KR: '전체 일정 보기', EN: 'View Full Schedule' },
    coexEvents: [
      {
        KR: { title: '국제인공지능대전', date: '05.06 ~ 05.08', hall: 'A홀' },
        EN: { title: 'AI Expo Korea 2026', date: 'May 06 ~ May 08', hall: 'Hall A' },
      },
      {
        KR: { title: '국제 전기전력 전시회', date: '05.06 ~ 05.08', hall: 'C홀' },
        EN: { title: 'International Electric Power Exhibition', date: 'May 06 ~ May 08', hall: 'Hall C' },
      },
      {
        KR: { title: '제62회 백상예술대상', date: '05.08', hall: 'D홀' },
        EN: { title: 'The 62nd Baeksang Arts Awards', date: 'May 08', hall: 'Hall D' },
      },
      {
        KR: { title: '2026 서울머니쇼', date: '05.07 ~ 05.09', hall: 'B홀' },
        EN: { title: 'Seoul Money Show 2026', date: 'May 07 ~ May 09', hall: 'Hall B' },
      },
      {
        KR: { title: 'KOBA 2026', date: '05.12 ~ 05.15', hall: 'B·C·D홀' },
        EN: { title: 'KOBA 2026', date: 'May 12 ~ May 15', hall: 'Hall B, C, D' },
      },
    ],

    // ③ 스타필드 식당
    diningTitle: { KR: '스타필드 코엑스몰 식당 안내', EN: 'Starfield Coex Mall Dining Guide' },
    diningDesc: {
      KR: '삼성역 최고의 핫플레이스!\n스타필드몰에서 즐기는 맛있는 한 끼.',
      EN: 'The best culinary hotspot in Samseong-dong!\nEnjoy a delicious meal at Starfield Coex Mall.',
    },
    diningBtn: { KR: '식당 안내 보기', EN: 'View Dining Guide' },

    // ④ 교통/편의
    travelTitle: { KR: '글로벌 교통 및 편의 서비스', EN: 'Travel Convenience Services' },
    limoTitle: { KR: '도심공항 리무진 버스', EN: 'Airport Limousine Bus' },
    limoDesc: {
      KR: '인천공항까지 가장 편안하고 빠르게!\n무역센터에서 바로 출발하는 공항 리무진 버스 정보를 확인하세요.',
      EN: 'The fastest way to Incheon Airport!\nTake the limousine bus directly from WTCSEOUL.',
    },
    limoBtn: { KR: '시간표 보기', EN: 'View Schedule' },
    luggageTitle: { KR: 'GOODLUG 짐 배송 서비스', EN: 'GOODLUG Luggage Delivery' },
    luggageDesc: {
      KR: '무거운 캐리어는 당일 공항/호텔로 먼저 보내고,\n무역센터를 빈손으로 가볍게 여행하세요!',
      EN: 'Deliver your heavy suitcases to the airport/hotel on the same day,\nand enjoy WTCSEOUL hands-free!',
    },
    luggageBtn: { KR: '예약하기', EN: 'Book Now' },

    // ⑤ 편의시설
    amenitiesTitle: { KR: '편의시설 및 약자 배려 서비스', EN: 'Amenities & Accessibility' },
    amenities: [
      {
        icon: 'accessibility-outline' as const,
        KR: { title: '유모차 & 휠체어 대여', desc: '지하 1층 센트럴플라자/라이브플라자\n안내데스크 무료 대여' },
        EN: { title: 'Stroller & Wheelchair Rental', desc: 'B1F Starfield Coex Mall\n(Central/Live Plaza Info Desk) - Free' },
      },
      {
        icon: 'heart-outline' as const,
        KR: { title: '수유실 / 유아휴게실', desc: '지하 1층 라이브플라자 및\n메가박스 진입로 인근' },
        EN: { title: 'Baby Care Room', desc: 'B1F, near Live Plaza & Megabox' },
      },
      {
        icon: 'medical-outline' as const,
        KR: { title: '의무실 / 응급의료센터', desc: '1층 동문 안내데스크 옆\n응급 처치실' },
        EN: { title: 'First Aid Room', desc: '1F, next to the East Gate Info Desk' },
      },
      {
        icon: 'moon-outline' as const,
        KR: { title: '기도실', desc: '3층 아셈홀 인근\n글로벌 무슬림/다종교 방문객용 (세족실 포함)' },
        EN: { title: 'Prayer Room', desc: '3F, near Asem Hall\n(wudu station equipped)' },
      },
    ],

    // ⑥ K-컬처 명소
    attractionsTitle: { KR: '주변 볼거리 & K-컬처 명소', EN: 'Nearby Attractions & K-Culture' },
    attractions: [
      { icon: 'musical-notes-outline' as const, KR: '강남스타일 말춤 동상', EN: 'Gangnam Style Statue', category: { KR: 'K-POP', EN: 'K-POP' } },
      { icon: 'tv-outline' as const, KR: '아티움 미디어', EN: 'Artium Media', category: { KR: '미디어', EN: 'Media' } },
      { icon: 'camera-outline' as const, KR: 'S-live 갤러리', EN: 'S-live Gallery', category: { KR: '갤러리', EN: 'Gallery' } },
      { icon: 'storefront-outline' as const, KR: 'Ktown4u 문화체험', EN: 'Ktown4u K-Culture', category: { KR: 'K-POP', EN: 'K-POP' } },
      { icon: 'library-outline' as const, KR: '별마당 도서관', EN: 'Starfield Library', category: { KR: '문화', EN: 'Culture' } },
      { icon: 'leaf-outline' as const, KR: '봉은사 사찰', EN: 'Bongeunsa Temple', category: { KR: '문화', EN: 'Culture' } },
      { icon: 'fish-outline' as const, KR: '코엑스 아쿠아리움', EN: 'COEX Aquarium', category: { KR: '액티비티', EN: 'Activity' } },
      { icon: 'film-outline' as const, KR: '메가박스 필름 소사이어티', EN: 'Megabox Film Society', category: { KR: '영화', EN: 'Cinema' } },
      { icon: 'ice-cream-outline' as const, KR: '배스킨라빈스 콘셉트 스토어', EN: 'Baskin Robbins Concept Store', category: { KR: '맛집', EN: 'Food' } },
    ],
  },
};

// 외부 링크 URL
export const EXTERNAL_URLS = {
  coex: 'https://www.coex.co.kr/event/full-schedules/',
  dining: 'https://m.starfield.co.kr/coexmall/cafeDining/main',
  limo: 'https://www.calt.co.kr/',
  luggage: 'https://www.goodlugg.com/',
};
