import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, FileMusic, FileVideo, FileText } from "lucide-react";
import Link from "next/link";

const SearchTool = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const tools = [
        { name: "Image Compressor", category: "Image Tools", icon: FileImage, link: "/image-compressor", keywords: ["compress", "image", "photo", "picture", "reduce size"] },
        { name: "Image Converter", category: "Image Tools", icon: FileImage, link: "/image-converter", keywords: ["convert", "image", "photo", "picture", "format", "webp"] },
        { name: "Video Converter", category: "Video Tools", icon: FileVideo, link: "/video-converter", keywords: ["convert", "video", "mp4", "format", "mov"] },
        { name: "Audio Converter", category: "Audio Tools", icon: FileMusic, link: "/audio-converter", keywords: ["convert", "audio", "mp3", "sound", "music"] },
        { name: "PDF Compressor", category: "Document Tools", icon: FileText, link: "/pdf-compressor", keywords: ["compress", "pdf", "document", "reduce size"] },
        { name: "PDF to JPG", category: "Document Tools", icon: FileText, link: "/pdf-to-jpg", keywords: ["convert", "pdf", "jpg", "image", "document"] },
        { name: "PDF to Word", category: "Document Tools", icon: FileText, link: "/pdf-to-word", keywords: ["convert", "pdf", "word", "document"] },
    ];

    const searchTools = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const results = tools.filter(tool => {
            const searchString = `${tool.name} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase();
            return searchString.includes(query.toLowerCase());
        });

        setSearchResults(results);
        setIsSearching(true);
    };

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            searchTools(searchQuery);
        }, 300);

        return () => clearTimeout(debounceSearch);
    }, [searchQuery]);

    const getIconColor = (category) => {
        switch (category) {
            case "Image Tools":
                return "text-blue-500";
            case "Video Tools":
                return "text-red-500";
            case "Audio Tools":
                return "text-green-500";
            case "Document Tools":
                return "text-yellow-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <Input
                type="text"
                placeholder="Search for tools..."
                className="rounded-full w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {isSearching && searchQuery && (
                <Card className="absolute w-full mt-2 z-50">
                    <CardContent className="p-2">
                        {searchResults.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {searchResults.map((tool, index) => {
                                    const Icon = tool.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={tool.link}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <Icon className={`w-4 h-4 ${getIconColor(tool.category)}`} />
                                            <div>
                                                <div className="text-sm font-medium">{tool.name}</div>
                                                <div className="text-xs text-gray-500">{tool.category}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-2 text-sm text-gray-500">No tools found</div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SearchTool;