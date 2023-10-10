"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { type Session } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import remove from '@/components/removeElement'

const Page = ({ post, error, session, userid }: { post: any, error: string | null, session: Session, userid: string }) => {

  const paraRef = useRef<HTMLParagraphElement>(null)
  const [likes, setLikes] = useState<number>(post.likes)
  const [dislikes, setDislikes] = useState<number>(post.dislikes)
  const handleclick = () => {
    paraRef.current?.classList.toggle('h-[25vh]')
    paraRef.current?.classList.toggle('h-[40vh]')
  }
  const supabase = createClientComponentClient()
  let dat = new Date(post.created_at)
  let d = dat.toLocaleDateString('en-IN') + ' ' + dat.toLocaleTimeString('en-IN')

  const likePost = async () => {
    if (post.liked_by.includes(userid)) {
      remove(post.liked_by, userid)
      const { error } = await supabase.from('posts').update({ likes: post.likes - 1, liked_by: post.liked_by }).eq('id', post.id)
      setLikes(likes => likes - 1)
      if (error) toast.error(error.message)
      return
    }
    let likedarray = [...post.liked_by, userid]
    const { error } = await supabase.from('posts').update({ likes: post.likes + 1, liked_by: likedarray }).eq('id', post.id)
    if (error) toast.error(error.message)
    else { setLikes(likes => likes + 1); toast.success("Liked") }
  }
  const dislikePost = async () => {
    const { error } = await supabase.from('posts').update({ dislikes: post.dislikes + 1 }).eq('id', post.id)
    if (error) toast.error(error.message)
    else { setDislikes(dislikes => dislikes + 1); toast.success("Disliked") }
  }

  if (error) {
    toast.error(error)
    toast.error("Please try again later")
  }

  return (
    <div className="w-full bg-slate-600/50 mt-8 rounded-2xl animate-in pt-4 ">
      <Link id={post.id} href={`/posts/${post.id}`} ><div className=" text-foreground text-md md:text-2xl font-bold px-4 py-2 w-full text-start   ">{post.title} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, distinctio? </div></Link>
      <p className="text-foreground px-4 py-1 w-full ">
        <span>{d}</span>
      </p>
      <div className="px-4 py-2 ">
        <span className="py-2 px-4 md:px-10 mt-2 mr-1 md:mr-4 bg-slate-400 border-2 border-slate-200 rounded-full text-md md:text-xl font-semibold cursor-pointer" onClick={likePost}><ThumbsUp size={22} className="inline  mr-2 text-slate-50" fill={"white"} color="black" />{likes}</span>
        <span className="py-2 px-4 md:px-10 mt-2 mr-1 md:mr-4 bg-slate-400 border-2 border-slate-200 rounded-full text-md md:text-xl font-semibold cursor-pointer" onClick={dislikePost}><ThumbsDown size={22} className="inline  mr-2 text-slate-50" fill={"white"} color="black" />{dislikes}</span>
      </div>
      <p ref={paraRef} className="text-foreground text-md h-[25vh] overflow-hidden px-4 py-2 transition-all duration-200 ease ">{post.content}</p>
      <button className="text-foreground font-extrabold w-full text-center bg-slate-600/80 hover:bg-slate-600/90 transition ease duration-200 rounded-b-xl " onClick={handleclick}>...</button>
    </div>
  )
}

export default Page
