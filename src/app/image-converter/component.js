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
import { Slider } from "@/components/ui/slider"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast"

export default function ImageConvert() {
    const [images, setImages] = useState([]);
    const { toast } = useToast()

    const formatOptions = [
        { value: "jpg", label: "JPG" },
        { value: "jpeg", label: "JPEG" },
        { value: "png", label: "PNG" },
        { value: "webp", label: "WebP" },
        { value: "bmp", label: "BMP" },
        { value: "gif", label: "GIF" },
        { value: "tiff", label: "TIFF" },
        { value: "ico", label: "ICO" },
        { value: "avif", label: "AVIF" }
    ];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImages(prevImages => {
                    const newImage = {
                        file,
                        src: event.target.result,
                        format: "jpg",
                        quality: 80,
                        isConverted: false,
                        fileName: file.name.replace(/\.[^/.]+$/, ""),
                        fileExtension: file.name.split('.').pop()
                    };

                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);

                        newImage.canvas = canvas;
                        newImage.isConverted = true;
                        setImages(prevImgs => prevImgs.map(img =>
                            img === newImage ? { ...img, isConverted: true } : img
                        ));
                    };

                    return [...prevImages, newImage];
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFormatChange = (value, index) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages[index] = { ...newImages[index], format: value };
            return newImages;
        });
    };

    const handleQualityChange = (value, index) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages[index] = { ...newImages[index], quality: value[0] };
            return newImages;
        });
    };

    const handleDownload = (image) => {
        const { canvas, format, quality, fileName } = image;
        const downloadLink = document.createElement("a");
        const normalizedQuality = quality / 100;

        switch (format) {
            case "png":
                const tempCanvas = document.createElement("canvas");
                const ctx = tempCanvas.getContext("2d");
                const scaleFactor = 0.7;
                tempCanvas.width = canvas.width * scaleFactor;
                tempCanvas.height = canvas.height * scaleFactor;
                ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
                downloadLink.href = tempCanvas.toDataURL("image/png");
                break;
            case "webp":
                downloadLink.href = canvas.toDataURL("image/webp", normalizedQuality);
                break;
            case "bmp":
                downloadLink.href = canvas.toDataURL("image/bmp");
                break;
            case "gif":
                downloadLink.href = canvas.toDataURL("image/gif");
                break;
            case "ico":
                const icoCanvas = document.createElement("canvas");
                const icoCtx = icoCanvas.getContext("2d");
                icoCanvas.width = 32;
                icoCanvas.height = 32;
                icoCtx.drawImage(canvas, 0, 0, 32, 32);
                downloadLink.href = icoCanvas.toDataURL("image/x-icon");
                break;
            default:
                downloadLink.href = canvas.toDataURL(`image/${format}`, normalizedQuality);
        }

        downloadLink.download = `${fileName}_converted.${format}`;
        downloadLink.click();
    };

    const downloadAll = async () => {
        const convertedImages = images.filter(image => image.isConverted);

        for (let i = 0; i < convertedImages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            handleDownload(convertedImages[i]);
        }

        if (convertedImages.length > 0) {
            toast({
                title: `Downloaded ${convertedImages.length} files`,
                description: "All files have been downloaded successfully",
            })
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
                        <CardTitle className="text-center text-xl font-normal">Convert Images</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-5 w-full">
                        <Button variant="secondary" className="rounded-full">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                id="input"
                                hidden
                                onChange={handleImageChange}
                            />
                            <label htmlFor="input" className="font-normal">Select Images</label>
                        </Button>

                        {images.length > 0 && (
                            <div className="w-full space-y-4">
                                {images.map((image, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm">{image.fileName.length > 15 ? image.fileName.slice(0, 15) + "..." : image.fileName}.{image.fileExtension}</span>
                                        </div>

                                        {['jpg', 'jpeg', 'webp'].includes(image.format) && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-xs text-gray-500">Quality</label>
                                                    <span className="text-xs text-gray-500">{image.quality}%</span>
                                                </div>
                                                <Slider
                                                    defaultValue={[80]}
                                                    max={100}
                                                    step={1}
                                                    onValueChange={(value) => handleQualityChange(value, index)}
                                                />
                                            </div>
                                        )}
                                        <div className="w-full flex items-center justify-between" style={{ gap: "9px" }}>
                                            <Select
                                                value={image.format}
                                                onValueChange={(value) => handleFormatChange(value, index)}
                                            >
                                                <SelectTrigger className="w-full rounded-sm">
                                                    <SelectValue placeholder="Format" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-sm">
                                                    {formatOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {image.isConverted && (
                                                <Button
                                                    className="rounded-sm text-white font-normal"
                                                    onClick={() => handleDownload(image)}
                                                >
                                                    <Download />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {images.length > 1 && (
                            <Button
                                onClick={downloadAll}
                                className="rounded-sm text-white font-normal"
                            >
                                Download All Images
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    );
}