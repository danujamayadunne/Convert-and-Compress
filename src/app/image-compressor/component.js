'use client'
import { useState } from "react";
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
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ImageCompress() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [quality, setQuality] = useState('0.5');
    const [compressedImageURL, setCompressedImageURL] = useState('');
    const [imageSize, setImageSize] = useState('');
    const [originalSize, setOriginalSize] = useState('');
    const [sizeReductionRatio, setSizeReductionRatio] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileExtension, setFileExtension] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setCompressedImageURL('');
            setImageSize('');
            setSizeReductionRatio('');
            const sizeKB = (file.size / 1024).toFixed(2);
            setOriginalSize(sizeKB);
            setFileName(file.name.replace(/\.[^/.]+$/, ""));
            setFileExtension(file.name.split('.').pop());
            compressImage(file, parseFloat(quality));
        }
    };

    const handleQualityChange = (value) => {
        const selectedQuality = parseFloat(value);
        setQuality(value);
        if (selectedFile) {
            compressImage(selectedFile, selectedQuality);
        }
    };

    function compressImage(file, quality) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            const width = img.width;
            const height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                const size = (blob.size / 1024).toFixed(2);
                const url = URL.createObjectURL(blob);
                setCompressedImageURL(url);
                setImageSize(`Compressed Size: ${size} KB`);
                const originalSizeNum = parseFloat(originalSize);
                const compressedSizeNum = parseFloat(size);
                if (!isNaN(originalSizeNum) && originalSizeNum > 0 && !isNaN(compressedSizeNum) && compressedSizeNum > 0) {
                    const ratio = (originalSizeNum / compressedSizeNum).toFixed(2);
                    setSizeReductionRatio(`Reduction Ratio: ${ratio}X`);
                } else {
                    setSizeReductionRatio('Reduction Ratio: N/A');
                }
            }, 'image/jpeg', quality);
        };
        img.src = URL.createObjectURL(file);
    }

    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="navbar_in_pages">
                    <Navbar />
                </div>
                <Card className="card flex flex-col justify-center items-center shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-normal">Compress Image</CardTitle>
                        <CardDescription className="font-light">Compress images to reduce file size</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-5">
                        {!compressedImageURL ? (
                            <Button variant="secondary" className="rounded-full">
                                <input type="file" accept="image/*" id="input" onChange={handleFileChange} hidden />
                                <label htmlFor="input" className="font-normal">Select Image</label>
                            </Button>
                        ) : null}
                        <canvas id="canvas" className="hidden"></canvas>
                        {compressedImageURL ? (
                            <img className="preview" src={compressedImageURL} alt="Compressed preview" />
                        ) : null}
                        {selectedFile && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-sm text-center text-gray-500 font-light">{imageSize}</p>
                                    <p className="text-sm text-center text-gray-500 font-light">{sizeReductionRatio}</p>
                                </div>
                                <Select value={quality} onValueChange={handleQualityChange}>
                                    <SelectTrigger className="rounded-sm">
                                        <SelectValue placeholder="Quality" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-sm">
                                        <SelectItem value="0.3">Low</SelectItem>
                                        <SelectItem value="0.5">Medium</SelectItem>
                                        <SelectItem value="0.7">High</SelectItem>
                                        <SelectItem value="0.9">Ultra</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {compressedImageURL && (
                            <a href={compressedImageURL} download={`${fileName}_compressed.${fileExtension}`}>
                                <Button className="text-white rounded-sm font-light">Download Compressed Image</Button>
                            </a>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    )
}
