import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convert and Compress - Free Online File Convert and Compress",
  description: "Convert your files online with ease. Free, unlimited access to image, audio, video, and document converters.",
  keywords: "file converter, online file converter, free converter, image compress, audio convert, video convert, video compression tool, image converter, online media compression, video converter, reduce video file size, compress images, fast online compressor, media optimization, web and mobile compression, best video compressor, image converter tool"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Convert and Compress",
    "url": "https://convertandcompress.com",
    "description": "Convert and compress images and video online with our platfrom. Achieve high-quality results while reducing file sizes for faster loading and easy sharing. Supports multiple formats, ensuring your media is optimized for web and mobile.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={poppins.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
