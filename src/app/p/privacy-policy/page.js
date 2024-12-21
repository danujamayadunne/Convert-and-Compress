import Link from "next/link"
import Navbar from "../../../components/navbar"
import Footer from "@/components/footer"

export default function About() {
    return (
        <main>
            <Navbar />
            <div className="bg-white font-sans" style={{ paddingTop: "90px", paddingLeft: "90px", paddingRight: "90px", paddingBottom: "90px" }}>
                <p className="text-2xl tracking-tight font-medium">Privacy Policy</p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    At Convert&Compress, we prioritize the privacy and security of our users&apos; data. This Privacy Policy outlines how we handle, store, and protect the information you provide while using our file conversion and compression services.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">1. Data Collection</span><br />
                    <span className="font-medium">File Data:</span> When you upload files to Convert&Compress, they are processed solely for the purpose of performing the requested conversion or compression. We do not store, analyze, or retain any files beyond the time necessary to complete these tasks.<br />
                    <span className="font-medium">Usage Data:</span> We may collect anonymous usage data (e.g., the number of users and types of conversions requested) to help improve our services. This data does not include any personally identifiable information.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">2. Data Security</span><br />
                    We use secure encryption protocols to protect your files during upload and processing. All files uploaded to our service are automatically deleted shortly after processing to maintain your privacy and ensure security.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">3. Third-Party Services</span><br />
                    Convert&Compress does not share your files or data with third parties. We perform all file processing on secure servers, and we do not use external providers for file handling.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">4. Cookies</span><br />
                    Our website uses cookies to enhance your user experience and remember your preferences. These cookies do not track personal information.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">5. Your Rights</span><br />
                    You have the right to use our services without creating an account or providing any personal information. For additional questions or concerns, you may reach out to us, and we will promptly address them.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">6. Changes to this Policy</span><br />
                    Convert&Compress reserves the right to update this Privacy Policy as needed. Changes will be posted on this page, and continued use of the service constitutes acceptance of the revised policy.
                </p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">Contact Us:</span><br />
                    If you have any questions about this Privacy Policy, please reach out to us via <Link href="/p/contact">Contact Us</Link>.
                </p>
            </div>
            <Footer/>
        </main>
    )
}