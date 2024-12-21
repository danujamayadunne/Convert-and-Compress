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
import { PDFDocument } from 'pdf-lib';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="navbar_in_pages">
                    <Navbar />
                </div>
                <Card className="card flex flex-col justify-center items-center shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-normal">Compress PDF</CardTitle>
                        <CardDescription className="font-light">Compress PDFs to reduce file size</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-5">
                        {!compressedPDFURL ? (
                            <Button variant="secondary" className="rounded-full">
                                <input type="file" accept="application/pdf" id="input" onChange={handleFileChange} hidden />
                                <label htmlFor="input" className="font-normal">Select PDF</label>
                            </Button>
                        ) : null}
                        {compressedPDFURL ? (
                            <div className="flex flex-col gap-2">
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
                        ) : null}
                        {compressedPDFURL && (
                            <a href={compressedPDFURL} download={`${fileName}_compressed.${fileExtension}`}>
                                <Button className="rounded-sm text-white font-light">Download Compressed PDF</Button>
                            </a>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    );
}