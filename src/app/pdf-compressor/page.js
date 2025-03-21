import PDFCompress from "./component"

export const metadata = {
    title: "PDF Compressor - Compress PDF Files Online Free",
    description: "Easily reduce the size of your PDF files without compromising quality. Compress PDF documents online for faster sharing, uploading, and storage.",
    keywords: "pdf compressor, compress pdf online, reduce pdf file size, compress pdf without losing quality, free pdf compressor, online pdf compressor, compress large pdf, pdf file size reducer, pdf optimizer, reduce pdf size for email, compress pdf for website, shrink pdf files",
};

const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "PDF Compressor",
    "url": "https://convertandcompress.com/pdf-compressor",
    "description": metadata.description,
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <PDFCompress />
        </>
    );
}