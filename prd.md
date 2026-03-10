# PRD: 위즈더플래닝 홈페이지 전면 개편 (v4)

> **최종 업데이트**: 2026-03-08
> **프로토타입 참조**: `wiztheplanning-prototype.jsx` (React 아티팩트)
> **Claude Code에서 이 문서를 기반으로 Next.js 프로젝트를 구현한다.**

---

## 1. 프로젝트 개요

### 1.1 목적
wiztheplanning.com 홈페이지를 전면 개편한다. 인트로 모션그래픽(약 35초) → 메인 허브(2x3 서비스 그리드) → 서비스 6대 영역 독립 페이지 → 업종별 큐레이션 구조로 전환한다.

### 1.2 핵심 변경사항 (기존 PRD 대비)
- 서비스 5대 영역 → 6대 영역 (타겟핏마케팅 추가)
- 배달앱 관리 → 배달플랫폼 마케팅 명칭 변경
- 미디어 광고 → 미디어 마케팅 (6개 매체 파트너: FOCUSMEDIA, TOWNBOARD, MEDIAMEET, CGV, MEGABOX, HTPOST)
- 인트로: 15초 영상 → 35초 타이포그래피 기반 모션그래픽 (11개 씬)
- 메인 그리드: 2x3 동일 비율 풀블리드 그리드
- 각 서비스 그리드 셀별 고유 폰트 적용
- 서비스 상세 페이지: 카페24 한국형 상업 스타일 (흰 배경, 깔끔한 카드형)

### 1.3 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 스타일링 | Tailwind CSS |
| 폰트 | Google Fonts: Noto Sans KR, Black Han Sans, Do Hyeon, Jua, Gothic A1, Gugi |
| 영상 처리 | HTML5 video + Intersection Observer |
| 애니메이션 | CSS @keyframes + Framer Motion (인트로 씬 전환, 스크롤 효과) |
| 호스팅 | Vercel (현행 유지) |
| 분석 | Google Analytics 4 + 네이버 애널리틱스 |

### 1.4 레퍼런스 사이트

| 사이트 | 참고 포인트 |
|--------|------------|
| playd.com | 풀스크린 영상 + 대형 한글 타이포 오버레이 |
| nine2021.com | 미니멀 다크 + 로고 리빌 |
| hotissuemedical.com | 풀스크린 비주얼 그리드, 셀별 다른 비주얼 아이덴티티 |

---

## 2. 디자인 시스템

### 2.1 컬러 팔레트

기본 컬러:
- Primary Dark: #000000 (인트로 배경, 메인 그리드 기본)
- Primary Blue: #2B8FBF (W 로고 심볼, 인트로 포인트)
- Accent Red: #DC2626 (강조, 글로우)
- Background Warm: #F2F1EC (업종 섹션 배경)
- White: #FFFFFF (서비스 상세 페이지 배경)
- Contact BG: #111111 (문의 섹션)
- Footer BG: #080808 (푸터)

서비스 영역별 포인트 컬러 + 폰트:

| 서비스 | 컬러 | 폰트 | 그리드 배경 그라데이션 |
|--------|------|------|---------------------|
| 미디어 마케팅 | #DC2626 | Black Han Sans | linear-gradient(160deg,#1a0a0a,#2d1015 60%,#3d151a) |
| 퍼포먼스 마케팅 | #2563EB | Do Hyeon | linear-gradient(160deg,#0a0f1f,#0f1a35 60%,#142550) |
| 콘텐츠 마케팅 | #8B5CF6 | Jua | linear-gradient(160deg,#150a25,#251540 60%,#351f5a) |
| 배달플랫폼 마케팅 | #EA580C | Gugi | linear-gradient(160deg,#12100a,#1e1a10 60%,#2a2415) |
| 타겟핏 마케팅 | #DB2777 | Gothic A1 | linear-gradient(160deg,#1a0a18,#2d0f28 60%,#401540) |
| 촬영/제작 | #059669 | Noto Sans KR | linear-gradient(160deg,#0a1210,#0f201a 60%,#153025) |

인트로 배경 변화 (씬별):

| 씬 | 배경색 | 텍스트 색상 |
|----|--------|-----------|
| S1~S2 | #000 (블랙) | 흰색 |
| S3 | #fff (화이트 반전) | 다크 #111 + 틸블루 포인트 |
| S4 | #000 | 서비스별 고유 컬러 키워드 |
| S5 | #0a0f20 (딥네이비) | 흰색 |
| S6 | #000 | 흰색, MEDIA만 레드 |
| S7 | #f5f5f0 (웜화이트 반전) | 레드 340% + 다크 |
| S8~S10 | #000 | 흰색 + 틸블루/레드 포인트 |

