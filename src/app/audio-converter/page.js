import AudioConvert from "./component"

export const metadata = {
    title: "Audio Converter - Convert MP3, WAV, AAC, FLAC, OGG Audio Online",
    description: "Easily convert audio formats like MP3, WAV, AAC, FLAC, and OGG with our free online audio converter. Fast, high-quality, and perfect for any device.",
    keywords: "audio converter, convert audio online, mp3 converter, wav converter, aac converter, flac converter, ogg converter, free audio converter, online audio converter, audio format converter, music converter, convert audio files, convert audio to mp3, convert audio to wav, convert audio to aac, audio converter for mobile, transform audio format, high-quality audio conversion, fast audio converter",
};

const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Audio Converter",
    "url": "https://convertandcompress.com/audio-converter",
    "description": metadata.description,
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <AudioConvert />
        </>
    );
}