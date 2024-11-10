'use client'
import { useState, useRef } from "react";
import { ArrowLeft, Play, Pause, Volume2, Settings2, Maximize2, VolumeX } from "lucide-react"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider"
import Link from "next/link";

export default function VideoConvert() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [format, setFormat] = useState("mp4");
    const [quality, setQuality] = useState("1080p");
    const [isConverted, setIsConverted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const formatOptions = [
        { value: "mp4", label: "MP4" },
        { value: "webm", label: "WebM" },
        { value: "mov", label: "MOV" },
        { value: "avi", label: "AVI" },
        { value: "mkv", label: "MKV" },
        { value: "flv", label: "FLV" }
    ];

    const qualityOptions = [
        { value: "480p", label: "480p (SD)" },
        { value: "720p", label: "720p (HD)" },
        { value: "1080p", label: "1080p (Full HD)" },
        { value: "1440p", label: "1440p (2K)" },
        { value: "2160p", label: "2160p (4K)" }
    ];

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoSrc(url);
            setIsConverted(true);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (value) => {
        const newVolume = value[0];
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const handleDownload = async () => {
        if (!videoSrc) return;

        try {
            const response = await fetch(videoSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `converted-video.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading video:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            <div className="back">
                <Link href="/">
                    <Button className="flex gap-1" variant="secondary">
                        <ArrowLeft className="w-3 h-3" />
                        Back
                    </Button>
                </Link>
            </div>
            <Card className="card flex flex-col justify-center items-center shadow-md max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Convert Video</CardTitle>
                    <CardDescription className="text-center">Convert videos to different formats <br /> and qualities</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    {!videoSrc && (
                        <Button variant="secondary" className="rounded-full">
                            <input
                                type="file"
                                accept="video/*"
                                id="input"
                                hidden
                                onChange={handleVideoChange}
                            />
                            <label htmlFor="input" className="cursor-pointer">Select Video</label>
                        </Button>
                    )}

                    {videoSrc && (
                        <div ref={containerRef} className="space-y-4">
                            <div className="relative rounded-lg overflow-hidden bg-black">
                                <video
                                    ref={videoRef}
                                    src={videoSrc}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onEnded={() => setIsPlaying(false)}
                                    style={{width: "500px", height: "auto"}}
                                />

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <div className="flex flex-col gap-2">
                                        <Slider
                                            defaultValue={[0]}
                                            max={duration}
                                            step={0.1}
                                            value={[currentTime]}
                                            onValueChange={(value) => {
                                                if (videoRef.current) {
                                                    videoRef.current.currentTime = value[0];
                                                    setCurrentTime(value[0]);
                                                }
                                            }}
                                            className="cursor-pointer"
                                        />

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-white hover:text-white/80"
                                                    onClick={togglePlay}
                                                >
                                                    {isPlaying ?
                                                        <Pause className="h-4 w-4" /> :
                                                        <Play className="h-4 w-4" />
                                                    }
                                                </Button>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-white hover:text-white/80"
                                                        onClick={toggleMute}
                                                    >
                                                        {isMuted ?
                                                            <VolumeX className="h-4 w-4" /> :
                                                            <Volume2 className="h-4 w-4" />
                                                        }
                                                    </Button>
                                                    <div className="w-20">
                                                        <Slider
                                                            defaultValue={[1]}
                                                            max={1}
                                                            step={0.1}
                                                            value={[volume]}
                                                            onValueChange={handleVolumeChange}
                                                            className="cursor-pointer"
                                                        />
                                                    </div>
                                                </div>

                                                <span className="text-sm text-white">
                                                    {formatTime(currentTime)} / {formatTime(duration)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-white hover:text-white/80"
                                                    onClick={toggleFullscreen}
                                                >
                                                    <Maximize2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6 pt-2">
                                <div className="flex flex-col gap-2 w-40">
                                    <Select onValueChange={(value) => setFormat(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Video Format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {formatOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(value) => setQuality(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Video Quality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {qualityOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Button
                                        className="rounded-full"
                                        variant="accent"
                                        onClick={handleDownload}
                                    >
                                        Download Converted Video
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <p className="text-sm tracking-tight text-center text-gray-500">
                        No data is sent to servers.<br />Conversion happens on your device.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
