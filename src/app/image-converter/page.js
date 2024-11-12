'use client'
import { useState } from "react";
import { ArrowLeft} from "lucide-react"
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

export default function ImageConvert() {
    const [imageSrc, setImageSrc] = useState(null);
    const [format, setFormat] = useState("jpg");
    const [isConverted, setIsConverted] = useState(false);
    const [quality, setQuality] = useState(80);

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
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageSrc(event.target.result);
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                setIsConverted(true);
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        const canvas = document.getElementById("canvas");
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

        downloadLink.download = `converted-image.${format}`;
        downloadLink.click();
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
                    <CardTitle className="text-center text-xl">Convert Images</CardTitle>
                    <CardDescription className="text-center">Convert images to multiple formats <br/> with quality control</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    {!imageSrc && (
                        <Button variant="secondary" className="rounded-full">
                            <input type="file" accept="image/*" id="input" hidden onChange={handleImageChange} />
                            <label htmlFor="input">Select Image</label>
                        </Button>
                    )}
                    <canvas id="canvas" className="hidden"></canvas>
                    {imageSrc && (
                        <img src={imageSrc} className="preview max-w-md h-auto" alt="Conversion preview" />
                    )}
                    {imageSrc && (
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <Select onValueChange={(value) => setFormat(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Image Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formatOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            {['jpg', 'jpeg', 'webp'].includes(format) && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <label className="text-sm text-gray-500">Quality</label>
                                        <span className="text-sm text-gray-500">{quality}%</span>
                                    </div>
                                    <Slider
                                        defaultValue={[80]}
                                        max={100}
                                        step={1}
                                        onValueChange={(value) => setQuality(value[0])}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {isConverted && (
                        <Button className="rounded-full" variant="accent" onClick={handleDownload}>
                            Download Converted Image
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}