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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import jsPDF from "jspdf";

export default function PDFConvert() {

    const { setTheme } = useTheme();
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const fileUrls = files.map(file => URL.createObjectURL(file));
        setImages(fileUrls);
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        images.forEach((image, index) => {
            const img = new Image();
            img.src = image;

            img.onload = () => {
                const imgWidth = 210;
                const imgHeight = (img.height * imgWidth) / img.width;
                const pageHeight = imgHeight;

                if (index > 0) {
                    pdf.addPage([imgWidth, pageHeight]);
                }

                pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
                if (index === images.length - 1) {
                    pdf.save("converted-pdf.pdf");
                }
            };
        });
    };

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
                    <CardTitle className="text-center text-xl">Convert Images to PDF</CardTitle>
                    <CardDescription className="text-center">Convert images to PDF</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    <Button variant={"outline"} className="rounded-full">
                        <input type="file" accept="image/*" id="input" hidden multiple onChange={handleImageChange} />
                        <label htmlFor="input">Select Images</label>
                    </Button>
                    <canvas id="canvas" className="hidden"></canvas>
                    {images.length === 1 ? (
                        <img src={images[0]} className="preview" alt="Preview" width={100} />
                    ) : (
                        <div className="image_grid">
                            {images.map((image, index) => (
                                <img key={index} src={image} className="preview" alt={`Preview ${index}`} width={100} />
                            ))}
                        </div>
                    )}
                    {images.length > 0 && (
                        <Button className="rounded-full" onClick={handleDownloadPDF}>Download</Button>
                    )}
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