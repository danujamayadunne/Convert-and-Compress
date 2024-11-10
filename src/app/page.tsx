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
      "100% Free",
      " "
    ],
    link: "/image-compress"
  }, {
    title: "Image Converter",
    description: "Convert Images to Modern Formats",
    features: [
      "Unlimited Converts",
      "All Modern Convert Formats",
      "Quality Control",
      "100% Free",
    ],
    link: "/image-convert"
  }, {
    title: "Audio Converter",
    description: "Convert Audio to Modern Formats",
    features: [
      "Unlimited Converts",
      "All Modern Convert Formats",
      "Quality Control",
      "100% Free",
    ],
    link: "/audio-convert"
  }, {
    title: "Video Converter",
    description: "Convert Video to Modern Formats",
    features: [
      "Unlimited Converts",
      "All Modern Convert Formats",
      "Quality Control",
      "100% Free",
    ],
    link: "/video-convert"
  }, {
    title: "PDF Compressor",
    description: "Compress PDF for Better Size",
    features: [
      "Unlimited Compressions",
      "4 Compression Options",
      "100% Free",
    ],
    link: "/pdf-compress"
  }]

  return (
    <main>
      <Navbar />

      <div className="header">
        <div className="text-2xl font-medium tracking-tighter text-center lg:text-4xl">
          <div> Free <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... text-transparent bg-clip-text">online file converter</span> & <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... text-transparent bg-clip-text">compressor</span>.</div>
        </div>
      </div>

      <div className="text-slate-500 pt-2 text-center lg:flex lg:justify-center">
        <p className="flex items-center gap-1"> Effortlessly convert and compress your files online in few clicks.</p>
      </div>

      <div className="home_grid pt-16 pb-5">
        {data.map((item, index) => (
          <Card className="home_card" key={index}>
            <CardHeader>
              <CardTitle className="text-center text-xl font-medium">{item.title}</CardTitle>
              <CardDescription className="text-center">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm tracking-tight flex flex-col gap-2">
                {item.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href={item.link}>
                <Button>Go</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="home_grid_second pt-16 pb-5">
        <p className="font-medium tracking-tight text-lg">Your Privacy. Our Commitment.</p>
        <p className="tracking-tight text-sm pt-2">At ConvertAndCompress, we believe in keeping your data exactly where it belongs—on your device. With every interaction happening directly in your browser, we ensure your files never leave your control. No uploads to our servers. Our commitment to privacy and security is built into every feature, so you can focus on what matters most—without worrying about your data. Simple, secure, and private. Just the way it should be.</p>
      </div>

      <Footer/>

    </main>
  );
}
