import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClientProvider } from '../components/providers/QueryClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'User Registration System',
    description: 'A complete user registration system built with Next.js and NestJS',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    )
}