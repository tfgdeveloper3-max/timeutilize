import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'
import Noise from '@/components/ui/Noise'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Time Utilize',
  description: "Don't Waste Your Time.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Noise />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
