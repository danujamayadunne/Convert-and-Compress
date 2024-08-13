'use client'
import { useRef, useState } from 'react';
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes"
import loadFFMPEG from "@/components/ffmpeg";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

export default function VideoCompress() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [compressedVideoURL, setCompressedVideoURL] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ffmpegRef = useRef(null);
    const videoRef = useRef(null);
    const messageRef = useRef(null);
    const { setTheme } = useTheme()

    const initializeFFMPEG = async () => {
        setIsLoading(true);
        const ffmpeg = await loadFFMPEG(messageRef);
        ffmpegRef.current = ffmpeg;
        setLoaded(true);
        setIsLoading(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsProcessing(true);
            if (!loaded) {
                await initializeFFMPEG();
            }
            const ffmpeg = ffmpegRef.current;
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = async () => {
                const arrayBuffer = fileReader.result;
                if (arrayBuffer) {
                    // Write file to FFmpeg
                    await ffmpeg.writeFile('input.mp4', new Uint8Array(arrayBuffer));
                    await ffmpeg.exec(['-i', 'input.mp4', '-b:v', '1M', 'output.mp4']);
                    const data = await ffmpeg.readFile('output.mp4');
                    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
                    const videoURL = URL.createObjectURL(videoBlob);
                    setCompressedVideoURL(videoURL);
                    setIsProcessing(false);
                }
            };
            fileReader.onerror = (error) => {
                console.error('File reading error:', error);
                setIsProcessing(false);
            };
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="back">
                <Link href="/">
                    <Button className="flex gap-1" variant={"outline"}>
                        <ArrowLeft style={{ width: "13px", height: "13px" }} />
                        Back
                    </Button>
                </Link>
            </div>
            <div className="theme">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Card className="card flex flex-col justify-center items-center shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Compress Videos</CardTitle>
                    <CardDescription>Compress videos to reduce file size</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    <Button variant={"outline"} className="rounded-full">
                        <input
                            type="file"
                            accept="video/*"
                            id="input"
                            onChange={handleFileChange}
                            hidden
                        />
                        <label htmlFor="input">Select Video</label>
                    </Button>
                    {compressedVideoURL && (
                        <div>
                            <div className="flex justify-center previewvideo">
                                <video className="previewvideo" ref={videoRef} controls src={compressedVideoURL} />
                            </div>
                            <div className="flex justify-center mt-5">
                                <a href={compressedVideoURL} download="compressed-video.mp4">
                                    <Button className="rounded-full">Download</Button>
                                </a>
                            </div>
                        </div>
                    )}
                    <p ref={messageRef} className="text-sm text-center tracking-tighter text-gray-500"></p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm tracking-tight text-center text-gray-500">No data is sent to servers.<br />Compression happens on your device.</p>
                </CardFooter>
            </Card>
            <p className="footer text-xs tracking-tight text-center">
                Yes, this is 100% free. Just a fun project by <Link href="https://x.com/DanujaSanjitha">@DanujaSanjitha</Link>. Made in 🇱🇰
            </p>
        </div>
    );
}