### 2.2 타이포그래피

- 한글 기본: Noto Sans KR (300/400/700/900)
- 그리드 셀별: 서비스별 고유 폰트 (위 표 참조)
- 인트로 멘트: Noto Sans KR 900, clamp(36px,9vw,92px)
- 섹션 타이틀: Noto Sans KR 900, clamp(26px,3.5vw,42px)
- 본문: Noto Sans KR 400, 14~16px
- CTA 버튼: Noto Sans KR 700, 12~13px
- 라벨/캡션: Gothic A1 400, 9~11px, tracking 0.15em~0.35em

### 2.3 UI 규칙

- 카페24 한국형 상업 스타일: AI 생성 느낌 배제
- border-radius: 0 (서비스 상세 페이지 카드만 0~2px)
- 그라데이션: 그리드 셀 배경에만 사용, UI 요소에는 사용 금지
- 동그란 원/파티클/대시보드 차트: 사용 금지 (AI 느낌 유발)
- 글자 가시성: 어두운 배경 위 텍스트 opacity 최소 0.4 이상

---

## 3. 사이트 구조

### 3.1 라우팅

```
/                        → 인트로 + 메인 (SPA 전환)
/media                   → 미디어 마케팅 (6개 매체 파트너)
/performance             → 퍼포먼스 마케팅
/contents                → 콘텐츠 마케팅
/delivery                → 배달플랫폼 마케팅
/targetfit               → 타겟핏 마케팅
/production              → 촬영/제작
/industry/[slug]         → 업종별 큐레이션
/portfolio               → 포트폴리오
/about                   → 회사 소개
/contact                 → 문의/상담
```

### 3.2 GNB

- 위치: fixed top, mix-blend-mode: difference
- 좌: "WIZ THE PLANNING" (11px, 700, tracking 0.15em)
- 우: SERVICES / PORTFOLIO / ABOUT / CONTACT (10px, tracking 0.18em)
- 모바일: 햄버거 메뉴 → 풀스크린 블랙 오버레이

---

## 4. 인트로 모션그래픽 (약 35초, 11 Scenes)

중요: 인트로는 CSS @keyframes 기반 타이포그래피 모션이다.
동그란 원/파티클/그래프/차트 등 AI 느낌 요소 사용 금지.
배경 색상이 씬마다 변한다 (블랙 → 화이트 → 네이비 → 화이트 → 블랙).

### Scene 타임라인

| Scene | 시작 | 배경 | 연출 | 핵심 효과 |
|-------|------|------|------|----------|
| S1 | 0s (즉시) | #000 | 격자 라인 드로잉 + 거대 WIZ splitReveal | 격자 5+3라인, clip-path 중앙에서 양쪽으로 |
| S2 | 2.5s | #000 | WIZ THE PLANNING 글자 하나씩 위에서 떨어짐 | dropIn (바운스), 십자라인 |
| S3 | 5.2s | #fff | 당신의/마케팅팀이/되겠습니다 | crashIn, slideUpBounce, wipeRight. 마케팅팀이=틸블루 |
| S4 | 8.8s | #000 | 서비스 키워드 12개 화면 곳곳에서 등장 | dropIn 각각, 중앙 6가지 솔루션 scaleUp |
| S5 | 12.5s | #0a0f20 | 5줄 마키 스크롤 + 중앙 모든 마케팅을 합니다 | 5줄 각기 다른 크기/속도/방향, 합니다 틸블루 |
| S6 | 16s | #000 | 6개 서비스명 좌우 교차 flipIn | MEDIA=레드, PERFORMANCE=블루 |
| S7 | 19s | #f5f5f0 | 340% 글자마다 터짐 + 4.8/5, 95% 드롭인 | typeChar(scale 0에서 1.3에서 1), Black Han Sans |
| S8 | 22.5s | #000 | 2016에서 2026 카운팅 + 1에서 10,000 가속 + 결과로 증명합니다 | flipIn, 연도 0.3초 간격, 결과 틸블루 |
| S9 | 27s | #000 | 모든 마케팅의 시작과 끝. | crashIn, 시작과 끝 레드 글로우 펄스 |
| S10 | 30s | #000 | W 로고 SVG 드로잉 + 글자 3D 회전 + 대형 버스트 | 3중 링 폭발 + 화면 플래시 + 시머 |
| S11 | 35s | #000 | 페이드아웃 → 메인 전환 | opacity 0.7s |

### 핵심 CSS 애니메이션

