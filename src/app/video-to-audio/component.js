'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast"

export default function VideoToAudio() {
    const [videos, setVideos] = useState([]);
    const { toast } = useToast();

    const audioOptions = [
        { value: "mp3", label: "MP3" },
        { value: "wav", label: "WAV" },
        { value: "ogg", label: "OGG" }
    ];

    const extractAudio = async (file) => {
        try {
            const video = document.createElement('video');
            const videoUrl = URL.createObjectURL(file);
            video.src = videoUrl;

            await new Promise((resolve) => {
                video.addEventListener('loadedmetadata', resolve);
            });

            const audioContext = new AudioContext();
            const mediaElement = audioContext.createMediaElementSource(video);
            const destination = audioContext.createMediaStreamDestination();
            mediaElement.connect(destination);
            mediaElement.connect(audioContext.destination);

            const mediaRecorder = new MediaRecorder(destination.stream);
            const chunks = [];

            return new Promise((resolve) => {
                mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/mp3' });
                    resolve(blob);
                };

                video.play();
                mediaRecorder.start();

                video.addEventListener('ended', () => {
                    mediaRecorder.stop();
                    video.remove();
                    URL.revokeObjectURL(videoUrl);
                });
            });
        } catch (error) {
            console.error('Error extracting audio:', error);
            throw error;
        }
    };

    const handleVideoChange = async (e) => {
        const files = Array.from(e.target.files);

        for (const file of files) {
            try {
                const videoItem = {
                    file,
                    name: file.name.replace(/\.[^/.]+$/, ""),
                    format: "mp3",
                    duration: 0,
                    size: (file.size / (1024 * 1024)).toFixed(2),
                    isConverting: false,
                    isConverted: false,
                    progress: 0,
                    audioBlob: null
                };

                const video = document.createElement('video');
                const videoUrl = URL.createObjectURL(file);
                video.src = videoUrl;

                await new Promise((resolve) => {
                    video.addEventListener('loadedmetadata', () => {
                        videoItem.duration = Math.round(video.duration);
                        URL.revokeObjectURL(videoUrl);
                        resolve();
                    });
                });

                setVideos(prev => [...prev, videoItem]);
            } catch (error) {
                toast({
                    title: "Error loading video",
                    description: "Failed to load video metadata",
                    variant: "destructive"
                });
            }
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleFormatChange = (value, index) => {
        setVideos(prev => {
            const newVideos = [...prev];
            newVideos[index] = { ...newVideos[index], format: value };
            return newVideos;
        });
    };

    const handleConvert = async (index) => {
        setVideos(prev => {
            const newVideos = [...prev];
            newVideos[index] = { ...newVideos[index], isConverting: true, progress: 0 };
            return newVideos;
        });

        try {
            const video = videos[index];
            const audioBlob = await extractAudio(video.file);

            setVideos(prev => {
                const newVideos = [...prev];
                newVideos[index] = {
                    ...newVideos[index],
                    isConverting: false,
                    isConverted: true,
                    progress: 100,
                    audioBlob
                };
                return newVideos;
            });

            toast({
                title: "Conversion complete",
                description: `Successfully extracted audio from ${video.name}`,
            });
        } catch (error) {
            setVideos(prev => {
                const newVideos = [...prev];
                newVideos[index] = { ...newVideos[index], isConverting: false, progress: 0 };
                return newVideos;
            });

            toast({
                title: "Conversion failed",
                description: "Failed to extract audio from video",
                variant: "destructive"
            });
        }
    };

    const handleDownload = (video) => {
        if (!video.audioBlob) return;

        const url = URL.createObjectURL(video.audioBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${video.name}.${video.format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const convertAll = async () => {
        const unconvertedVideos = videos.filter(v => !v.isConverted);

        for (let i = 0; i < unconvertedVideos.length; i++) {
            const index = videos.findIndex(v => v === unconvertedVideos[i]);
            await handleConvert(index);
        }
    };

    const downloadAll = async () => {
        const convertedVideos = videos.filter(v => v.isConverted);

        try {
            const downloadPromises = convertedVideos.map((video, index) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        handleDownload(video);
                        resolve();
                    }, index * 1000);
                });
            });

            await Promise.all(downloadPromises);

            if (convertedVideos.length > 0) {
                toast({
                    title: `Downloaded ${convertedVideos.length} files`,
                    description: "All audio files have been downloaded",
                });
            }
        } catch (error) {
            toast({
                title: "Download failed",
                description: "There was an error downloading the files",
                status: "error"
            });
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
                        <CardTitle className="text-center text-xl font-normal">Convert Video to Audio</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-5 w-full">
                        <Button variant="secondary" className="rounded-full">
                            <input
                                type="file"
                                accept="video/*"
                                multiple
                                id="input"
                                hidden
                                onChange={handleVideoChange}
                            />
                            <label htmlFor="input" className="font-normal flex items-center gap-2">
                                Select Videos
                            </label>
                        </Button>

                        {videos.length > 0 && (
                            <div className="w-full space-y-4">
                                {videos.map((video, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-sm">
                                                {video.name.length > 30
                                                    ? video.name.slice(0, 30) + "..."
                                                    : video.name}
                                            </span>
                                            <div className="flex gap-2 text-xs text-gray-500">
                                                <span>{video.size} MB</span>
                                                <span>•</span>
                                                <span>{formatDuration(video.duration)}</span>
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center justify-between" style={{ gap: "9px" }}>
                                            <Select
                                                value={video.format}
                                                onValueChange={(value) => handleFormatChange(value, index)}
                                            >
                                                <SelectTrigger className="w-full rounded-sm">
                                                    <SelectValue placeholder="Format" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-sm">
                                                    {audioOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            {!video.isConverted && (
                                                <Button
                                                    className="rounded-sm text-white font-normal"
                                                    onClick={() => handleConvert(index)}
                                                    disabled={video.isConverting}
                                                >
                                                    {video.isConverting ? "Converting..." : "Convert"}
                                                </Button>
                                            )}

                                            {video.isConverted && (
                                                <Button
                                                    className="rounded-sm text-white font-normal"
                                                    onClick={() => handleDownload(video)}
                                                >
                                                    <Download size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {videos.length > 1 && (
                            <div className="flex gap-2">
                                <Button
                                    onClick={convertAll}
                                    className="rounded-sm text-white font-normal"
                                    disabled={videos.every(v => v.isConverted)}
                                >
                                    Convert All
                                </Button>
                                <Button
                                    onClick={downloadAll}
                                    className="rounded-sm text-white font-normal"
                                    disabled={!videos.some(v => v.isConverted)}
                                >
                                    Download All
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    );
}