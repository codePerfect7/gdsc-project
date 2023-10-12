"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import delay from "@/components/delay"
import { dislike_post, like_post, remove_dislike, remove_like } from "@/components/postFunctions"

import type { Session } from "@supabase/supabase-js"

const DisplayPosts = ({ postToView, session, userid }: { postToView: Post, session: Session, userid: string }) => {

  // Fixing 
  const [post, setPost] = useState<Post>(postToView)
  const supabase = createClientComponentClient<Database>()
  let dat = new Date(post.created_at)
  let date = dat.toLocaleDateString('en-IN') + ' ' + dat.toLocaleTimeString('en-IN')

  useEffect(() => {
    setPost(postToView)
  }, [postToView])

  useEffect(() => {
    const channel = supabase.channel('').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'posts' }, payload => {
      setPost(payload.new as Post)
    }).subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setPost, post])

  useEffect(() => {
    const updateChange = async () => {
      if (post != null) {
        const { error } = await supabase.from('posts').update(post).eq('id', post.id)
        if (error) console.log(error.message)
      }
    }
    updateChange()
  }, [post])

  const likePost = async () => {
    if (post.liked_by.includes(userid)) await remove_like(supabase, post.id, userid)
    else {
      if (post.disliked_by.includes(userid)) await remove_dislike(supabase, post.id, userid)
      await delay(1000)
      await like_post(supabase, post.id, userid)
    }
  }

  const dislikePost = async () => {
    if (post.disliked_by.includes(userid)) await remove_dislike(supabase, post.id, userid)
    else {
      if (post.liked_by.includes(userid)) await remove_like(supabase, post.id, userid)
      await delay(1000)
      await dislike_post(supabase, post.id, userid)
    }
  }

  return (
    <div className="w-full bg-slate-600/50 mt-8 rounded-2xl animate-in pt-4 ">
      <div className=" text-foreground text-md md:text-2xl font-bold px-4 py-2 w-full text-start   ">{post.title}</div>
      <p className="text-foreground px-4 py-1 w-full ">
        <span>{date}</span>
      </p>
      <div className="px-4 pt-2 mt-2">
        <span className="py-2 px-4 md:px-10 mt-2 mr-1 md:mr-4 bg-slate-400 border-2 border-slate-200 rounded-full text-md md:text-xl font-semibold cursor-pointer" onClick={likePost}><ThumbsUp size={22} className="inline  mr-2 text-slate-50" fill={"white"} color="black" />{post.likes}</span>
        <span className="py-2 px-4 md:px-10 mt-2 mr-1 md:mr-4 bg-slate-400 border-2 border-slate-200 rounded-full text-md md:text-xl font-semibold cursor-pointer" onClick={dislikePost}><ThumbsDown size={22} className="inline  mr-2 text-slate-50" fill={"white"} color="black" />{post.dislikes}</span>
      </div>
      <p className="text-foreground text-md overflow-hidden mt-5 px-4 py-3 transition-all duration-200 ease whitespace-pre-line " >{post.content}</p>
    </div>
  )
}

export default DisplayPosts
