import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-gray-100 mt-20 p-9" style={{paddingBottom: "19px"}}>
            <div className="grid grid-cols-4">
                <div>
                    <p className="tracking-tight font-medium">Image Tools</p>
                    <div className="text-sm tracking-tight flex flex-col gap-2 pt-2">
                        <Link href="/image-compress">Image Compressor</Link>
                        <Link href="/image-convert">Image Converter</Link>
                    </div>
                </div>
                <div>
                    <p className="tracking-tight font-medium">Video Tools</p>
                    <div className="text-sm tracking-tight flex flex-col gap-2 pt-2">
                        <Link href="/video-convert">Video Converter</Link>
                    </div>
                </div>
                <div>
                    <p className="tracking-tight font-medium">Audio Tools</p>
                    <div className="text-sm tracking-tight flex flex-col gap-2 pt-2">
                        <Link href="/audio-convert">Audio Converter</Link>
                    </div>
                </div>
                <div>
                    <p className="tracking-tight font-medium">Document Tools</p>
                    <div className="text-sm tracking-tight flex flex-col gap-2 pt-2">
                        <Link href="/pdf-compress">PDF Compressor</Link>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "28px", paddingTop: "0.6px", backgroundColor: "gray"}}>
                <hr></hr>
            </div>
            <p className="tracking-tight text-center text-sm text-muted-foreground" style={{marginTop: "28px"}}>©2024 ConvertandCompress.com. All Rights Reserved.</p>
        </div>
    )
}