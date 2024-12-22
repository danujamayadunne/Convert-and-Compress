import React from 'react';
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Link from 'next/link';

export default function BlogPost() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-3xl mx-auto px-6 py-12 font-sans" style={{ paddingTop: "150px" }}>
                <article className="prose lg:prose-xl">
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            How to Improve Website Speed with Optimized Image and Video Files
                        </h1>
                        <div className="flex items-center space-x-4 text-gray-600 mb-8">
                            <time className="text-sm">November 11, 2024</time>
                            <span className="text-sm">·</span>
                            <span className="text-sm">8 min read</span>
                        </div>
                        <img src="/OG.jpg" className=" bg-gray-100 rounded-lg mb-8" />
                    </header>

                    <div className="text-gray-700 leading-relaxed">
                        <p className="mb-6">
                            Optimizing your website&apos;s images and videos is one of the fastest ways to improve load times and user experience. In this guide, we&apos;ll explore easy techniques and tools you can use to ensure your media files don&apos;t slow down your site.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Why Optimized Images and Videos Matter
                        </h2>

                        <p className="mb-6">
                            Images and videos are often the largest files on a webpage, contributing to slower speeds if not optimized. Faster websites rank higher in search results, so implementing these optimizations can improve SEO while boosting user engagement.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Choose the Right Image Format
                        </h2>

                        <p className="mb-6">
                            Common image formats include <strong>JPEG</strong>, <strong>PNG</strong>, and <strong>WebP</strong>:
                        </p>

                        <ul className="mb-6">
                            <li><strong>WebP</strong> - Best for modern web usage with top-tier compression. <Link href="/image-converter" target="_blank"><span className="text-blue-500">Convert your images to WebP here</span></Link> for faster loading without sacrificing quality.</li>
                            <li><strong>JPEG</strong> - Ideal for photos and large images with lossy compression. Use our <Link href="/image-compressor" target="_blank"><span className="text-blue-500">JPEG Compressor</span></Link> to reduce file size.</li>
                            <li><strong>PNG</strong> - Perfect for graphics with transparency. Optimize PNGs with our <Link href="/image-compressor" target="_blank"><span className="text-blue-500">PNG Compression Tool</span></Link> for faster load times.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Optimize Video Files
                        </h2>

                        <p className="mb-6">
                            For videos, use formats like <strong>MP4</strong> and <strong>WebM</strong> to keep file sizes low without losing quality:
                        </p>

                        <ul className="mb-6">
                            <li><strong>MP4</strong> - Universal format for high-quality videos. Compress your MP4 files to enhance performance.</li>
                            <li><strong>WebM</strong> - Optimized for the web with advanced compression. <Link href="/video-converter" target="_blank"><span className="text-blue-500">Convert videos to WebM here</span></Link> for seamless playback.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Essential Optimization Techniques
                        </h2>

                        <p className="mb-6">
                            Here are some practical guide to further optimize your media:
                        </p>

                        <ul className="mb-6">
                            <li><strong>Resize Images</strong> - Use appropriately sized images instead of full-size versions.</li>
                            <li><strong>Lazy Loading</strong> - Load media files only when they are about to appear on the screen.</li>
                            <li><strong>Compression</strong> - Compress files without compromising quality. Use tools like our <Link href="/image-compressor" target="_blank"><span className="text-blue-500">Image Compressor</span></Link> and <Link href="/pdf-compressor" target="_blank"><span className="text-blue-500">PDF Compressor</span></Link> for easy, fast results.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Boosting Website Speed with Media Optimization
                        </h2>

                        <p className="mb-6">
                            Optimizing images and videos is essential for better load times and SEO. Choose the best format, compress files, and implement lazy loading to achieve a faster, more user-friendly website. Start optimizing today with our <Link href="/image-compressor" target="_blank"><span className="text-blue-500">Image Compressor</span></Link> and <Link href="/video-converter" target="_blank"><span className="text-blue-500">Video Converter</span></Link> tools.
                        </p>
                    </div>
                </article>

                <div className="mt-16 pt-8 border-t">
                    <div className="flex items-center space-x-4">
                        <img src="/favicon.ico" className="h-12 w-12 rounded-full bg-gray-200" />
                        <div>
                            <h3 className="font-medium text-gray-900">Convert & Compress</h3>
                            <p className="text-gray-600 text-sm">Team</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
