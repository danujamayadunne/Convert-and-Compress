import Footer from "@/components/footer"
import Navbar from "../../../components/navbar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react"

export default function Contact() {
    return (
        <main>
            <Navbar />
            <div className="bg-white font-sans contact" style={{ paddingTop: "90px", paddingBottom: "90px", paddingLeft: "90px", paddingRight: "90px" }}>
                <p className="text-2xl tracking-tight font-medium">Contact Us</p>
                <div className="flex flex-col" style={{ gap: "9px", paddingTop: "9px" }}>
                    <div className="flex justify-between items-center" style={{ gap: "9px" }}>
                        <Input type="text" placeholder="Name" className="border border-gray-300 rounded-sm w-full" />
                        <Input type="email" placeholder="Email" className="border border-gray-300 rounded-sm w-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="rounded-sm">
                            <SelectValue placeholder="Select Inquiry" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm">
                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            <SelectItem value="Feedback">Feedback</SelectItem>
                            <SelectItem value="Support">Support</SelectItem>
                            <SelectItem value="Advertising">Advertising</SelectItem>
                        </SelectContent>
                    </Select>
                    <Textarea type="text" placeholder="Message" className="border border-gray-300 rounded-sm w-full" />
                    <Button><Send />Submit</Button>
                </div>
            </div>
            <Footer />
        </main>
    )
}