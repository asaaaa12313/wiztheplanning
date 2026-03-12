import type { PortfolioItem, PortfolioCategory } from '@/types'

const img = (folder: string, count: number, ext: string = 'jpg') =>
  Array.from({ length: count }, (_, i) => `/images/portfolio/${folder}/${i + 1}.${ext}`)

export const portfolioItems: PortfolioItem[] = [
  // ── 배달 (11) ──
  { id: 'delivery-01', name: '철수네명품돈까스 앱최적화', category: '배달', images: img('cheolsu-donkatsu', 3) },
  { id: 'delivery-02', name: '울트라치킨 앱최적화', category: '배달', images: img('ultra-chicken', 3) },
  { id: 'delivery-03', name: '팔선 앱최적화', category: '배달', images: img('palseon-app', 2, 'png') },
  { id: 'delivery-04', name: '짱구네떡볶이 가락점 배너', category: '배달', images: img('jjanggu-garak-banner', 1, 'png') },
  { id: 'delivery-05', name: '돈카츠마켙 운서점 앱최적화', category: '배달', images: img('donkatsu-unseo', 3, 'png') },
  { id: 'delivery-06', name: '황금장', category: '배달', images: img('hwanggeum', 2, 'png') },
  { id: 'delivery-07', name: '팔선', category: '배달', images: img('palseon', 2, 'png') },
  { id: 'delivery-08', name: '짱구네떡볶이 가락점', category: '배달', images: img('jjanggu-garak', 1, 'png') },
  { id: 'delivery-09', name: '첸', category: '배달', images: img('chen', 3) },
  { id: 'delivery-10', name: '길동우동 서울대입구역점', category: '배달', images: img('gildong-udon', 3) },
  { id: 'delivery-11', name: '황룡양푼이해물짬뽕', category: '배달', images: img('hwangryong', 6, 'png') },

  // ── 네이버 (17) ──
  { id: 'naver-01', name: '용인숯불', category: '네이버', link: 'https://naver.me/xKtZtcnE', images: [] },
  { id: 'naver-02', name: '건하수산 경안본점', category: '네이버', link: 'https://naver.me/Fr7pOHAg', images: [] },
  { id: 'naver-03', name: '에스더스킨앤바디 강동구본점', category: '네이버', link: 'https://naver.me/xWT2N7BT', images: [] },
  { id: 'naver-04', name: '명품한우 동천본점', category: '네이버', link: 'https://naver.me/52R5XIFq', images: [] },
  { id: 'naver-05', name: '프라임 정육식당 석남역점', category: '네이버', link: 'https://naver.me/GL8iFhRp', images: [] },
  { id: 'naver-06', name: '코코스키 간석점', category: '네이버', link: 'https://naver.me/GMm810uD', images: [] },
  { id: 'naver-07', name: '전여사 중화동본점', category: '네이버', link: 'https://naver.me/5l7AfqNI', images: [] },
  { id: 'naver-08', name: '싱싱식당 의정부점', category: '네이버', link: 'https://naver.me/xLW9i7FQ', images: [] },
  { id: 'naver-09', name: '해뜨는죽변물회막회 강서구청점', category: '네이버', link: 'https://naver.me/56RHmgTR', images: [] },
  { id: 'naver-10', name: '진짜좋은고기 성대점', category: '네이버', link: 'https://naver.me/FvEZwPib', images: [] },
  { id: 'naver-11', name: '연세타이밍치과', category: '네이버', link: 'https://naver.me/Fk7guEEi', images: [] },
  { id: 'naver-12', name: '광명척척365정형외과', category: '네이버', link: 'https://naver.me/IFGNqNfC', images: [] },
  { id: 'naver-13', name: '산본엘치과의원', category: '네이버', link: 'https://naver.me/xIFEHuJL', images: [] },
  { id: 'naver-14', name: '창명한의원', category: '네이버', link: 'https://naver.me/GprcjXUE', images: [] },
  { id: 'naver-15', name: '서울뜰정신건강의학과의원', category: '네이버', link: 'https://naver.me/xyTGdFVk', images: [] },
  { id: 'naver-16', name: '다이어메이커 시흥배곧점', category: '네이버', link: 'https://naver.me/Fk73tTnP', images: [] },
  { id: 'naver-17', name: '노모어피자 송도가로수점', category: '네이버', link: 'https://naver.me/FUhswg1u', images: [] },

  // ── 인스타·당근 (7) ──
  { id: 'insta-01', name: '행복골프훈련소 금정역점', category: '인스타·당근', link: 'https://www.daangn.com/kr/local-profile/6j7bdjsemw6j/', images: [] },
  { id: 'insta-02', name: '창명한의원', category: '인스타·당근', link: 'https://www.instagram.com/changm_hani/', images: [] },
  { id: 'insta-03', name: '산본엘치과', category: '인스타·당근', link: 'https://www.instagram.com/sanbonl_dental', images: [] },
  { id: 'insta-04', name: '혜성플러스의원', category: '인스타·당근', link: 'https://www.instagram.com/hs_plus_clinic', images: [] },
  { id: 'insta-05', name: '광명척척365정형외과', category: '인스타·당근', link: 'https://www.instagram.com/p/DVKxfIWGgJu/', images: [] },
  { id: 'insta-06', name: '연세타이밍치과', category: '인스타·당근', link: 'https://www.instagram.com/p/DVKvplWDw0P/', images: [] },
  { id: 'insta-07', name: '서울뜰정신건강의학과', category: '인스타·당근', link: 'https://www.instagram.com/p/DVLKCk9k5Zb/', images: [] },

  // ── 블로그 (14) ──
  { id: 'blog-01', name: '창명한의원', category: '블로그', link: 'https://blog.naver.com/chang_hani', images: [] },
  { id: 'blog-02', name: '나투어에스테틱', category: '블로그', link: 'https://blog.naver.com/yulian77', images: [] },
  { id: 'blog-03', name: '용인대석사백인태권도', category: '블로그', link: 'https://blog.naver.com/ych3455', images: [] },
  { id: 'blog-04', name: '웰영수전문학원', category: '블로그', link: 'https://blog.naver.com/wellacademy', images: [] },
  { id: 'blog-05', name: '팩토수학안중센터학원', category: '블로그', link: 'https://blog.naver.com/blueilake', images: [] },
  { id: 'blog-06', name: '김자영피부체형관리', category: '블로그', link: 'https://blog.naver.com/danbi2676', images: [] },
  { id: 'blog-07', name: '수기명가 분당본점', category: '블로그', link: 'https://blog.naver.com/yskom0430', images: [] },
  { id: 'blog-08', name: '산본엘치과', category: '블로그', link: 'https://blog.naver.com/sldc1090', images: [] },
  { id: 'blog-09', name: '혜성플러스의원', category: '블로그', link: 'https://blog.naver.com/oblivioner', images: [] },
  { id: 'blog-10', name: '연세타이밍치과', category: '블로그', link: 'https://blog.naver.com/wyyezbrmztora', images: [] },
  { id: 'blog-11', name: '서울뜰정신건강의학과', category: '블로그', link: 'https://blog.naver.com/seoulgardenclinic', images: [] },
  { id: 'blog-12', name: '광명척척365정형외과', category: '블로그', link: 'https://blog.naver.com/brightspine', images: [] },
  { id: 'blog-13', name: '수풀림수학학원', category: '블로그', link: 'https://blog.naver.com/magui1', images: [] },
  { id: 'blog-14', name: 'STG태권도 잠실점', category: '블로그', link: 'https://blog.naver.com/stgjamsil', images: [] },

  // ── 체험단 (1) ──
  { id: 'exp-01', name: '체험단 모집', category: '체험단', images: img('experience', 15, 'png') },

  // ── 디자인 (10) ──
  { id: 'design-01', name: '연세타이밍치과', category: '디자인', images: img('yonsei-timing', 9) },
  { id: 'design-02', name: '광명 척척365정형외과', category: '디자인', images: img('gm365', 11) },
  { id: 'design-03', name: '서울뜰정신건강의학원', category: '디자인', images: img('seoul-garden', 3) },
  { id: 'design-04', name: '창명한의원', category: '디자인', images: img('changmyung', 6) },
  { id: 'design-05', name: '배너 디자인', category: '디자인', images: img('banner-design', 5) },
  { id: 'design-06', name: '메뉴판 디자인', category: '디자인', images: img('menu-design', 8, 'jpeg') },
  { id: 'design-07', name: 'LED배너', category: '디자인', images: img('led-banner', 4, 'jpeg') },
  { id: 'design-08', name: '포스터 디자인', category: '디자인', images: img('poster-design', 7) },
  { id: 'design-09', name: '포스터·현수막 디자인', category: '디자인', images: img('poster-design-2', 6, 'jpeg') },
  { id: 'design-10', name: '전단지 디자인', category: '디자인', images: img('flyer-design', 6) },

  // ── 컨텐츠 (25) ──
  { id: 'content-01', name: '위즈더플래닝 홈페이지', category: '컨텐츠', link: 'https://wiztheplanning.com', images: [] },
  { id: 'content-02', name: '위즈더플래닝 서비스 소개', category: '컨텐츠', link: 'https://v0-wizder-planning-landing-page.vercel.app', images: [] },
  { id: 'content-03', name: 'VD-TECH 홈페이지', category: '컨텐츠', link: 'https://v-dtech.vercel.app/', images: [] },
  { id: 'content-04', name: 'DG골프 레슨스튜디오 홈페이지', category: '컨텐츠', link: 'https://d-ggolf.vercel.app/', images: [] },
  { id: 'content-05', name: '사랑채펜션 홈페이지', category: '컨텐츠', link: 'https://sarangche.vercel.app/', images: [] },
  { id: 'content-06', name: '수라채움 홈페이지', category: '컨텐츠', link: 'https://sarangche.vercel.app/', images: [] },
  { id: 'content-07', name: '카라 허영지 유튜브 채널', category: '컨텐츠', link: 'https://www.youtube.com/@studio.sundaymedia', images: [] },
  { id: 'content-08', name: '하하정보탈모 두피 콘텐츠 촬영', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=7rPogITfG0k', images: [] },
  { id: 'content-09', name: '디블랙 두피문신 컨텐츠', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=AE_TahAMzgw', images: [] },
  { id: 'content-10', name: '디블랙 두피문신 컨텐츠', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=Qkd0fN4s72s', images: [] },
  { id: 'content-11', name: '어비월드 컨텐츠 촬영', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=02UqLycI5eY', images: [] },
  { id: 'content-12', name: '뜻밖의육아 컨텐츠', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=gwHzVRXKvVs', images: [] },
  { id: 'content-13', name: '윤시원 공포채널 컨텐츠', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=Xka-g0gXEkA', images: [] },
  { id: 'content-14', name: '윤시원 공포채널 컨텐츠', category: '컨텐츠', link: 'https://www.youtube.com/watch?v=d1G9WX9-TuU', images: [] },
  { id: 'content-15', name: '코코스키 간석점 릴스', category: '컨텐츠', link: 'https://www.instagram.com/reels/DMzSu5VSb3N/', images: [] },
  { id: 'content-16', name: '파주신쭈꾸미 릴스', category: '컨텐츠', link: 'https://www.instagram.com/reels/DNpjHNAS5wa/', images: [] },
  { id: 'content-17', name: '달스톤 릴스', category: '컨텐츠', link: 'https://www.instagram.com/reel/DVFXgx2k8Go/', images: [] },
  { id: 'content-18', name: '위즈더플래닝 촬영본', category: '컨텐츠', link: 'https://www.wiztheplanning.com/portfolio', images: img('wiz-filming', 13, 'png') },
  { id: 'content-19', name: '복많네해물칼국수 릴스', category: '컨텐츠', link: 'https://www.instagram.com/reel/DU67BbGk1OM/', images: [] },
  { id: 'content-20', name: '전여사 릴스', category: '컨텐츠', link: 'https://www.instagram.com/reel/DOvQctnkoYe/', images: [] },
  { id: 'content-21', name: '복많네해물칼국수 쇼츠', category: '컨텐츠', link: 'https://youtube.com/shorts/YW-V7a6Eq6c', images: [] },
  { id: 'content-22', name: '파주신쭈꾸미 쇼츠', category: '컨텐츠', link: 'https://youtube.com/shorts/ClX2GPCblRs', images: [] },
  { id: 'content-23', name: '코코스키 간석점 쇼츠', category: '컨텐츠', link: 'https://youtube.com/shorts/nv474Vc_pQ4', images: [] },
  { id: 'content-24', name: '썬샤인스킨케어 쇼츠', category: '컨텐츠', link: 'https://youtube.com/shorts/IyX6rQ6k1lA', images: [] },
]

export const portfolioCategories: PortfolioCategory[] = [
  '배달', '네이버', '인스타·당근', '블로그', '체험단', '디자인', '컨텐츠',
]

export const categoryColors: Record<PortfolioCategory, string> = {
  '배달': '#FF6B35',
  '네이버': '#03C75A',
  '인스타·당근': '#E4405F',
  '블로그': '#00C73C',
  '체험단': '#6366F1',
  '디자인': '#8B5CF6',
  '컨텐츠': '#F59E0B',
}

export const categoryEnglish: Record<PortfolioCategory, string> = {
  '배달': 'Delivery',
  '네이버': 'Naver',
  '인스타·당근': 'Instagram · Daangn',
  '블로그': 'Blog',
  '체험단': 'Experience',
  '디자인': 'Design',
  '컨텐츠': 'Contents',
}
