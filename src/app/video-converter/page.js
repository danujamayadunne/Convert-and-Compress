import VideoConvert from "./component"

export const metadata = {
    title: "Video Converter - Convert MP4, AVI, MOV, MKV, Online",
    description: "Easily convert video format into various formats like MP4, AVI, MOV, MKV, and more with our free online video converter. Quick, high-quality conversion for all your video needs.",
    keywords: "video converter, convert video online, mp4 converter, avi converter, mov converter, mkv converter, free video converter, online video converter, convert video to mp4, convert video to avi, convert video to mov, convert video to mkv",
};

const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Video Converter",
    "url": "https://convertandcompress.com/video-converter",
    "description": metadata.description,
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <VideoConvert />
        </>
    );
}