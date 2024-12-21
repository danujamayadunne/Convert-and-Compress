import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = 'https://convertandcompress.com';
const SITE_TITLE = 'Convert and Compress - Free Online File Converter & Compressor';
const SITE_DESCRIPTION = 'Free online tool to convert and compress images, videos, audio, and PDFs. No signup required, instant conversion with maximum quality retention.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s"
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "file converter",
    "image compression",
    "video converter",
    "PDF compressor",
    "audio converter",
    "online compression tool",
    "free file converter",
    "media optimization",
    "batch conversion",
    "lossless compression"
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Convert and Compress'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: SITE_URL
  }
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Convert and Compress",
  "url": SITE_URL,
  "description": SITE_DESCRIPTION,
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body className={poppins.className}>
        {children}
        <GoogleAnalytics gaId="G-TZ9R31DFWJ" />
      </body>
    </html>
  );
}