'use client'
import { ChevronDown, FileImage, FileMusic, FileVideo } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdown = useRef(null);

    const toolCategories = {
        "Image Tools": [
            { name: "Image Compressor", link: "/image-compress", icon: FileImage },
            { name: "Image Converter", link: "/image-convert", icon: FileImage },
        ],
        "Video Tools": [
            { name: "Video Converter", link: "/video-convert", icon: FileVideo},
        ],
        "Audio Tools": [
            { name: "Audio Converter", link: "/audio-convert", icon: FileMusic },
        ]
    };

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="navbar_div">
            <div className="flex gap-10 items-center border-b navbar">
                <Link href="/">
                    <p className="logo tracking-tight font-medium">Convert<span className="font-light">&</span>Compress<span className="tracking-tight font-medium"></span></p>
                </Link>
                <div onClick={toggleMenu} className="text-sm cursor-pointer relative" ref={dropdown}>
                    Tools <ChevronDown size={16} className="inline-block" />
                    {isOpen && (
                        <div className="dropdown_menu absolute top-10 bg-white shadow-md p-4 rounded-lg grid grid-cols-3">
                            {Object.keys(toolCategories).map((category, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-medium tracking-tight">{category}</p>
                                    <div className="flex flex-col gap-1 pt-2">
                                        {toolCategories[category].map((tool, index) => (
                                            <div key={index} className="tracking-tight text-sm">
                                                <Link href={tool.link} className="flex items-center gap-1">
                                                    {tool.icon && <tool.icon size={16} />}{tool.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}