```css
crashIn     - scale(3)+rotate(15deg)+blur(15px) → 정위치
slideUpBounce - translateY(120%) → -8% → 0 (바운스)
wipeRight   - clip-path inset(0 100% 0 0) → inset(0)
dropIn      - translateY(-80px)+rotate(-10deg) → 바운스 안착
flipIn      - rotateY(90deg) → 0
typeChar    - scale(0) → 1.3 → 1 (글자별 터짐)
splitReveal - clip-path polygon(50%에서 0, 50%에서 100%) 양쪽 갈라짐
```

로고 버스트 (S10):
```css
flashWhite  - 화면 전체 흰색 플래시 0.8s
ringBurst1  - 링 scale 0.3→3, border 3px→0.5px (빠름)
ringBurst2  - 링 scale 0.3→5 (중간)
ringBurst3  - 링 scale 0.3→7 (느림)
explodeOut  - 중앙 글로우 scale 0→4
shimmer     - 텍스트 위 빛 스윕
```

### 인트로 하단 프로그레스 바

- 높이 2px, 색상 rgba(43,143,191,0.5)
- 씬 진행에 따라 width: (scene/11)*100%
- CLICK TO SKIP 텍스트 (9px, 0.15 opacity)
- 클릭 시 즉시 S11 → 메인 전환

---

## 5. 메인 허브 (인트로 종료 후)

### 5.1 서비스 그리드 (2x3 동일 비율)

```
+---------------+----------------+
| 미디어 마케팅   | 퍼포먼스 마케팅  |  33.33vh
+---------------+----------------+
| 콘텐츠 마케팅   | 배달플랫폼 마케팅 |  33.33vh
+---------------+----------------+
| 타겟핏 마케팅   | 촬영/제작       |  33.34vh
+---------------+----------------+
width: 100%, height: 100vh
grid-template-columns: 1fr 1fr
grid-template-rows: 33.33vh 33.33vh 33.34vh
gap: 0 (셀 간 빈틈 없음)
```

각 셀 구조:
1. 배경: 서비스별 그라데이션 (호버 시 scale 1.08, transition 0.7s)
2. 데코: radial-gradient 포인트 (opacity 0.25)
3. 워터마크: 서비스별 영문명, 거대 폰트, opacity 0.04 → 호버 시 0.08
4. 좌상단: 라벨 (Gothic A1, 9px, tracking 0.2em, opacity 0.4)
5. 좌하단: 서비스명 (서비스별 고유 폰트, 900, 18~32px)
6. 서브타이틀: 호버 시 opacity 0→1, translateY 4px→0
7. 화살표 아이콘: 호버 시 opacity 0.2→0.7

### 5.2 업종별 큐레이션 섹션

- 배경: #f2f1ec
- 제목: 어떤 업종이세요?
- 3x2 그리드, gap 1px, 배경 rgba(0,0,0,0.08)
- 각 카드: 호버 시 bg-white → bg-black, 텍스트 반전

업종 데이터:

| 업종 | 추천 서비스 |
|------|-----------|
| 병원/의료 | 퍼포먼스 + 콘텐츠 + 미디어 |
| 음식점 | 퍼포먼스 + 콘텐츠 + 촬영/제작 |
| 배달 전문 | 배달플랫폼 + 퍼포먼스 + 촬영/제작 |
| 부동산 | 미디어 + 퍼포먼스 + 콘텐츠 |
| 학원/교육 | 퍼포먼스 + 콘텐츠 + 미디어 |
| 뷰티/운동 | 퍼포먼스 + 콘텐츠 + 촬영/제작 |

### 5.3 문의/상담 섹션

- 배경: #111
- 좌: 전화 (1670-0704), 카카오톡 (@위즈더플래닝마케팅), 이메일
- 우: 상담 폼 (이름, 연락처, 가게명, 문의사항)
- 카카오톡 버튼: bg-yellow-400

### 5.4 모바일 하단 CTA

- position: fixed bottom, z-index 40
- 좌: 전화 상담 (흰 텍스트), 우: 카카오톡 (노란 배경)
- 데스크톱에서는 숨김

### 5.5 푸터

- 배경: #080808
- 회사 정보: 대표 정현우, 사업자등록번호 668-81-00391
- 주소: 서울시 금천구 가산디지털로 178 2518,2519호
- 1670-0704 | wiz@wiztheplanning.com

---

## 6. 서비스 상세 페이지 (카페24 스타일)

모든 서비스 상세 페이지는 동일한 레이아웃을 사용한다.
배경은 흰색 기반, 카드형 깔끔한 디자인.

### 6.1 공통 레이아웃

