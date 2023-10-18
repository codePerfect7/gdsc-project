import Navbar from '@/components/Navbar'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import {Toaster} from 'react-hot-toast'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'TCH Hub',
  description: 'Tech Hub by Ayush Thakur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen bg-background flex flex-col items-center '>
        <NextTopLoader />
        <Navbar />
        <Toaster position='top-right' toastOptions={{style: {
          borderRadius: "10px",background: "#333", color: "#fff", fontWeight: "800"
        }}} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
