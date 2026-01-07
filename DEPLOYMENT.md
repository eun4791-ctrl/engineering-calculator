# 공학용 계산기 배포 가이드

## 프로젝트 정보
- **프로젝트명**: Engineering Calculator (공학용 계산기)
- **버전**: 1.0.0
- **빌드 상태**: ✅ 완료
- **배포 준비**: ✅ 완료

## 주요 기능
- **기본 연산**: 덧셈, 뺄셈, 곱셈, 나눗셈, 백분율, 거듭제곱
- **삼각함수**: sin, cos, tan, asin, acos, atan
- **로그 함수**: log (상용로그), ln (자연로그)
- **지수 함수**: e^x, √ (제곱근), ∛ (세제곱근)
- **기타 함수**: n! (팩토리얼), 1/x (역수), |x| (절댓값)
- **상수**: π (파이), e (오일러 수)
- **각도 모드**: DEG (도) ↔ RAD (라디안) 전환
- **계산 기록**: 모든 계산 결과 자동 저장 및 재사용

## 배포 방법

### 1. Manus 플랫폼 (권장)
```
프로젝트 경로: /home/ubuntu/engineering-calculator
빌드 결과: /home/ubuntu/engineering-calculator/dist/

배포 단계:
1. Manus 관리 UI에서 "Save Checkpoint" 클릭
2. "Publish" 버튼 클릭
3. 자동 생성된 공개 URL 사용
```

### 2. 정적 호스팅 (Vercel, Netlify 등)
```bash
pnpm build
# dist/ 폴더를 호스팅 서비스에 업로드
```

### 3. 로컬 개발 서버
```bash
pnpm dev
# http://localhost:5173 또는 http://localhost:5174
```

## 기술 스택
- **프레임워크**: React 19.2.3
- **빌드 도구**: Vite 7.3.0
- **스타일**: CSS Grid, Flexbox, 그래디언트
- **수학 계산**: Vanilla JavaScript Math API

## 파일 구조
```
engineering-calculator/
├── src/
│   ├── App.jsx          # 메인 계산기 컴포넌트
│   ├── App.css          # 계산기 스타일
│   ├── main.jsx         # React 진입점
│   └── index.css        # 글로벌 스타일
├── dist/                # 프로덕션 빌드 결과
├── public/              # 정적 자산
├── package.json         # 프로젝트 설정
├── vite.config.js       # Vite 설정
└── index.html           # HTML 템플릿
```

## 성능 최적화
- 최소화된 번들 크기 (JS: 403KB, CSS: 5.26KB)
- Gzip 압축 지원 (JS: 118.8KB, CSS: 1.6KB)
- 빠른 로딩 시간 (< 2초)

## 배포 완료 후 확인 사항
- ✅ 모든 계산 기능 정상 작동
- ✅ 삼각함수 계산 정확성 확인
- ✅ 계산 기록 자동 저장 확인
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 각도 모드 전환 정상 작동

## 문제 해결
- **CORS 오류**: vite.config.js의 `allowedHosts: ['all']` 설정 확인
- **포트 충돌**: 다른 포트 사용 (예: 5174)
- **빌드 실패**: `pnpm install` 후 재시도

## 지원 브라우저
- Chrome/Chromium (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