```
[1] 상단 네비바: fixed, 흰 배경 + blur(10px), ← 메인으로 / WIZ THE PLANNING
[2] 히어로: minHeight 70vh, 서비스별 그라데이션 배경
    - 비디오 플레이 버튼 (placeholder)
    - 라벨 / 서비스명 / 설명
[3] 태그바: 흰 배경, 서비스 키워드 칩
[4] 서비스 상세: #fafafa 배경, 카드형
[5] CTA: 서비스 고유 액센트 컬러 배경, 무료 상담 받기
```

### 6.2 미디어 마케팅 — 특수 구조 (6개 매체 파트너)

미디어 마케팅 페이지만 서비스 상세 섹션이 6개 매체별 카드로 구성된다.

| 매체 | 컬러바 | 핵심 데이터 |
|------|--------|----------|
| FOCUSMEDIA | #2563EB | 4,600단지, 6만대, 점유율 64% |
| TOWNBOARD | #DC2626 | 3,650단지, 67,517대, 237만 세대 |
| GS MEDIAMEET | #3B82F6 | 13,472대 |
| CGV 스크린광고 | #E11D48 | 196개 극장, 1,373스크린, 월 500만명 |
| MEGABOX 스크린광고 | #7C3AED | 100개 극장, 686스크린, 월 300만명 |
| HTPOST | #059669 | 전국 아파트 우편함 |

각 매체별 상세 데이터:

FOCUSMEDIA:
- 수도권 No.1 엘리베이터TV. 매일 반복적으로 만나는 생활밀착형 미디어
- 입주민 일평균 4.1회 이상 이용, 광고 주목도 49%, 회피율 20%
- 서울 68% / 경기 63% / 인천 61% 점유율
- 입주민 월 평균 소득 685만원, 구매 가능성 높은 소비자
- 동네상권 광고 인지율 82%, 구전 경험 47%
- 아파트 단지 단위 판매, 15초 일 90회 송출

TOWNBOARD:
- 전국 아파트 1,100만 가구(52%) 대상 일상 속 미디어 광고
- 하루 4회 이상, 매주 30회 이상 반복 노출
- 광고 인지도 1.6배 상승, 구매 경험 31%
- 엘리베이터 내부 25인치 + 외부 50/55인치 송출
- 래미안/자이/힐스테이트 등 대한민국 대표 아파트 입점
- 심의 필증 없이 빠른 광고 집행 가능
- 모니터 1대당 1일 최대 100회 보장 송출

GS MEDIAMEET:
- 가시성 및 주목도가 높은 아파트 엘리베이터TV
- 일평균 EV 이용 6회 이상 60%, 미디어 시청 빈도 96%
- 15초 일 100회 송출, 1개월 단위 집행
- 패키지/로컬 광고 모두 가능
- 전국 수도권 9,600대 + 지방 3,800대
- 3/6/12개월 계약 시 10/20/30% 할인

CGV 스크린광고:
- 연간 약 2억 명 관람객에게 18.4% 낮은 회피율로 도달
- 광고 노출률 91%의 압도적 도달력
- 2030 핵심 소비층 60% 이상 집중
- SMART 상품: 1/4 Cov. 월 0.9억원부터
- 지역 타깃팅으로 지점별 로컬 광고 가능

MEGABOX 스크린광고:
- 100개 극장, 평균 노출률 98%
- 대형 쇼핑몰 입점 시너지로 즉시 방문 효과
- 메가M 상품: All 108개 극장 월 0.1억원부터
- 총 광고 시간 300초, 15초/30초 구좌

HTPOST:
- 아파트 우편함 직접 전달형 인쇄 광고
- 전단지/쿠폰/샘플 배포 가능
- 단지별 세밀한 타깃팅
- 온라인과 결합한 O2O 마케팅 효과

### 6.3 기타 서비스 페이지 데이터

퍼포먼스 마케팅:
- 태그: 플레이스 최적화, 파워링크, 블로그 SEO, 검색광고
- 상세: 플레이스 최적화 / 파워링크 / 블로그 SEO / 성과 리포트

콘텐츠 마케팅:
- 태그: 브랜드블로그, 체험단, SNS운영, 인스타그램
- 상세: 브랜드블로그 / 체험단 / SNS 대행 / 리뷰 관리

배달플랫폼 마케팅:
- 태그: 배민, 요기요, 쿠팡이츠, 메뉴최적화
- 상세: 앱 등록 & 세팅 / 메뉴 최적화 / 프로모션 / 리뷰 관리

