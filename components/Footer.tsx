import { Github, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="w-full text-center text-foreground bg-slate-950 p-2  ">
            <div className="text-2xl font-bold  ">Made with ❤️ by <span className="underline decoration-4 underline-offset-4">Ayush Thakur</span></div>
            <div className="w-full flex justify-center items-center gap-4 my-2 ">
                <Link href="https://youtube.com/@codePerfect" target="_blank" className="hover:scale-125 transition-all duration-150 ease-out" ><Youtube size={50} /></Link>
                <Link href="https://github.com/codePerfect7" target="_blank" className="hover:scale-125 transition-all duration-150 ease-out" ><Github size={50} /></Link>
                <Link href="https://linkedin.com/in/ayshthkr" target="_blank" className="hover:scale-125 transition-all duration-150 ease-out" ><Linkedin size={50} /></Link>

            </div>
        </div>
    )
}

export default Footer