import PDFToJPG from "./component"

export const metadata = {
    title: "PDF to JPG Converter",
    description: "Convert your PDF documents to high-quality JPG images with ease. Free online PDF to JPG conversion tool for fast and efficient file transformation.",
    keywords: "pdf to jpg, convert pdf to jpg online, pdf to jpg converter, pdf to image converter, convert pdf pages to jpg, free pdf to jpg converter, pdf to jpg without quality loss, convert pdf to jpg for free, pdf to jpg conversion tool, pdf to image online",
};

const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "PDF to JPG Converter",
    "url": "https://convertandcompress.com/pdf-to-jpg",
    "description": metadata.description,
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <PDFToJPG />
        </>
    );
}