타겟핏 마케팅:
- 태그: 정밀 타깃팅, 데이터 분석, 맞춤 광고, 전환 최적화
- 상세: 데이터 분석 / 정밀 타깃팅 / 전환 최적화 / 리타깃팅

촬영/제작:
- 태그: 매장사진, 숏폼영상, 메뉴판, 전단지
- 상세: 매장 촬영 / 숏폼 영상 / 메뉴판/전단지 / 명함/배너

---

## 7. W 로고 심볼

W 심볼은 SVG로 구현한다. AI 파일 기반.

- 색상: #2B8FBF (틸블루)
- 구조: 겹치는 V 라인 3겹 (메인 strokeWidth 8 / 서브 5 / 이너 3)
- 텍스트: WIZ THE PLANNING thin weight, wide letter-spacing
- 인트로 S10에서 SVG drawPath 애니메이션으로 리빌

---

## 8. 데이터 타입 (TypeScript)

```typescript
interface Service {
  id: string;
  label: string;
  name: string;
  bigText: string;
  heroTitle: string;
  font: string;
  subtitle: string;
  accent: string;
  description: string;
  tags: string[];
  bgGradient: string;
  decoGradient: string;
  heroBg: string;
  heroDeco: string;
  features: Feature[];
  media?: MediaPartner[];
}

interface Feature {
  title: string;
  description: string;
}

interface MediaPartner {
  name: string;
  subtitle: string;
  color: string;
  stats: string;
  description: string;
  points: string[];
}

interface Industry {
  name: string;
  copy: string;
  services: string;
}
```

---

## 9. 폴더 구조 (Next.js App Router)

```
app/
  layout.tsx
  page.tsx                    # 인트로 + 메인 허브
  globals.css                 # Tailwind + @keyframes
  (services)/
    media/page.tsx            # 미디어 마케팅 (6개 매체)
    performance/page.tsx
    contents/page.tsx
    delivery/page.tsx
    targetfit/page.tsx
    production/page.tsx
  industry/[slug]/page.tsx
  portfolio/page.tsx
  about/page.tsx
  contact/page.tsx

components/
  intro/
    IntroSequence.tsx         # 인트로 전체 컨트롤러
    Scene01~Scene10.tsx       # 각 씬 컴포넌트
  layout/
    GNB.tsx
    Footer.tsx
    MobileCTA.tsx
  main/
    ServiceGrid.tsx           # 2x3 서비스 그리드
    GridCell.tsx
    IndustrySection.tsx
    ContactSection.tsx
  service/
    ServiceHero.tsx
    ServiceTags.tsx
    ServiceFeatures.tsx       # 일반 서비스 2x2 카드
    MediaPartners.tsx         # 미디어 마케팅 전용 6개 매체
    ServiceCTA.tsx
  shared/
    WLogo.tsx
    YearCounter.tsx
    NumCounter.tsx

data/
  services.ts
  industries.ts
  media-partners.ts
  intro-keywords.ts
```

---

## 10. 개발 Phase

### Phase 1: 기본 구조 (1주)
- Next.js 14+ 프로젝트 셋업 (App Router)
- Tailwind CSS 설정, Google Fonts 로드
- GNB + Footer + 라우팅 구조
- 6개 서비스 데이터 파일 생성
- 2x3 서비스 그리드 (호버 효과 포함)
- 업종 섹션 + 문의 섹션 + 모바일 CTA

### Phase 2: 서비스 상세 페이지 (1주)
- 공통 서비스 상세 레이아웃
- 미디어 마케팅: 6개 매체 파트너 카드 구현
- 나머지 5개 서비스 페이지
- 반응형 (모바일 1열)

### Phase 3: 인트로 모션그래픽 (1주)
- CSS @keyframes 전체 등록
- 11개 씬 컴포넌트 구현
- 씬 타이머 + 스킵 로직
- 배경 색상 다이나믹 전환
- 로고 버스트 효과
- 프로그레스 바
- 재방문 시 스킵 옵션

### Phase 4: 마무리 (0.5주)
- SEO 메타데이터
- GA4 + 네이버 애널리틱스
- OG 이미지
- 성능 최적화
- Vercel 배포

---

## 11. 참고사항

### 영상 파일
인트로는 CSS 애니메이션으로 구현되므로 MP4 불필요. 향후 서비스 상세 페이지 히어로에 영상 삽입 예정이므로 video placeholder 구조만 구현.

### 프로토타입
wiztheplanning-prototype.jsx에 전체 인트로 + 메인 + 서비스 상세 페이지가 단일 파일로 구현되어 있다. 실제 구현 시 컴포넌트 분리하여 Next.js 구조에 맞게 재구성할 것.
