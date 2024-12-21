import Footer from "@/components/footer"
import Navbar from "../../../components/navbar"

export default function About() {
    return (
        <main>
            <Navbar />
            <div className="bg-white font-sans" style={{ paddingTop: "90px", paddingBottom: "90px", paddingLeft: "90px", paddingRight: "90px" }}>
                <p className="text-2xl tracking-tight font-medium">About Us</p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    Welcome to Convert&Compress, your go-to solution for fast, efficient, and secure file conversion and compression. Founded in 2024, our mission has been to provide a user-friendly, privacy-focused platform that empowers you to convert and compress your files with ease. We believe that everyone should have access to reliable tools without worrying about cost or privacy, so our services are free, simple, and secure.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    At Convert&Compress, we focus on delivering a streamlined experience with a minimalistic and intuitive interface. With modern features designed to handle a variety of file types, we make converting and compressing files as easy as a few clicks, ensuring your documents, images, videos, and more are optimized and ready to use. Your files, your privacy – it&apos;s that simple.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    Thank you for choosing Convert&Compress. We&apos;re committed to continuously improving our services and making Convert&Compress effortless for all.
                </p>
            </div>
            <Footer/>
        </main>
    )
}