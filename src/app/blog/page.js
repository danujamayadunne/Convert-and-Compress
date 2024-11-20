import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer"

export default function BlogPage() {

    const posts = [
        {
            slug: 'how-to-convert-images-pdfs-audio-and-videos-for-free',
            title: 'How to Convert Images, PDFs, Audio, and Videos for Free: The Ultimate Guide',
            description: "Learn how to convert files for free with this ultimate guide.",
            src: "/"
        },
        {
            slug: 'top-5-reasons-to-compress-your-images-pdfs-and-videos-before-sharing',
            title: 'Top 5 Reasons to Compress Your Images, PDFs, and Videos Before Sharing',
            description: 'Discover the top 5 reasons why you should compress your files before sharing them online.',
            src: "/"
        },
        {
            slug: 'the-best-file-formats-for-web-choosing-the-right-format-for-images-pdfs-and-videos',
            title: 'The Best File Formats for Web: Choosing the Right Format for Images, PDFs, and Videos',
            description: 'Find out the best file formats for web usage and how to choose the right format for your files.',
            src: "/"
        },
        {
            slug: 'jpeg-vs-png-vs-gif-how-to-choose-and-convert-image-formats-easily',
            title: 'JPEG vs. PNG vs. GIF: How to Choose and Convert Image Formats Easily',
            description: 'Learn the differences between JPEG, PNG, and GIF and how to choose the right format for your images.',
            src: "/"
        },
        {
            slug: 'how-to-improve-website-speed-with-optimized-image-and-video-files',
            title: 'How to Improve Website Speed with Optimized Image and Video Files',
            description: 'Optimizing your website images and videos is one of the fastest ways to improve load times and user experience.',
            src: "/"
        },
        {
            slug: '10-common-file-compression-mistakes-and-how-to-avoid-them',
            title: '10 Common File Compression Mistakes and How to Avoid Them',
            description: 'Avoid these common file compression mistakes to ensure your files are compressed correctly and efficiently.',
            src: "/"
        },
        {
            slug: 'how-to-boost-seo-by-compressing-images-without-losing-quality',
            title: 'How to Boost SEO by Compressing Images Without Losing Quality',
            description: 'Learn how to compress images without losing quality to boost your website SEO and improve user experience.',
            src: "/"
        },
        {
            slug: 'reduce-pdf-file-size-easily-your-go-to-tool',
            title: 'Reduce PDF File Size Easily: Your Go-To Tool',
            description: 'Learn how to reduce PDF file size easily with this go-to tool for compressing PDFs.',
            src: "/"
        },
    ]
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: "150px", paddingLeft: "90px", paddingRight: "90px" }}>
                <p className="text-2xl font-medium">Blog Posts</p>
                <div className="grid grid-cols-4 pt-6" style={{ gap: "19px" }}>
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className="bg-white rounded-lg overflow-hidden shadow-md"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <img
                                    src={post.src}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <p className="text-xl font-medium tracking-tight text-gray-800 mb-2">{post.title}</p>
                                    <p className="text-gray-600 mb-4 text-sm">{post.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}