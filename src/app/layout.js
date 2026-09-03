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
  description: '요리 중 재료가 부족할 때, 대체 재료와 직접 만드는 레시피를 AI가 알려드려요.',
  icons: {
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="0.9em" font-size="90"%3E🍳%3C/text%3E%3C/svg%3E',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf6f0' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1611' },
  ],
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
