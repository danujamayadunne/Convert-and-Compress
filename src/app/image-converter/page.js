import ImageConvert from "./component"

export const metadata = {
    title: "Image Converter - Convert JPG, PNG, GIF, WEBP Images Online",
    description: "Easily convert image formats like JPG, PNG, GIF, WEBP, and JPEG. Use our free online image converter to quickly transform images for websites, sharing, or editing.",
    keywords: "image converter, convert images online, jpg converter, png converter, webp converter, gif converter, free image converter, online image converter, image format converter, photo converter, picture converter, convert image to jpg, convert image to png, convert image to webp, image converter for website, convert image file type, transform image format, quick image converter",
    canonical: "https://convertandcompress.com/image-converter",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Image Converter",
  "url": "https://convertandcompress.com/image-converter",
  "description": "Easily convert image formats like JPG, PNG, GIF, WEBP, and JPEG. Use our free online image converter to quickly transform images for websites, sharing, or editing.",
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <ImageConvert />
        </>
    );
}