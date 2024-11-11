'use client'
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
import Link from "next/link";
import { PDFDocument } from 'pdf-lib';

export default function PDFCompress() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [quality, setQuality] = useState('0.5');
    const [compressedPDFURL, setCompressedPDFURL] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileExtension, setFileExtension] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setCompressedPDFURL('');
            const name = file.name.replace(/\.[^/.]+$/, "");
            const extension = file.name.split('.').pop();
            setFileName(name);
            setFileExtension(extension);
            await compressPDF(file, parseFloat(quality));
        }
    };

    const handleQualityChange = (value) => {
        const selectedQuality = parseFloat(value);
        setQuality(value);
        if (selectedFile) {
            compressPDF(selectedFile, selectedQuality);
        }
    };

    async function compressPDF(file, quality) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        const compressedPdfBytes = await pdfDoc.save();

        const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setCompressedPDFURL(url);
    }

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
                    <CardTitle className="text-center text-xl">Compress PDF</CardTitle>
                    <CardDescription>Compress PDFs to reduce file size</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-5">
                    {!compressedPDFURL ? (
                        <Button variant={"secondary"} className="rounded-full">
                            <input type="file" accept="application/pdf" id="input" onChange={handleFileChange} hidden />
                            <label htmlFor="input">Select PDF</label>
                        </Button>
                    ) : null}
                    {compressedPDFURL ? (
                        <div className="flex flex-col gap-2">
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
                    ) : null}
                    {compressedPDFURL && (
                        <a href={compressedPDFURL} download={`${fileName}_compressed.${fileExtension}`}>
                            <Button className="rounded-full" variant="accent">Download Compressed PDF</Button>
                        </a>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}