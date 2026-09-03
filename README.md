# 🍳 재료 대체 검색

> 요리 중 재료가 없을 때, 현재 있는 재료로 만들 수 있는 **대체 재료**와 레시피를 AI(Google Genimi)가 제안해주는 스마트 웹 애플리케이션
<br/>

## 🛠️ 기술 스택 (Tech Stack)

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router 기반)
*   **Library:** React 19
*   **AI API:** Google Gemini API

<br/>

## 🚀 로컬 개발 환경 설정 (Getting Started)

프로젝트를 로컬 환경에서 실행하기 위한 단계입니다.

### 1. 패키지 설치
저장소를 클론한 후, 프로젝트 루트 디렉토리에서 의존성 패키지를 설치합니다.
```bash
npm install
```

### 2. Gemini API 키 발급
[Google AI Studio](https://aistudio.google.com/app/apikey)에 접속하여 무료 API 키를 발급받습니다.

### 3. 환경 변수(Environment Variables) 설정
루트 디렉토리에 있는 `.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성합니다.
```bash
cp .env.local.example .env.local
```
생성된 `.env.local` 파일을 열고 발급받은 API 키를 입력합니다.
```env
GEMINI_API_KEY=발급받은_당신의_API_키_값
```

### 4. 개발 서버 실행
설정이 완료되면 아래 명령어로 로컬 서버를 구동합니다.
```bash
npm run dev
```
브라우저를 열고 [http://localhost:3000](http://localhost:3000)에 접속하여 앱을 확인합니다.

<br/>

## Vercel 배포 가이드 (Deployment)

Next.js에 최적화된 [Vercel](https://vercel.com)을 통해 클릭 몇 번으로 쉽게 배포할 수 있습니다.

1.  수정된 코드를 본인의 **GitHub 저장소에 Push** 합니다.
2.  Vercel 대시보드에서 **New Project**를 클릭하고, 해당 GitHub 저장소를 선택합니다. (Next.js 프레임워크는 자동으로 인식됩니다.)
3.  **Environment Variables** 설정 섹션에서 변수명 `GEMINI_API_KEY`와 발급받은 키 값을 추가합니다. (이후 `Settings → Environment Variables`에서도 수정 가능합니다.)
4.  **Deploy** 버튼을 누르면 성공적으로 배포가 완료됩니다.

<br/>

## 📂 폴더 구조 (Directory Structure)

App Router 구조를 채택하여 라우팅과 API 처리를 직관적으로 분리했습니다.

```text
src/
 └── app/
      ├── page.js                 # 메인 페이지 (재료 검색 폼 및 AI 결과 출력 UI)
      ├── layout.js               # 루트 레이아웃 (공통 헤더/푸터, 폰트 및 메타데이터 설정)
      ├── globals.css             # 전역 스타일시트 (라이트/다크 모드 완벽 지원)
      └── api/
           └── substitute/
                └── route.js      # Gemini API 호출 라우트 (Edge Runtime 최적화)
```

<br/>

## ⚠️ 참고 사항 (Notices)

*   **보안:** `GEMINI_API_KEY`는 서버 사이드(`api/substitute/route.js`)에서만 안전하게 호출되며, 클라이언트(브라우저) 환경에는 절대 노출되지 않습니다.
*   **API 호출 제한:** 현재 Gemini 무료 티어를 사용 중이므로 분당/일당 API 요청 수에 제한이 있습니다. 사용량이 한도를 초과할 경우 `429 Too Many Requests` 오류 메시지가 UI에 표시될 수 있습니다.
