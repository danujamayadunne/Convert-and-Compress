'use client'
import { useState } from "react";
import { Moon, Sun } from "lucide-react"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export default function ImageCompress() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [quality, setQuality] = useState('0.5');
    const [compressedImageURL, setCompressedImageURL] = useState('');
    const [imageSize, setImageSize] = useState('');
    const [originalSize, setOriginalSize] = useState('');
    const [sizeReductionRatio, setSizeReductionRatio] = useState('');
    const { setTheme } = useTheme()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setCompressedImageURL('');
            setImageSize('');
            setSizeReductionRatio('');
            const sizeKB = (file.size / 1024).toFixed(2);
            setOriginalSize(sizeKB);
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
        <div className="flex flex-col justify-center items-center min-h-screen">
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
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Card className="card flex flex-col justify-center items-center shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Compress Images</CardTitle>
                    <CardDescription>Compress images to reduce file size</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    <Button variant={"outline"} className="rounded-full">
                        <input type="file" accept="image/*" id="input" onChange={handleFileChange} hidden />
                        <label htmlFor="input">Select Image</label>
                    </Button>
                    <canvas id="canvas" className="hidden"></canvas>
                    {selectedFile && (
                        <img className="preview" src={compressedImageURL} alt="Compressed preview" />
                    )}
                    {selectedFile && (
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-sm text-center text-gray-500">{imageSize}</p>
                                <p className="text-sm text-center text-gray-500">{sizeReductionRatio}</p>
                            </div>
                            <Select value={quality} onValueChange={handleQualityChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Quality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0.3">Low</SelectItem>
                                    <SelectItem value="0.5">Medium</SelectItem>
                                    <SelectItem value="0.7">High</SelectItem>
                                    <SelectItem value="0.9">Ultra</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {compressedImageURL && (
                        <a href={compressedImageURL} download>
                            <Button className="rounded-full">Download</Button>
                        </a>
                    )}
                </CardContent>
                <CardFooter>
                    <p className="text-sm tracking-tight text-center text-gray-500">No data is sent to servers.<br />Your images stay private and secure!<br />Compression happens on your device.</p>
                </CardFooter>
            </Card>
            <p className="footer text-xs tracking-tight text-center">
                Yess, This is 100% Free. Just a fun project by <Link href="https://x.com/DanujaSanjitha">@DanujaSanjitha</Link>. Made in 🇱🇰
            </p>
        </div>
    )
}
