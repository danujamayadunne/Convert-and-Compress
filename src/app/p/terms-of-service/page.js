import Link from "next/link"
import Navbar from "../../../components/navbar"

export default function TermsOfService() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: "150px", paddingLeft: "90px", paddingRight: "90px", paddingBottom: "90px" }}>
                <p className="text-2xl tracking-tight font-medium">Terms of Service</p>
                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    Welcome to ConvertandCompress. By using our file conversion and compression services, you agree to the following terms and conditions. Please read them carefully to ensure that you understand your rights and obligations.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">1. Acceptance of Terms</span><br />
                    By accessing and using ConvertandCompress, you accept and agree to be bound by these terms. If you do not agree, please refrain from using our services.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">2. Service Usage</span><br />
                    ConvertandCompress provides free online tools for file conversion and compression. You agree to use these services solely for lawful purposes and to follow all applicable laws and regulations.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">3. Privacy and Data Handling</span><br />
                    We are committed to protecting your privacy. Files you upload are processed and deleted automatically after use, as outlined in our Privacy Policy. By using our service, you acknowledge and consent to this handling of your data.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">4. Intellectual Property</span><br />
                    All content and materials on ConvertandCompress, including text, graphics, and software, are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of our service without prior permission.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">5. Limitation of Liability</span><br />
                    ConvertandCompress is provided &quot;as is&quat; without any warranties. We do not guarantee the accuracy, reliability, or suitability of the service for your purposes. We are not liable for any damages resulting from the use or inability to use the service.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">6. Changes to Terms</span><br />
                    We reserve the right to update these Terms of Service at any time. Changes will be posted on this page, and continued use of the service constitutes acceptance of the revised terms.
                </p>

                <p className="tracking-tight" style={{ marginTop: "19px" }}>
                    <span className="font-medium">Contact Us</span><br />
                    If you have any questions regarding these terms, please <Link href="/p/contact">Contact Us</Link>.
                </p>
            </div>
        </main>
    )
}