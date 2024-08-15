'use client'
import { LockKeyhole, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

export default function Home() {

  const { setTheme } = useTheme()

  return (
    <main>
      <div className="theme">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className="pt-24">
        <div className="text-2xl font-medium tracking-tighter flex flex-col items-center lg:text-4xl">
          <div> Finally, A <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... text-transparent bg-clip-text">web-based</span> platform for </div>
          <div> your everyday <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... text-transparent bg-clip-text"> problems!</span></div>
        </div>
      </div>

      <div className="text-slate-500 pt-2 flex justify-center lg:pt-5">
        <p className="hidden lg:flex gap-1">A<span className='font-medium text-primary flex gap-1 items-center'><LockKeyhole style={{ width: "13px", height: "13px" }} /> privacy-first</span>web plaform. Mean? we <span className='font-medium text-primary'>don&#39;t upload any file to server</span>.</p>
        <p className="text-center mobilesubheading lg:hidden">A<span className='font-medium text-primary'> privacy-first</span> web plaform. Mean? we <span className='font-medium text-primary'>don&#39;t upload any file to server</span>.</p>
      </div>

      <div className="home_grid pt-16 pb-5">
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Image Compress</CardTitle>
            <CardDescription className="text-center">Compress Images for Better Size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Simple UI</p>
              <p className="text-sm tracking-tight">Unlimited Compressions</p>
              <p className="text-sm tracking-tight">4 Compression Options</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/image-compress">
              <Button className="w-full rounded-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Image Convert</CardTitle>
            <CardDescription className="text-center">Convert Images to JPG, JPEG, or PNG</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Simple UI</p>
              <p className="text-sm tracking-tight">Unlimited Converts</p>
              <p className="text-sm tracking-tight">3 Export Formats</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/image-convert">
              <Button className="w-full rounded-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Image to PDF</CardTitle>
            <CardDescription className="text-center">Convert Images to PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Simple UI</p>
              <p className="text-sm tracking-tight">Unlimited Converts</p>
              <p className="text-sm tracking-tight">Multiple Images at Once</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/pdf-convert">
              <Button className="w-full rounded-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Video Compress</CardTitle>
            <CardDescription className="text-center">Compress Video for Better Size.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Simple UI</p>
              <p className="text-sm tracking-tight">Unlimited Compressions</p>
              <p className="text-sm tracking-tight">Compression Preview</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/video-compress">
              <Button className="w-full rounded-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="home_card">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Video to WebM</CardTitle>
            <CardDescription className="text-center">Convert Video to WebM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-tight">Simple UI</p>
              <p className="text-sm tracking-tight">Unlimited Converts</p>
              <p className="text-sm tracking-tight">Converted Preview</p>
              <p className="text-sm tracking-tight">100% Free</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/mp4-to-webm">
              <Button className="w-full rounded-full">Go</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

    </main>
  );
}
