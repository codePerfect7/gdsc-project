"use client"

import { PostgrestError, Session } from "@supabase/supabase-js"
import { useEffect, useRef, useState } from "react"
import Avatar from "./Avatar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast from "react-hot-toast"

const AccountSettings = ({ session, userProfile}: {session: Session, userProfile: Profile}) => {
  const [user, setUser] = useState<Profile>(userProfile)
  const username = useRef<HTMLInputElement>(null)
  const content = useRef<HTMLInputElement>(null)
  const supabase = createClientComponentClient<Database>()
  const handle = async (url: string | null = null) => {
    if (url) {const { error } = await supabase.from('profiles').update({avatar_url: url}).eq('id', user.id);if(error) toast.error(error.message); else toast.success("Updated")}
    else {const { error } = await supabase.from('profiles').update({username: username.current?.value}).eq('id', user.id);if(error) toast.error(error.message); else toast.success("Updated")}
  }
  useEffect(() => {
    const channel = supabase.channel('').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'posts' }, payload => {
      setUser(payload.new as Profile)
    }).subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setUser, user])
  return (
    <div className="col-span-3 border w-full mt-8 ">
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
          <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
            <Avatar
            uid={user.id}
            url={user.avatar_url}
            size={150}
            onUpload={(url) => {handle(url)}} />
          </div>
        </div>
        <div className="block md:flex my-8">
          <div className="w-full p-4 flex justify-center items-center ">
            <input type="submit" value="Submit" className="mx-auto py-4 px-10 text-xl font-semibold bg-slate-600/50 hover:bg-slate-700 transition-all duration-200 ease cursor-pointer rounded-3xl  " onClick={() => handle()} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountSettings