import VideoToAudio from "./component"

export const metadata = {
    title: "Video to Audio - Convert Video to MP3, WAV, OGG",
    description: "Easily convert video format into various audio formats like mp3, wav, and ogg.",
    keywords: "video to audio, convert video to audio, video to audio converter, video to audio online, video to mp3, video to wav, video to ogg",
};

const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Video to Audio",
    "url": "https://convertandcompress.com/video-to-audio",
    "description": metadata.description,
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <VideoToAudio />
        </>
    );
}