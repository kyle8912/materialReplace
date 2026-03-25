import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

export const metadata = {
  title: '없으면뭐써 — 재료 대체 검색',
  description: '요리 중 재료가 부족할 때, 대체 재료와 직접 만드는 레시피를 알려드려요.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} ${notoSerif.variable}`}>
        {children}
      </body>
    </html>
  )
}
