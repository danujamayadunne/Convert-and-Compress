'use client'
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
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
import Link from "next/link";

export default function MP4toWEB() {

    const { setTheme } = useTheme()
    const [videoFile, setVideoFile] = useState(null);
    const [convertedUrl, setConvertedUrl] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const videoRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
            alert("Sorry, Video to WebM is not supported to Safari browser.");
        }

        if (videoFile) {
            const url = URL.createObjectURL(videoFile);
            if (videoRef.current) {
                videoRef.current.src = url;
            }
            convertVideoToWebM(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [videoFile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const convertVideoToWebM = async (videoUrl) => {
        try {
            const video = document.createElement('video');
            video.src = videoUrl;

            await new Promise((resolve, reject) => {
                video.onloadedmetadata = () => resolve();
                video.onerror = () => reject(new Error('Failed to load video metadata'));
            });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const stream = canvas.captureStream();
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

            const chunks = [];
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setConvertedUrl(url);
            };

            mediaRecorder.start();
            video.play();

            startTimeRef.current = performance.now();
            let framesProcessed = 0;
            const totalFrames = Math.floor(video.duration * 60);

            const renderFrame = () => {
                if (!video.paused && !video.ended) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    framesProcessed++;

                    const elapsedTime = (performance.now() - startTimeRef.current) / 1000;
                    const averageFrameTime = elapsedTime / framesProcessed;
                    const remainingFrames = totalFrames - framesProcessed;
                    const remainingTime = averageFrameTime * remainingFrames;

                    setEstimatedTime(Math.max(remainingTime, 0).toFixed(2));

                    requestAnimationFrame(renderFrame);
                } else {
                    mediaRecorder.stop();
                }
            };
            video.oncanplay = () => {
                renderFrame();
            };

        } catch (error) {
            console.error('Error converting video:', error);
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
                    <CardTitle className="text-center text-xl">Video to WebM</CardTitle>
                    <CardDescription>Convert Videos to WebM</CardDescription>
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
                    {convertedUrl && (
                        <div>
                            <div>
                                <video ref={videoRef} />
                            </div>
                            <div className="flex justify-center mt-5">
                                <a href={convertedUrl} download="converted.webm">
                                    <Button className="rounded-full">Download</Button>
                                </a>
                            </div>
                        </div>
                    )}
                    {estimatedTime !== null && (
                        <p className="text-sm text-center tracking-tighter text-gray-500">
                            Estimated Time: {estimatedTime}
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <p className="text-sm tracking-tight text-center text-gray-500">No data is sent to servers.<br />Compression happens on your device.</p>
                </CardFooter>
            </Card>
            <p className="footer text-xs tracking-tight text-center">
                Yes, this is 100% free. Just a fun project by <Link href="https://x.com/DanujaSanjitha">@DanujaSanjitha</Link>. Made in 🇱🇰
            </p>
        </div>
    )
}