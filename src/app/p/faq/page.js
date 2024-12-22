import Head from "next/head";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function FAQPage() {
    const faqs = [
        {
            question: "What image formats does your compression tool support?",
            answer:
                "Our image compressor supports modern formats like JPEG, PNG, WebP, AVIF, and SVG, ensuring optimal quality for web and other uses.",
        },
        {
            question: "How much can I reduce my image size?",
            answer:
                "You can reduce image sizes by 40-70% without losing visual quality. Adjust quality settings to meet your specific needs.",
        },
        {
            question: "Will image compression affect the quality of my photos?",
            answer:
                "No. Our advanced compression algorithm maintains high-quality visuals while reducing file size. Customize quality settings as needed.",
        },
        {
            question: "What audio formats can I convert between?",
            answer:
                "Our audio converter supports MP3, WAV, AAC, FLAC, OGG, and more. Conversions retain the best possible quality.",
        },
        {
            question: "Can I convert multiple videos at once?",
            answer:
                "Yes, our video converter supports batch processing, allowing you to convert several videos to formats like MP4, WebM, AVI, or MOV simultaneously.",
        },
        {
            question: "How do I reduce PDF file size without losing quality?",
            answer:
                "Use our PDF compressor with options for extreme compression, balanced reduction, or high-quality settings tailored to your needs.",
        },
        {
            question: "What unit conversions do you support?",
            answer:
                "Our tool converts length (meters, feet), weight (kilograms, pounds), temperature (Celsius, Fahrenheit), and more.",
        },
        {
            question: "Are these tools free to use?",
            answer:
                "Yes, all features are free. Unlimited conversions and compressions are available with no hidden charges.",
        },
        {
            question: "Do I need to install any software?",
            answer:
                "No installations required. All tools work online directly in your browser, ensuring convenience and speed.",
        },
        {
            question: "Are my files secure during processing?",
            answer:
                "Yes. All operations occur locally on your browser, ensuring your data remains private and secure.",
        },
    ];

    return (
        <main className="min-h-screen py-10">
            <Head>
                <title>Frequently Asked Questions | File Converter & Compressor</title>
                <meta
                    name="description"
                    content="Answers to common questions about our file converter and compressor tools. Learn about supported formats, privacy, and unlimited free use."
                />
                <meta
                    name="keywords"
                    content="FAQ, online file converter, image compression, PDF compression, audio conversion, video converter, free online tools"
                />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        })),
                    })}
                </script>
            </Head>

            <div className="navbar_in_pages">
                <Navbar />
            </div>

            <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: "90px", paddingBottom: "90px" }}>
                <h1 className="text-2xl tracking-tight font-medium mb-6">Frequently Asked Questions</h1>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-gray-50 p-4 rounded-md"
                        >
                            <summary className="font-normal cursor-pointer">
                                {faq.question}
                            </summary>
                            <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>

            <Footer />

        </main>
    );
}