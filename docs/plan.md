# 미디어 마케팅 상세페이지 리디자인 계획

## Context

현재 미디어 마케팅 페이지(`/media`)의 MediaPartnerCard가 텍스트 위주 작은 카드로 되어 있어
제안서의 풍부한 콘텐츠가 전혀 반영되지 않음. 제안서 내용을 토대로 각 미디어 파트너를
상세페이지(랜딩페이지) 형식으로 리디자인.

---

## 변경 전략

**기존**: ServiceFeatures 안에 MediaPartnerCard 6개 나열 (작은 흰 카드, 텍스트만)
**변경**: 각 미디어 파트너를 풀 너비 섹션으로 확장, 랜딩페이지 느낌의 리치 레이아웃

---

## 1. 타입 확장 (`types/index.ts`)

```typescript
export interface StatItem {
  value: string   // "4,600" "64%" "6만대"
  label: string   // "단지" "점유율" "설치"
}

export interface Highlight {
  title: string
  description: string
}

export interface MediaPartner {
  name: string
  subtitle: string
  color: string
  stats: string              // 기존 유지 (한줄 요약)
  description: string
  points: string[]
  tagline: string            // NEW: 핵심 슬로건 (큰 글씨)
  statItems: StatItem[]      // NEW: 큰 숫자 통계 (3~4개)
  highlights: Highlight[]    // NEW: 상세 특징 카드 (4개)
  coverage?: string          // NEW: 커버리지/네트워크 요약
}
```

---

## 2. 미디어 파트너 데이터 보강 (`data/media-partners.ts`)

각 파트너별 추가 데이터 (PDF 제안서 기반):

### FOCUSMEDIA
```
tagline: "수도권을 가장 확실하게 공략하는 No.1 엘리베이터TV"
statItems: [
  { value: "4,600+", label: "단지" },
  { value: "6만", label: "설치 대수" },
  { value: "64%", label: "수도권 점유율" },
  { value: "685만", label: "입주민 월평균 소득" }
]
highlights: [
  { title: "수도권 압도적 점유율", description: "서울 68%, 경기 63%, 인천 61%로 수도권 엘리베이터TV 시장을 장악" },
  { title: "고소득 프리미엄 타겟", description: "입주민 월 평균 소득 685만원, 소비지출 259만원. 일반 소비자 대비 +142만원 Gap" },
  { title: "검증된 구전 효과", description: "동네상권 광고 인지율 82%, 입주민 47%가 광고 내용을 주변에 이야기한 경험" },
  { title: "동네상권 맞춤 타겟팅", description: "아파트 단지 단위 판매, 15초 일 90회 송출. 대단지·랜드마크·프리미엄 아파트 선별" }
]
coverage: "서울·수도권 대단지 중심 — SUMMIT, ACRO, FORENA, LIEL, 현대, IPARK 등"
```

### TOWNBOARD
```
tagline: "삶에 녹아드는 곳에서 시작되는 전국구 아파트 미디어"
statItems: [
  { value: "3,650", label: "단지" },
  { value: "67,517", label: "모니터" },
  { value: "237만", label: "세대" },
  { value: "617만", label: "시청자" }
]
highlights: [
  { title: "전국 최대 커버리지", description: "수도권 2,155단지 / 충청 455 / 부산경남 544 / 대구경북 365단지 전국 커버" },
  { title: "엘리베이터 내·외부 동시 노출", description: "내부 25인치(56,000대) + 외부 50/55인치(10,241대)로 이용 전 동선까지 장악" },
  { title: "구매 결정에 직접 영향", description: "인지 58.1% → 정보획득 54.9% → 호감 38.3% → 구매도움 34.5% 퍼널 입증" },
  { title: "심의 없이 빠른 집행", description: "심의 필증 없이 빠르게 광고 집행 가능. 병원·학원 등 시즌 마케팅에 즉시 대응" }
]
coverage: "전국 3,650단지 — 래미안, 자이, 힐스테이트, 아이파크, SK VIEW 등"
```

