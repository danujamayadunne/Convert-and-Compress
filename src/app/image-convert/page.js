'use client'
import { useState } from "react";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export default function ImageConvert() {

    const { setTheme } = useTheme()
    const [imageSrc, setImageSrc] = useState(null);
    const [format, setFormat] = useState("jpg");
    const [isConverted, setIsConverted] = useState(false);


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

        if (format === "png") {
            const tempCanvas = document.createElement("canvas");
            const ctx = tempCanvas.getContext("2d");
            const scaleFactor = 0.7;
            tempCanvas.width = canvas.width * scaleFactor;
            tempCanvas.height = canvas.height * scaleFactor;

            ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
            downloadLink.href = tempCanvas.toDataURL("image/png");
        } else {
            downloadLink.href = canvas.toDataURL(`image/${format}`, 0.8);
        }

        downloadLink.download = `converted-image.${format}`;
        downloadLink.click();
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
                    <CardTitle className="text-center text-xl">Convert Images</CardTitle>
                    <CardDescription>Convert images to JPG, JPEG, or PNG.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    <Button variant={"outline"} className="rounded-full">
                        <input type="file" accept="image/*" id="input" hidden onChange={handleImageChange} />
                        <label htmlFor="input">Select Image</label>
                    </Button>
                    <canvas id="canvas" className="hidden"></canvas>
                    {imageSrc &&
                        <img src={imageSrc} className="preview" alt="Compressed preview" />
                    }
                    {imageSrc &&
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-sm text-center text-gray-500"></p>
                                <p className="text-sm text-center text-gray-500"></p>
                            </div>
                            <Select onValueChange={(value) => setFormat(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Image Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jpg">JPG</SelectItem>
                                    <SelectItem value="jpeg">JPEG</SelectItem>
                                    <SelectItem value="png">PNG</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    }
                    {isConverted &&
                        <Button className="rounded-full" onClick={handleDownload}>Download</Button>
                    }
                </CardContent>
                <CardFooter>
                    <p className="text-sm tracking-tight text-center text-gray-500">No data is sent to servers.<br />Convert happens on your device.</p>
                </CardFooter>
            </Card>
            <p className="footer text-xs tracking-tight text-center">
                Yess, This is 100% Free. Just a fun project by <Link href="https://x.com/DanujaSanjitha">@DanujaSanjitha</Link>. Made in 🇱🇰
            </p>
        </div>
    )
}