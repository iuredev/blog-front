import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components";
import { ReactQueryProvider, ThemeProvider } from "./providers";
import Script from "next/script";
import { getGlobal, getStrapiMediaUrl } from "@/api/queries/global";

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Iure | Software Engineer";
const description = "Iure is a software engineer who designs systems, writes code and cares about the experience behind every detail.";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();

  const ogImageUrl = getStrapiMediaUrl(global?.ogImage?.url);

  return {
    title,
    description,
    metadataBase: new URL("https://iure.dev"),
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://iure.dev",
      title,
      description,
      siteName: "Iure",
      ...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}

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
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-20 rounded bg-blue-500 px-4 py-2 text-sm text-white transition-transform focus:translate-y-0">
          Skip to content
        </a>
        <ReactQueryProvider>
          <ThemeProvider>
            <div
              className="grid min-h-screen grid-rows-[auto_1fr_auto] mx-auto max-w-[47.5rem] text-[1.1rem] leading-[34px] tracking-[0.9px]"
            >
              <header className="px-6 md:px-0">
                <Suspense>
                  <Nav />
                </Suspense>
              </header>
              <main id="main-content" className="container flex-grow mb-5 px-6 md:px-0 pt-14 pb-4">
                {children}
              </main>
              <footer className="p-6 md:p-0 md:py-2">
                <Suspense>
                  <Footer />
                </Suspense>
              </footer>
            </div>
          </ThemeProvider>
        </ReactQueryProvider>

        <Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Iure Gomes",
          url: "https://iure.dev",
          email: "mailto:iuresg.dev@gmail.com",
          jobTitle: "Software Engineer",
          sameAs: ["https://github.com/iuredev", "https://linkedin.com/in/iure-silva", "https://instagram.com/iure.dev"],
        }) }} />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
          <Script id="google-analytics" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}</Script>
        </>}
      </body>
    </html>
  );
}