### GS MEDIAMEET
```
tagline: "검증된 광고 주목도와 구매전환율, 엘리베이터TV"
statItems: [
  { value: "13,472", label: "설치 대수" },
  { value: "96%", label: "시청 빈도" },
  { value: "55%", label: "상품 인지도" },
  { value: "60%", label: "일평균 6회+ 이용" }
]
highlights: [
  { title: "강제 노출형 공간 점유 미디어", description: "밀폐된 공간 내 유일한 미디어로 탑승 중 강제 노출 효과. 이용 횟수연금 60% 이상" },
  { title: "높은 시청 및 전환율", description: "미디어 시청 빈도 96%, 상품 인지도 55%로 EV 광고 중 최상위 전환율 기록" },
  { title: "유연한 상품 구조", description: "전국/수도권/지방 패키지부터 로컬 단지 단위 집행까지. 3/6/12개월 할인 적용" },
  { title: "55인치 대형 전자게시대", description: "엘리베이터 대기 공간 다양한 컨텐츠 제공. 가시성 높은 55인치 미디어" }
]
coverage: "전국 — 수도권 9,600대 + 지방 3,800대"
```

### CGV 스크린광고
```
tagline: "연간 2억 관객에게 가장 몰입도 높은 순간 광고"
statItems: [
  { value: "196", label: "극장" },
  { value: "1,373", label: "스크린" },
  { value: "500만", label: "월 관람객" },
  { value: "91%", label: "광고 노출률" }
]
highlights: [
  { title: "압도적 몰입 환경", description: "대형 스크린 + 서라운드 사운드 + 어두운 공간. 광고 회피율 10.8%로 매체 중 최저" },
  { title: "2030 핵심 소비층 집중", description: "20대 39.4% + 30대 39.7%로 60% 이상이 핵심 소비층. 구매력 높은 타깃" },
  { title: "14년 연속 소비자 선택 1위", description: "글로벌 멀티플렉스 5위, 국내 점유율 50%. 브랜드 신뢰도가 광고 효과로 직결" },
  { title: "로컬 지점 타깃팅", description: "원하는 극장·지점 선택으로 상권 단위 집행. 상영 후 즉시 방문 효과" }
]
coverage: "전국 196개 극장 — SMART/GOLD/PREMIUM 상품 선택"
```

### MEGABOX 스크린광고
```
tagline: "프리미엄 문화공간에서 만나는 브랜드 경험"
statItems: [
  { value: "100", label: "극장" },
  { value: "686", label: "스크린" },
  { value: "300만", label: "월 관람객" },
  { value: "98%", label: "광고 노출률" }
]
highlights: [
  { title: "노출률 98% 달성", description: "CGV보다 높은 98% 노출률. 프리미엄 이미지를 선호하는 관람층 중심 브랜드 연계" },
  { title: "쇼핑몰 입점 시너지", description: "대형 쇼핑몰·복합문화공간 다수 입점. 상영 후 즉시 방문·소비로 이어지는 동선" },
  { title: "합리적 가격 구조", description: "메가M All 108극장 월 0.1억원부터. CGV 대비 낮은 진입 장벽" },
  { title: "로컬 광고 최적화", description: "지역 기반 광고주를 위한 합리적 가격. 꼼꼼한 컨설팅과 결과 보고 제공" }
]
coverage: "전국 100개 극장 — 메가M 오프닝/하이라이트/클라이맥스/엔드"
```

### HTPOST (데이터 정정)
```
name: 'HT POST' (변경)
subtitle: '아파트 디지털 미디어보드' (변경: 우편함→디지털보드)
color: '#059669'
stats: '전국 4,400대 · 94개 단지 · 55인치 사이니지' (변경)
tagline: "가장 프라이빗한 공간에서의 가장 대중적인 노출"
statItems: [
  { value: "4,400", label: "설치 대수" },
  { value: "94", label: "단지" },
  { value: "55인치", label: "대형 사이니지" },
  { value: "1만대", label: "2026 목표" }
]
description: (변경) 현대에이치티 홈네트워크 시장 점유율 1위 기업이 운영하는 아파트 로비·엘리베이터홀 디지털 미디어보드. 대형 55인치 고해상도 사이니지로 입주민 생활 필수 동선에서 매일 2~4회 이상 반복 노출.
highlights: [
  { title: "생활 동선 장악", description: "아파트 1층 로비, 엘리베이터 홀, 커뮤니티센터 등 입주민 필수 동선에 위치" },
  { title: "고소득 프리미엄 타겟", description: "주요 신축 단지 및 구매력 검증된 고소득 전문직·맞벌이 가구·자산가 계층 직접 노출" },
  { title: "신뢰 기반 브랜드 이미지", description: "아파트 게시판은 '우리 집의 일부'로 인식. 송출 브랜드에 대한 무의식적 신뢰 형성" },
  { title: "바이비 앱 연동 가능", description: "아파트 생활플랫폼 바이비(MAU 45만)와 온·오프라인 통합 패키지 집행 가능" }
]
points: (변경)
  - 전국 2,000만원 / 수도권 1,500만원 / 서울 600만원 월 패키지
  - 개별 단지 대당 10,000원부터 유연한 집행
  - 06:00~24:00 18시간 운영, 대당 1일 100회 이상 표출
  - 2026년 5,700대 추가 증설 예정, 총 1만대 규모
coverage: "전국 94개 단지 — 올림픽파크포레온, 잠실엘스, 디에이치퍼스티어 아이파크 등"
```

