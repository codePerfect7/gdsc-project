"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast from "react-hot-toast"
import SignOutComponent from "./SignOutComponent"
import Image from "next/image"
import { SwitchCamera } from "lucide-react"

import type { Session } from "@supabase/supabase-js"
import delay from "@/components/delay"

const AccountSettings = ({ session, userProfile }: { session: Session, userProfile: Profile }) => {
  const [user, setUser] = useState<Profile>(userProfile)
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatar_url)
  const [path, setPath] = useState<string>("")
  const username = useRef<HTMLInputElement>(null)
  const supabase = createClientComponentClient<Database>()
  const handle = async (url: string | null = null) => {
    if (url) { const { error } = await supabase.from('profiles').update({ avatar_url: url }).eq('id', user.id); if (error) toast.error(error.message); else toast.success("Updated") }
    else { const { error } = await supabase.from('profiles').update({ username: username.current?.value }).eq('id', user.id); if (error) toast.error(error.message); else toast.success("Updated") }
  }

  useEffect(() => {
    setAvatarUrl(user.avatar_url)
    const getPath = async (path: string) => {
      const { data, error } = await supabase.storage.from("avatars").download(path)
      if (error) { toast.error(error.message); return }
      const url = URL.createObjectURL(data)
      setPath(url)
    }
    getPath(avatarUrl)
  }, [avatarUrl, user, path])

  useEffect(() => {
    const channel = supabase.channel('').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, payload => {
      setUser(payload.new as Profile)
    }).subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setUser, user])

  const toBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => { resolve(fileReader.result) }
      fileReader.onerror = (error) => { reject(error) }
    })
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    let fil = e.target.files[0]
    if (!fil) return
    const toastid = toast.loading("Loading image")
    // Old

    // const base64 = await toBase64(fil as File)
    // console.log(base64 as string)
    // const { error } = await supabase.from('profiles').update({ avatar_url: (base64 as string) }).eq('username', user.username ?? "")
    // if (error) toast.error(error.message)
    // else toast.success("Updated")

    // New 
    fil = fil as File
    const fileExt = fil.name.split('.').pop()
    const filePath = `${user.id}-${Math.random()}.${fileExt}`
    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, fil)
    if (uploadError) {toast.error(uploadError.message);return}
    const { data, error } = await supabase.storage.from("avatars").download(filePath)
    if (error) {toast.error(error.message);return}
    const url = URL.createObjectURL(data)
    let { error: err } = await supabase.from('profiles').update({ avatar_url: filePath }).eq('id', user.id)
    if (err) {toast.error(err.message);return}

    toast.dismiss(toastid)
    toast.success("Done")
    e.target.value = ""
  }

  return (
    <>
      <div className="col-span-1 lg:h-[75vh] lg:sticky lg:top-[21vh] w-full">
        <div className="w-full h-full ">
          <div className="w-full  aspect-square max-h-[200px] relative">
            {user.avatar_url ? <Image src={path} alt="Avatar" width={150} height={150} className="rounded-full absolute -z-10 top-0 left-1/2 -translate-x-1/2 translate-y-[25%] outline outline-4 outline-slate-200" /> :
              <div className="text-background absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl bg-slate-300 rounded-full py-2  text-center  ">No image (error)</div>}
            <input className=" opacity-0 absolute z-50 top-full left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-3/4 w-[48px] aspect-square cursor-pointer  peer " type="file" name="avatar" accept="image/*" onChange={onFileChange} />
            <div className=" p-3  bg-slate-700 rounded-full  absolute z-10 top-full left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-3/4 hover:bg-slate-600 peer-hover:bg-slate-600 transition-all duration-150 ease cursor-pointer text-3xl text-center select-none"><SwitchCamera /></div>
          </div>
          <div className=" p-4 mt-2 ">
            <h1 className="mt-1 text-md xl:text-xl font-bold relative border-4 p-2 ">
              <div className="absolute text-sm -top-3 left-0 bg-white text-background rounded-3xl px-1 ">Username</div>
              <span className="block truncate">{user.username}</span>
            </h1>
            <h1 className="mt-3 text-md xl:text-xl font-bold relative border-4 p-2 ">
              <div className="absolute text-sm -top-3 left-0 bg-white text-background rounded-3xl px-1 ">Email</div>
              <span className="block truncate">{user.email}</span>
            </h1>
            <div className="flex justify-center">
              <SignOutComponent session={session} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 w-full mt-8 ">
        <h1 className="text-2xl font-bold ">Update Details: </h1>
        <form className="mt-4 p-4 border" onSubmit={e => e.preventDefault()}>
          <div className="block md:flex my-8">
            <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
              <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" ref={username} required />
              <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
              <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="">Enter new Username</label>
            </div>
          </div>
          <div className="block md:flex my-8">
            <div className="w-full p-4 flex justify-center items-center ">
              <input type="submit" value="Submit" className="mx-auto py-4 px-10 text-xl font-semibold bg-slate-600/50 hover:bg-slate-700 transition-all duration-200 ease cursor-pointer rounded-3xl  " onClick={() => handle()} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AccountSettings