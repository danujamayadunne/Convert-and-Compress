'use client'
import { LockKeyhole } from "lucide-react"
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

export default function Home() {

  return (
    <main>
      <Navbar />

      <div className="header">
        <div className="text-2xl font-medium tracking-tighter text-center lg:text-4xl">
          <div> Free <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... text-transparent bg-clip-text">online file converter</span>.</div>
        </div>
      </div>

      <div className="text-slate-500 pt-2 text-center lg:flex lg:justify-center">
        <p className="flex items-center gap-1"> Convert your files from one format to another online with ease. </p>
      </div>

      <div className="home_grid pt-16 pb-5">
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Image Compressor</CardTitle>
            <CardDescription className="text-center">Compress Images for Better Size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Unlimited Compressions</p>
              <p className="text-sm tracking-tight">4 Compression Options</p>
              <p className="text-sm tracking-tight">100% Free</p>
              <p className="text-sm tracking-tight" style={{visibility: "hidden"}}>Unlimited Converts</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/image-compress">
              <Button className="w-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Image Converter</CardTitle>
            <CardDescription className="text-center">Convert Images to Modern Formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Unlimited Converts</p>
              <p className="text-sm tracking-tight">All Modern Convert Formats</p>
              <p className="text-sm tracking-tight">Quality Control</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/image-convert">
              <Button className="w-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Audio Converter</CardTitle>
            <CardDescription className="text-center">Convert Audio to Modern Formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Unlimited Converts</p>
              <p className="text-sm tracking-tight">All Modern Convert Formats</p>
              <p className="text-sm tracking-tight">Quality Control</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/audio-convert">
              <Button className="w-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Video Converter</CardTitle>
            <CardDescription className="text-center">Convert Video to Modern Formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Unlimited Converts</p>
              <p className="text-sm tracking-tight">All Modern Convert Formats</p>
              <p className="text-sm tracking-tight">Quality Control</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/video-convert">
              <Button className="w-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">PDF Compressor</CardTitle>
            <CardDescription className="text-center">Compress PDF for Better Size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Unlimited Compressions</p>
              <p className="text-sm tracking-tight">4 Compression Options</p>
              <p className="text-sm tracking-tight">100% Free</p>
              <p className="text-sm tracking-tight" style={{visibility: "hidden"}}>Unlimited Converts</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/image-compress">
              <Button className="w-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

    </main>
  );
}
