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
                if (error) { toast.error(error.message); return }
                else { toast.success(`Posted ${posts.title}`); await delay(2500); router.push('/posts') }
            } else {
                const base64 = await toBase64(file as File)
                setBase(base64 as string)
                const { data: posts, error } = await supabase.from('posts').insert([{
                    title: title.current.value,
                    content: content.current.value,
                    blog_image: base64 as string
                }]).select().single()
                if (error) { toast.error(error.message); return }
                else { toast.success(`Posted ${posts.title}`); await delay(2500); router.push('/posts') }
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
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {file == null ? <><svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Prefer using 16x9 Images)</p></> : <span className="text-base md:text-2xl font-bold ">Selected File: {file.name}</span>}
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={onFileChange} onClick={handleClick} />
                        </label>
                    </div>
                </div>
                {/* <div className="block md:flex my-8">
                    <div className="w-full min-h-[4rem] my-10 mx-0 md:mx-5 md:my-0 relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                        <input type="file" className=" block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" accept="image/*" name="avatar" id="file_input" onChange={onFileChange} onClick={handleClick} />
                    </div>
                </div> */}
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