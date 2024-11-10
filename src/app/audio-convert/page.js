'use client'
import { useState, useRef } from "react";
import { ArrowLeft, Volume2, Play, Pause } from "lucide-react"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider"
import Link from "next/link";

export default function AudioConvert() {
    const [audioSrc, setAudioSrc] = useState(null);
    const [format, setFormat] = useState("mp3");
    const [bitrate, setBitrate] = useState(192);
    const [isConverted, setIsConverted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const audioContext = useRef(null);
    const sourceNode = useRef(null);

    const formatOptions = [
        { value: "mp3", label: "MP3" },
        { value: "wav", label: "WAV" },
        { value: "ogg", label: "OGG" },
        { value: "aac", label: "AAC" },
        { value: "m4a", label: "M4A" },
        { value: "flac", label: "FLAC" },
        { value: "wma", label: "WMA" },
    ];

    const bitrateOptions = [
        { value: 64, label: "64 kbps - Low quality" },
        { value: 128, label: "128 kbps - Standard quality" },
        { value: 192, label: "192 kbps - High quality" },
        { value: 256, label: "256 kbps - Very high quality" },
        { value: 320, label: "320 kbps - Maximum quality" }
    ];

    const handleAudioChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioSrc(url);
            setIsConverted(true);

            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const arrayBuffer = await file.arrayBuffer();
            const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);

            if (sourceNode.current) {
                sourceNode.current.disconnect();
            }

            sourceNode.current = audioContext.current.createBufferSource();
            sourceNode.current.buffer = audioBuffer;
            sourceNode.current.connect(audioContext.current.destination);
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleDownload = async () => {
        if (!audioSrc) return;

        try {
            const response = await fetch(audioSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `converted-audio.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading audio:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="back">
                <Link href="/">
                    <Button className="flex gap-1" variant="secondary">
                        <ArrowLeft className="w-3 h-3" />
                        Back
                    </Button>
                </Link>
            </div>
            <Card className="card flex flex-col justify-center items-center shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Convert Audio</CardTitle>
                    <CardDescription>Convert audio files to various formats</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    {!audioSrc && (
                        <Button variant="secondary" className="rounded-full">
                            <input
                                type="file"
                                accept="audio/*"
                                id="input"
                                hidden
                                onChange={handleAudioChange}
                            />
                            <label htmlFor="input">Select Audio</label>
                        </Button>
                    )}

                    {audioSrc && (
                        <div className="w-full space-y-4">
                            <div className="flex justify-center items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={togglePlay}
                                >
                                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                </Button>
                                <Volume2 className="h-4 w-4" />
                                <div className="flex-1">
                                    <Slider
                                        defaultValue={[0]}
                                        max={duration}
                                        step={0.1}
                                        value={[currentTime]}
                                        onValueChange={(value) => {
                                            if (audioRef.current) {
                                                audioRef.current.currentTime = value[0];
                                                setCurrentTime(value[0]);
                                            }
                                        }}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <span className="text-sm text-gray-500 min-w-[60px]">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <audio
                                ref={audioRef}
                                src={audioSrc}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={() => setIsPlaying(false)}
                                className="hidden"
                            />

                            <div className="space-y-4">
                                <Select onValueChange={(value) => setFormat(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Audio Format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formatOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-sm text-gray-500">Bitrate</label>
                                        <span className="text-sm text-gray-500">{bitrate} kbps</span>
                                    </div>
                                    <Select onValueChange={(value) => setBitrate(parseInt(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Bitrate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bitrateOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value.toString()}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {isConverted && (
                        <Button
                            className="rounded-full w-full"
                            variant="accent"
                            onClick={handleDownload}
                        >
                            Download Converted Audio
                        </Button>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <p className="text-sm tracking-tight text-center text-gray-500">
                        No data is sent to servers.<br />Conversion happens on your browser.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}