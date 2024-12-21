"use client";
import { useState, useRef } from "react";
import { Volume2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AudioCompressor() {
    const [audioSrc, setAudioSrc] = useState(null);
    const [quality, setQuality] = useState(192);
    const [isCompressed, setIsCompressed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const audioContext = useRef(null);
    const sourceNode = useRef(null);

    const qualityOptions = [
        { value: 64, label: "Low (64 kbps)" },
        { value: 128, label: "Medium (128 kbps)" },
        { value: 192, label: "High (192 kbps)" },
        { value: 320, label: "Very High (320 kbps)" },
    ];

    const handleAudioChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioSrc(url);
            setIsCompressed(false);

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
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleCompress = async () => {
        if (!audioSrc) return;

        try {
            const response = await fetch(audioSrc);
            const blob = await response.blob();

            const arrayBuffer = await blob.arrayBuffer();

            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
            const offlineAudioContext = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                audioBuffer.length,
                audioBuffer.sampleRate
            );

            const source = offlineAudioContext.createBufferSource();
            source.buffer = audioBuffer;

            const gainNode = offlineAudioContext.createGain();
            gainNode.gain.value = quality / 320;

            source.connect(gainNode).connect(offlineAudioContext.destination);
            source.start(0);

            const renderedBuffer = await offlineAudioContext.startRendering();
            const compressedBlob = new Blob([renderedBuffer], { type: "audio/mp3" });
            const compressedUrl = URL.createObjectURL(compressedBlob);

            setAudioSrc(compressedUrl);
            setIsCompressed(true);
        } catch (error) {
            console.error("Error compressing audio:", error);
        }
    };

    const handleDownload = async () => {
        if (!audioSrc || !isCompressed) return;

        try {
            const response = await fetch(audioSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `compressed-audio.mp3`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading compressed audio:", error);
        }
    };

    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="navbar_in_pages">
                    <Navbar />
                </div>
                <Card className="card flex flex-col justify-center items-center shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-normal">Compress Audio</CardTitle>
                        <CardDescription className="font-light">Reduce audio file size while retaining quality</CardDescription>
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
                                <label htmlFor="input" className="font-normal">Select Audio</label>
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
                                    <Select onValueChange={(value) => setQuality(parseInt(value))}>
                                        <SelectTrigger className="rounded-sm">
                                            <SelectValue placeholder="Select Compression Quality" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-sm">
                                            {qualityOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value.toString()}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    className="text-white rounded-sm font-light"
                                    onClick={handleCompress}
                                >
                                    Compress Audio
                                </Button>
                            </div>
                        )}
                        {isCompressed && (
                            <div className="flex flex-col justify-center items-center gap-4">
                                <Button
                                    className="text-white rounded-sm font-light"
                                    onClick={handleDownload}
                                >
                                    Download Compressed Audio
                                </Button>
                                <audio
                                    controls
                                    src={audioSrc}
                                    className="w-full"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    );
}
