'use client'
import { ChevronDown, FileImage, FileMusic, FileVideo } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SearchTool from "./search";

const TOOL_CATEGORIES = {
    "Image Tools": [
        { name: "Image Compressor", link: "/image-compressor", Icon: FileImage },
        { name: "Image Converter", link: "/image-converter", Icon: FileImage },
    ],
    "Video Tools": [
        { name: "Video Converter", link: "/video-converter", Icon: FileVideo },
    ],
    "Audio Tools": [
        { name: "Audio Converter", link: "/audio-converter", Icon: FileMusic },
    ],
    "Document Tools": [
        { name: "PDF Compressor", link: "/pdf-compressor", Icon: FileImage },
        { name: "PDF to JPG", link: "/pdf-to-jpg", Icon: FileImage },
        { name: "PDF to Word", link: "/pdf-to-word", Icon: FileImage },
    ]
};

const ToolCategory = ({ title, tools }) => (
    <div className="space-y-3">
        <p className="text-sm font-normal text-gray-900">{title}</p>
        <div className="flex flex-col space-y-2">
            {tools.map(({ name, link, Icon }) => (
                <Link
                    key={name}
                    href={link}
                    className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                    {Icon && (
                        <Icon
                            size={16}
                            className="text-gray-400 group-hover:text-gray-900 transition-colors duration-200"
                        />
                    )}
                    {name}
                </Link>
            ))}
        </div>
    </div>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="text-xl text-gray-900 hover:text-gray-700 transition-colors">
                        <span className="font-normal">Convert</span>
                        <span className="font-light">&</span>
                        <span className="font-normal">Compress</span>
                    </Link>

                    <div
                        className="relative h-16 flex items-center"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            All Tools
                            <ChevronDown
                                size={16}
                                className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isOpen && (
                            <div className="absolute top-16 left-0 bg-white border border-gray-100 rounded-lg shadow-lg min-w-[600px]" style={{ padding: "24.3px" }}>
                                <div className="grid grid-cols-3" style={{ gap: "24px" }}>
                                    {Object.entries(TOOL_CATEGORIES).map(([category, tools]) => (
                                        <ToolCategory key={category} title={category} tools={tools} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden lg:block w-72">
                    <SearchTool />
                </div>
            </div>
        </nav>
    );
}