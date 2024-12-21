'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"

export default function Home() {
  const data = [{
    title: "Image Compressor",
    description: "Compress Images for Better Size",
    features: [
      "Unlimited Compressions",
      "Support Modern Image Formats",
      "Quality Control",
    ],
    link: "/image-compressor"
  }, {
    title: "Image Converter",
    description: "Convert Images to Modern Formats",
    features: [
      "Unlimited Converts",
      "Support Modern Image Formats",
      "Quality Control",
    ],
    link: "/image-converter"
  }, {
    title: "Audio Converter",
    description: "Convert Audio to Modern Formats",
    features: [
      "Unlimited Converts",
      "Support Modern Audio Formats",
      "Quality Control",
    ],
    link: "/audio-converter"
  }, {
    title: "Video Converter",
    description: "Convert Video to Modern Formats",
    features: [
      "Unlimited Converts",
      "Support Modern Video Formats",
      "Quality Control",
    ],
    link: "/video-converter"
  }, {
    title: "PDF Compressor",
    description: "Compress PDF for Better Size",
    features: [
      "Unlimited Compressions",
      "4 Compression Options",
    ],
    link: "/pdf-compressor"
  }, {
    title: "PDF to JPG Converter",
    description: "Convert PDF to JPG",
    features: [
      "Unlimited Converts",
      "Multiple Pages Support",
    ],
    link: "/pdf-to-jpg"
  }, //{
  //   title: "Audio Compressor",
  //   description: "Compress Audio for Better Size",
  //   features: [
  //     "Unlimited Compressions",
  //     "Quality Control",
  //   ],
  //   link: "/audio-compressor"
  // },
  {
    title: "Unit Converter",
    description: "Convert Units",
    features: [
      "Unlimited Converts",
      "Support Wide Range of Units",
    ],
    link: "/unit-converter"
  }];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-light text-center tracking-tight">
          Free online <span className="font-normal">file converter</span> & <span className="font-normal">compressor</span>
        </h1>
        <p className="text-gray-500 text-center text-lg" style={{ marginTop: "9px" }}>
          Effortlessly convert and compress your files online in few clicks
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <Card
              key={index}
              className="border-0 hover:shadow-[0_0_1rem_rgba(0,0,0,0.05)] transition-shadow duration-300"
            >
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl font-normal">{item.title}</CardTitle>
                <CardDescription className="text-gray-500">{item.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-gray-300">―</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href={item.link} className="w-full">
                  <Button
                    className="w-full text-white rounded-none font-light"
                  >
                    Convert
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-32">
        <div className="space-y-4">
          <h2 className="text-xl font-normal text-center">
            Your Privacy. Our Commitment.
          </h2>
          <p className="text-gray-500 text-center text-sm leading-relaxed">
            At Convert&Compress, we believe in keeping your data exactly where it belongs—on your device. With every interaction happening directly in your browser, we ensure your files never leave your control. No uploads to our servers. Our commitment to privacy and security is built into every feature, so you can focus on what matters most—without worrying about your data. Simple, secure, and private. Just the way it should be.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}