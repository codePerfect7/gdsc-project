"use client"

import delay from "@/components/delay"
import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import { useRef } from "react"
import toast from "react-hot-toast"

const Form = ({ session }: { session: Session | null }) => {

    const full_name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const username = useRef<HTMLInputElement>(null)
    const supabase = createClientComponentClient<Database>()

    const handle = async () => {

        const { data, error } = await supabase.from('profiles').insert([{
            full_name: full_name.current?.value,
            email: email.current?.value,
            username: username.current?.value,
            avatar_url: process.env.DEFAULT_AVATAR_URL
        }])

        if (error) toast.error(error.message)
        else {
            toast.success("Profile created successfully")
            await delay(2000)
            
        }
    }

    return (
        <div className="text-foreground mt-4 animate-in w-1/2">
            <form className="mt-4 p-4 border" onSubmit={e => e.preventDefault()}>
                <div className="block md:flex my-8">
                    <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
                        <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" ref={full_name} required />
                        <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                        <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="fullName">Full Name</label>
                    </div>
                </div>
                <div className="block md:flex my-8">
                    <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
                        <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" ref={email} required />
                        <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                        <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="block md:flex my-8">
                    <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
                        <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" ref={username} required />
                        <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                        <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="block md:flex my-8">
                    <div className="w-full p-4 flex justify-center items-center ">
                        <input type="submit" value="Register" className="mx-auto py-4 px-10 text-xl font-semibold bg-slate-600/50 hover:bg-slate-700 transition-all duration-200 ease cursor-pointer rounded-3xl  " onClick={handle} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form