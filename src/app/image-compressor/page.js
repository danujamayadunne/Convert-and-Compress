import ImageCompress from "./component"

export const metadata = {
    title: "Image Compressor - Compress Multiple JPG, PNG, JPEG, GIF, WEBP Images Online",
    description: "Compress multiple JPG, PNG, JPEG, GIF, and WEBP images online effortlessly. Optimize photos with our free and lossless image compressor for reducing file sizes, improving website speed, or sharing on social media.",
    keywords: "image compressor, compress multiple images, photo compressor, picture compressor, bulk image compressor, image size reducer, image optimizer, compress image online, reduce image size online, batch image compression, jpg compressor, png compressor, jpeg compressor, gif compressor, webp compressor, free image compressor, online image compressor, lossless image compressor, compress image without losing quality, image compressor for website, optimize images for SEO",
    robots: "index, follow",
    canonical: "https://convertandcompress.com/image-compressor",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Image Compressor",
  "url": "https://convertandcompress.com/image-compressor",
  "description": "Compress multiple JPG, PNG, JPEG, GIF, and WEBP images online effortlessly. Optimize photos with our free and lossless image compressor for reducing file sizes, improving website speed, or sharing on social media.",
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <ImageCompress />
        </>
    );
}