---

## 3. 새 컴포넌트: `MediaPartnerSection`

`components/service/MediaPartnerSection.tsx`

### 레이아웃 (각 파트너별 풀 너비 섹션)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [accent bar 4px]                                                      │
│                                                                       │
│  FOCUSMEDIA                                            (partner color) │
│  No.1 엘리베이터TV                                                     │
│                                                                       │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                              │
│  │ 4,600+│ │  6만  │ │  64%  │ │ 685만 │  ← 큰 숫자 통계               │
│  │ 단지  │ │설치대수│ │점유율 │ │월평균소득│                              │
│  └───────┘ └───────┘ └───────┘ └───────┘                              │
│                                                                       │
│  "수도권을 가장 확실하게 공략하는 No.1 엘리베이터TV"    ← tagline 큰 글씨 │
│                                                                       │
│  [기존 description 텍스트 - 18px, 행간 넉넉]                            │
│                                                                       │
│  ┌────────────────────┐ ┌────────────────────┐                         │
│  │ 수도권 압도적 점유율  │ │ 고소득 프리미엄 타겟│  ← 2×2 highlights 그리드│
│  │ 서울 68%...         │ │ 입주민 월 평균...   │                         │
│  ├────────────────────┤ ├────────────────────┤                         │
│  │ 검증된 구전 효과     │ │ 동네상권 맞춤 타겟팅 │                        │
│  │ 인지율 82%...       │ │ 단지 단위 판매...   │                         │
│  └────────────────────┘ └────────────────────┘                         │
│                                                                       │
│  커버리지: 서울·수도권 대단지 중심 — SUMMIT, ACRO...   ← coverage 한줄    │
│                                                                       │
│  [기존 points 불릿 → 보조 정보로 하단 배치]                               │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 스타일링 방향
- **배경**: 파트너별 어두운 그라데이션 배경 (accent 색상 기반, 매우 어둡게)
- **숫자 통계**: value는 clamp(32px, 5vw, 48px), 볼드, 흰색. label은 12px, 회색
- **tagline**: clamp(22px, 4vw, 36px), fontWeight 900, 흰색
- **highlights 카드**: 반투명 배경(rgba(255,255,255,0.05)), 좌측 accent 바 3px
- **각 섹션 높이**: min-height 없음, 콘텐츠에 맞게 자연스럽게
- **섹션 간 구분**: 미묘한 구분선 또는 배경색 변화 (홀수/짝수 교차)

---

## 4. ServiceFeatures 수정

```typescript
// media가 있으면 새 MediaPartnerSection 사용
{media ? (
  <div>
    {media.map((partner, i) => (
      <MediaPartnerSection key={i} partner={partner} index={i} />
    ))}
  </div>
) : (
  // 기존 2컬럼 Feature 그리드 유지
)}
```

---

## 5. 수정 파일 목록

| 파일 | 변경 |
|------|------|
| `types/index.ts` | `StatItem`, `Highlight` 타입 추가, `MediaPartner` 필드 확장 |
| `data/media-partners.ts` | 6개 파트너 데이터 보강 (tagline, statItems, highlights, coverage) + HTPOST 정정 |
| `components/service/MediaPartnerSection.tsx` | **신규** — 풀 너비 리치 섹션 컴포넌트 |
| `components/service/ServiceFeatures.tsx` | media 분기에서 새 컴포넌트 사용 |

---

## 체크리스트

- [x] `types/index.ts` — StatItem, Highlight 타입 추가, MediaPartner 확장
- [x] `data/media-partners.ts` — 6개 파트너 데이터 보강 + HTPOST 정정
- [x] `components/service/MediaPartnerSection.tsx` — 풀 너비 리치 섹션 컴포넌트 신규 작성
- [x] `components/service/ServiceFeatures.tsx` — MediaPartnerSection 사용하도록 수정
- [x] 빌드 확인 (`npm run build`)
- [ ] 브라우저에서 `/media` 페이지 시각적 확인
