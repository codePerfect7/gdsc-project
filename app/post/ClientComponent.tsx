"use client"
import delay from "@/components/delay"
import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

import type { ChangeEvent, FormEvent, MouseEvent } from "react"

const ClientComponent = ({ session }: { session: Session | null }) => {

    const [file, setFile] = useState<File | null>(null)
    const [base, setBase] = useState<string | null>(null)
    const title = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLTextAreaElement>(null)
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setFile(e.target.files[0])
    }

    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = ""
    }

    const toBase64 = async (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => resolve(fileReader.result)
            fileReader.onerror = (error) => reject(error)
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (title.current?.value && content.current?.value) {
            if (!file) {
                const { data: posts, error } = await supabase.from("posts").insert([{
                    title: title.current.value,
                    content: content.current.value,
                }]).select().single()
                if (error) {toast.error(error.message);return}
                else { toast.success(`Posted ${posts.title}`);await delay(2500);router.push('/posts') }
            } else {
                const base64 = await toBase64(file as File)
                setBase(base64 as string)
                const { data: posts, error } = await supabase.from('posts').insert([{
                    title: title.current.value,
                    content: content.current.value,
                    blog_image: base64 as string
                }]).select().single()
                if (error) {toast.error(error.message);return}
                else { toast.success(`Posted ${posts.title}`);await delay(2500);router.push('/posts') }
            }
        }
    }

    return (
        <div className="text-foreground mt-4 animate-in w-1/2">
            <form className="mt-4 p-4 border" onSubmit={handleSubmit}>
                <div className="block md:flex my-8">
                    <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
                        <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" ref={title} required />
                        <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                        <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="">Title</label>
                    </div>
                </div>
                <div className="block md:flex my-8">
                    <div className="w-full h-48 my-10 mx-0 md:mx-5 md:my-0 relative">
                        <textarea className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none resize-none" ref={content} required />
                        <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                        <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-44 peer-focus:text-sm peer-valid:-translate-y-44 peer-valid:text-sm" htmlFor="">Content</label>
                    </div>
                </div>
                <div className="block md:flex my-8">
                    <div className="w-full h-48 my-10 mx-0 md:mx-5 md:my-0 relative">
                        <input type="file" className="" accept="image/*" name="avatar" onChange={onFileChange} onClick={handleClick} />
                    </div>
                </div>
                <div className="block md:flex my-8">
                    <div className="w-full p-4 flex justify-center items-center ">
                        <input type="submit" value="Submit" className="mx-auto py-4 px-10 text-xl font-semibold bg-slate-600/50 hover:bg-slate-700 transition-all duration-200 ease cursor-pointer rounded-3xl  " />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ClientComponent