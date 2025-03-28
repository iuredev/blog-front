import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components";
import { ReactQueryProvider, ThemeProvider } from "./providers";
import Script from "next/script";

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iure | Software Engineer",
  description: "Personal blog and portfolio of Iure, a software engineer sharing insights on web development, programming and technology.",
  metadataBase: new URL('https://iure.dev'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iure.dev',
    title: 'Iure | Software Engineer',
    description: 'Personal blog and portfolio of Iure, a software engineer sharing insights on web development, programming and technology.',
    siteName: 'Iure ',

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iure | Software Engineer',
    description: 'Personal blog and portfolio of Iure, a software engineer sharing insights on web development, programming and technology.',

  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${InterSans.variable} ${geistMono.variable} antialiased 
          bg-white dark:bg-gray-900 
          text-gray-900 dark:text-gray-300`}
      >
        <ReactQueryProvider>
          <ThemeProvider>
            <div
              className="grid min-h-screen grid-rows-[auto_1fr_auto] mx-auto max-w-[47.5rem] text-[1.1rem] leading-[34px] tracking-[0.9px]"
            >
              <header className="px-6 md:px-0">
                <Nav />
              </header>
              <main className="container flex-grow mb-5 px-6 md:px-0 pt-14 pb-4">
                {children}
              </main>
              <footer className="p-6 md:p-0 md:py-2">
                <Footer />
              </footer>
            </div>
          </ThemeProvider>
        </ReactQueryProvider>

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
