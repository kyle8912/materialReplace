#재료 대체 검색

요리 중 재료가 부족할 때, 대체 재료와 직접 만드는 소스 레시피를 AI(Google Gemini)가 알려주는 웹앱입니다.

## 기술 스택

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- Google Gemini API — `gemini-flash-lite-latest` (무료 티어, 항상 최신 flash-lite 모델을 가리키는 별칭)

> 참고: 원래는 `gemini-1.5-flash`를 쓰려고 했지만, 해당 모델은 Google 쪽에서 완전히 종료되어 API에서 조회되지 않습니다 (2026년 9월 기준). 대신 최신 flash-lite 모델을 항상 가리키는 별칭인 `gemini-flash-lite-latest`를 사용해서, 앞으로 특정 버전이 또 종료되어도 코드를 바꿀 필요가 없게 했습니다.

## 로컬 실행

1. 의존성 설치

   ```bash
   npm install
   ```

2. Gemini API 키 발급

   [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료로 API 키를 발급받으세요.

3. 환경 변수 설정

   `.env.local.example`을 복사해 `.env.local`을 만들고 발급받은 키를 넣습니다.

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   GEMINI_API_KEY=발급받은_키_값
   ```

4. 개발 서버 실행

   ```bash
   npm run dev
   ```

   브라우저에서 http://localhost:3000 접속

## Vercel 배포

1. 이 저장소를 GitHub에 push 합니다.
2. [Vercel](https://vercel.com)에서 New Project → 해당 GitHub 저장소 선택 (Next.js는 자동으로 인식됩니다).
3. Environment Variables에 `GEMINI_API_KEY`를 추가합니다 (Settings → Environment Variables, 또는 배포 설정 화면에서 바로 추가).
4. Deploy를 누르면 완료됩니다.

## 폴더 구조

```
src/app/
  page.js                 # 메인 페이지 (검색 폼 + 결과 UI)
  layout.js               # 루트 레이아웃, 폰트/메타데이터
  globals.css             # 전체 스타일 (라이트/다크 모드 지원)
  api/substitute/route.js # Gemini 호출 API 라우트 (Edge Runtime)
```

## 참고

- API 키는 서버 사이드(API Route)에서만 사용되며 브라우저에 노출되지 않습니다.
- Gemini 무료 티어는 분당/일당 요청 수 제한이 있습니다. 제한 초과 시 429 오류 메시지가 표시됩니다.
