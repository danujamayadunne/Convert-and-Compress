import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = 'https://convertandcompress.com';
const SITE_TITLE = 'Convert and Compress - Free Online File Converter & Compressor';
const SITE_DESCRIPTION = 'Free tool to convert and compress images, videos,audio, and PDFs for free. No signup required. Enjoy fast, high-quality conversions with our easy-to-use online tool.';

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
    siteName: 'Convert and Compress',
    images: [
      {
        url: `${SITE_URL}/OG.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: `${SITE_URL}/OG.jpg`,
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

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What image formats does your compression tool support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our image compressor supports modern formats like JPEG, PNG, WebP, AVIF, and SVG, ensuring optimal quality for web and other uses."
      }
    },
    {
      "@type": "Question",
      "name": "How much can I reduce my image size?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reduce image sizes by 40-70% without losing visual quality. Adjust quality settings to meet your specific needs."
      }
    },
    {
      "@type": "Question",
      "name": "Will image compression affect the quality of my photos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our advanced compression algorithm maintains high-quality visuals while reducing file size. Customize quality settings as needed."
      }
    },
    {
      "@type": "Question",
      "name": "What audio formats can I convert between?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our audio converter supports MP3, WAV, AAC, FLAC, OGG, and more. Conversions retain the best possible quality."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert multiple videos at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our video converter supports batch processing, allowing you to convert several videos to formats like MP4, WebM, AVI, or MOV simultaneously."
      }
    },
    {
      "@type": "Question",
      "name": "How do I reduce PDF file size without losing quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our PDF compressor with options for extreme compression, balanced reduction, or high-quality settings tailored to your needs."
      }
    },
    {
      "@type": "Question",
      "name": "What unit conversions do you support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our tool converts length (meters, feet), weight (kilograms, pounds), temperature (Celsius, Fahrenheit), and more."
      }
    },
    {
      "@type": "Question",
      "name": "Are these tools free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all features are free. Unlimited conversions and compressions are available with no hidden charges."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to install any software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No installations required. All tools work online directly in your browser, ensuring convenience and speed."
      }
    },
    {
      "@type": "Question",
      "name": "Are my files secure during processing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All operations occur locally on your browser, ensuring your data remains private and secure."
      }
    }
  ]
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
      </head>
      <body className={poppins.className}>
        {children}
        <Toaster />
        <GoogleAnalytics gaId="G-TZ9R31DFWJ" />
      </body>
    </html>
  );
}