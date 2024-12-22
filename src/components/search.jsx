import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, FileMusic, FileVideo, FileText, Search, Ruler } from "lucide-react";
import Link from "next/link";

export default function SearchTool() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const tools = [
        { name: "Image Compressor", category: "Image Tools", icon: FileImage, link: "/image-compressor", keywords: ["compress", "image", "photo", "picture", "reduce size"] },
        { name: "Image Converter", category: "Image Tools", icon: FileImage, link: "/image-converter", keywords: ["convert", "image", "photo", "picture", "format", "webp", "png", "jpg", "jpeg"] },
        { name: "Video Converter", category: "Video Tools", icon: FileVideo, link: "/video-converter", keywords: ["convert", "video", "mp4", "format", "mov", "avi", "webm"] },
        { name: "Audio Converter", category: "Audio Tools", icon: FileMusic, link: "/audio-converter", keywords: ["convert", "audio", "mp3", "wav", "sound", "music"] },
        { name: "PDF Compressor", category: "Document Tools", icon: FileText, link: "/pdf-compressor", keywords: ["compress", "pdf", "document", "reduce size"] },
        { name: "PDF to JPG", category: "Document Tools", icon: FileText, link: "/pdf-to-jpg", keywords: ["convert", "pdf", "jpg", "image", "document"] },
        { name: "PDF to Word", category: "Document Tools", icon: FileText, link: "/pdf-to-word", keywords: ["convert", "pdf", "word", "document"] },
        { name: "Unit Converter", category: "Unit Converter", icon: Ruler, link: "/unit-converter", keywords: ["convert", "unit", "length", "weight", "temperature", "speed", "time", "area", "volume", "pressure", "angle", "data", "enery", "pressure"] },
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

    return (
        <div className="relative w-full">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border-0 pl-10 h-9 text-sm placeholder:text-gray-400 focus:ring-0 focus:border-gray-200"
                />
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>

            {isSearching && searchQuery && (
                <Card className="absolute w-full mt-2 border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        {searchResults.length > 0 ? (
                            <div className="py-2">
                                {searchResults.map((tool, index) => {
                                    const Icon = tool.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={tool.link}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                                <Icon size={16} className="text-gray-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-900">{tool.name}</span>
                                                <span className="text-xs text-gray-400">{tool.category}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500">
                                No tools found
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};