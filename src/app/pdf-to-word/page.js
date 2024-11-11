'use client'
import { useState, useEffect } from "react";
import { ArrowLeft, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Document, Packer, Paragraph } from 'docx';

let pdfjsLib;

export default function PDFToWord() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [isPdfLibLoaded, setPdfLibLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [convertedDoc, setConvertedDoc] = useState(null);

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
            setConvertedDoc(null);
            const name = file.name.replace(/\.[^/.]+$/, "");
            setFileName(name);
            await convertPDFToWord(file);
        }
    };

    const extractTextFromPage = async (page) => {
        const textContent = await page.getTextContent();
        return textContent.items
            .map(item => item.str)
            .join(' ');
    };

    const convertPDFToWord = async (file) => {
        setIsConverting(true);
        setProgress(0);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const totalPages = pdf.numPages;
            let extractedText = [];

            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const pageText = await extractTextFromPage(page);
                extractedText.push(pageText);

                setProgress((pageNum / totalPages) * 100);
            }

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: extractedText.map(text =>
                        new Paragraph({
                            text: text,
                            spacing: {
                                after: 200
                            }
                        })
                    )
                }]
            });

            const blob = await Packer.toBlob(doc);
            setConvertedDoc(blob);

        } catch (error) {
            console.error('Error converting PDF:', error);
            alert('Error converting PDF. Please try again.');
        } finally {
            setIsConverting(false);
            setProgress(0);
        }
    };

    const handleDownload = () => {
        if (convertedDoc) {
            const url = URL.createObjectURL(convertedDoc);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
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
                    <CardTitle className="text-center text-xl">PDF to Word Converter</CardTitle>
                    <CardDescription>Convert PDF documents to Word format</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col justify-center items-center gap-5">
                    {!isConverting && !convertedDoc && (
                        <Button variant="secondary" className="w-full">
                            <input
                                type="file"
                                accept="application/pdf"
                                id="input"
                                onChange={handleFileChange}
                                disabled={!isPdfLibLoaded}
                                hidden
                            />
                            <label htmlFor="input" className="w-full cursor-pointer text-center">
                                {isPdfLibLoaded ? 'Select PDF' : 'Loading...'}
                            </label>
                        </Button>
                    )}

                    {isConverting && (
                        <div className="w-full space-y-2">
                            <div className="text-center">Converting PDF to Word...</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                {Math.round(progress)}%
                            </div>
                        </div>
                    )}

                    {convertedDoc && !isConverting && (
                        <div className="w-full flex flex-col gap-6 items-center">
                            <p className="tracking-tight text-sm font-medium">
                                Converted successfully.
                            </p>
                            <Button
                                onClick={handleDownload}
                                className="w-full flex items-center justify-center gap-2"
                                variant="accent"
                            >
                                <FileDown className="w-4 h-4" />
                                Download Word Document
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}