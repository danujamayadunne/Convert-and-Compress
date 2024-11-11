'use client'
import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import JSZip from 'jszip';

let pdfjsLib;

export default function PDFToJPG() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedImages, setConvertedImages] = useState([]);
    const [fileName, setFileName] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [isPdfLibLoaded, setPdfLibLoaded] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadPdfLib = async () => {
            pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;
            setPdfLibLoaded(true);
        };
        loadPdfLib();
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && isPdfLibLoaded) {
            setSelectedFile(file);
            setConvertedImages([]);
            const name = file.name.replace(/\.[^/.]+$/, "");
            setFileName(name);
            await convertPDFToJPG(file);
        }
    };

    const convertPDFToJPG = async (file) => {
        setIsConverting(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const totalPages = pdf.numPages;
            const images = [];

            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 2.0 });

                if (!canvasRef.current) {
                    const canvas = document.createElement('canvas');
                    canvasRef.current = canvas;
                }

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
                images.push({
                    url: imageUrl,
                    pageNumber: pageNum
                });
            }

            setConvertedImages(images);
        } catch (error) {
            console.error('Error converting PDF:', error);
            alert('Error converting PDF. Please try again.');
        } finally {
            setIsConverting(false);
        }
    };

    const downloadImage = (dataUrl, pageNumber) => {
        const link = document.createElement('a');
        link.download = `${fileName}_page${pageNumber}.jpg`;
        link.href = dataUrl;
        link.click();
    };

    const downloadAllImages = async () => {
        const zip = new JSZip();

        convertedImages.forEach((image, index) => {
            const imageData = image.url.split(',')[1];
            zip.file(`${fileName}_page${index + 1}.jpg`, imageData, { base64: true });
        });

        const content = await zip.generateAsync({ type: "blob" });
        const link = document.createElement('a');
        link.download = `${fileName}.zip`;
        link.href = URL.createObjectURL(content);
        link.click();
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="back">
                <Link href="/">
                    <Button className="flex gap-1" variant={"secondary"}>
                        <ArrowLeft style={{ width: "13px", height: "13px" }} />
                        Back
                    </Button>
                </Link>
            </div>
            <Card className="card flex flex-col justify-center items-center shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">PDF to JPG Converter</CardTitle>
                    <CardDescription>Convert PDF pages to JPG</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    {!convertedImages.length && !isConverting && (
                        <Button variant="secondary" className="rounded-full">
                            <input
                                type="file"
                                accept="application/pdf"
                                id="input"
                                onChange={handleFileChange}
                                disabled={!isPdfLibLoaded}
                                hidden
                            />
                            <label htmlFor="input" className="cursor-pointer">
                                {isPdfLibLoaded ? 'Select PDF' : 'Loading...'}
                            </label>
                        </Button>
                    )}

                    {isConverting && (
                        <div className="w-full space-y-2">
                            <div className="text-center tracking-tight">Converting PDF pages...</div>
                        </div>
                    )}

                    {convertedImages.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {convertedImages.map((image, index) => (
                                <div key={index} className="flex flex-col items-center gap-6 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Page {image.pageNumber}</div>
                                    <img
                                        src={image.url}
                                        alt={`Page ${image.pageNumber}`}
                                        className="rounded-md shadow-sm"
                                        style={{ width: "400px", height: "200px", objectFit: "cover" }}
                                    />
                                    <Button
                                        variant="accent"
                                        className="w-full md:w-auto"
                                        onClick={() => downloadImage(image.url, image.pageNumber)}
                                    >
                                        Download Page {image.pageNumber}
                                    </Button>
                                </div>
                            ))}

                            <div>
                                <Button
                                    variant="accent"
                                    onClick={downloadAllImages}
                                >
                                    Download All Pages as ZIP
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}