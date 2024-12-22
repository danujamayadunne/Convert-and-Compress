import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-9">
                    <div className="space-y-4">
                        <p className="text-sm font-normal text-black">Image Tools</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/image-compressor" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Image Compressor
                            </Link>
                            <Link href="/image-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Image Converter
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-normal text-black">Video Tools</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/video-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                MOV to MP4
                            </Link>
                            <Link href="/video-to-audio" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                MP4 to MP3
                            </Link>
                            <Link href="/video-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Video Converter
                            </Link>
                            <Link href="/video-to-audio" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Video to Audio
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-normal text-black">Audio Tools</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/audio-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Audio Converter
                            </Link>
                            <Link href="/video-to-audio" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Video to Audio
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-normal text-black">Document Tools</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/pdf-compressor" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                PDF Compressor
                            </Link>
                            <Link href="/pdf-to-jpg" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                PDF to JPG
                            </Link>
                            <Link href="/pdf-to-word" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                PDF to Word
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-normal text-black">Unit Tools</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/unit-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Length Converter
                            </Link>
                            <Link href="/unit-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Weight Converter
                            </Link>
                            <Link href="/unit-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Temperature Converter
                            </Link>
                            <Link href="/unit-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Time Converter
                            </Link>
                            <Link href="/unit-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Data Converter
                            </Link>
                            <Link href="/unit-converter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                Unit Converter
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-16 flex flex-wrap gap-6 justify-center">
                    <Link href="/p/about-us" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        About Us
                    </Link>
                    <Link href="/p/faq" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        FAQ
                    </Link>
                    <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Blog
                    </Link>
                    <Link href="/p/privacy-policy" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/p/terms-of-service" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Terms of Service
                    </Link>
                    <Link href="/p/contact" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Contact
                    </Link>
                </div>

                {/* <div className="mt-9 flex flex-wrap gap-6 justify-center">
                    <img
                        src="https://app.greenweb.org/api/v3/greencheckimage/convertandcompress.com?nocache=true"
                        alt="This website runs on green hosting - verified by thegreenwebfoundation.org"
                        width="100"
                        height="63"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                </div> */}

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-400">
                        ©2024 ConvertandCompress.com. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}