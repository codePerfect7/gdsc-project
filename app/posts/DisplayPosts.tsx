import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Session } from "@supabase/supabase-js"
import Image from "next/image"
import { cookies } from "next/headers"
import Link from "next/link"
import { ThumbsDown, ThumbsUp } from "lucide-react"

export const dynamic = 'force-dynamic'

const DisplayPosts = async ({ postToView, session, userid }: { postToView: Post, session: Session, userid: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies })
  let { data, error } = await supabase.from('profiles').select('username').eq('id', postToView.author).single()
  if (error) throw new Error(error.message)
  let username = data?.username
  return (
    <Link href={`/posts/${postToView.id}`} key={postToView.id} className={`bg-slate-700 grid ${postToView.blog_image != null ? "col-span-2 md:grid-cols-2 grid-rows-2 gap-4 " : "col-span-2 md:col-span-1"} max-h-[380px] md:max-h-[275px] overflow-hidden p-4 rounded-2xl `}>
      {postToView.blog_image && <Image src={postToView.blog_image} width={200} height={200} alt="Image" className="inline w-full h-auto rounded-2xl " />}
      <div className="w-fit overflow-hidden md:row-span-2 bg-white/20 rounded-2xl p-4 md:p-0 md:bg-transparent">
        <span className="text-base md:text-xl font-extrabold hover:underline underline-offset-2 decoration-2  hover:duration-150">{postToView.title}</span>
        <div className="font-semibold "><span className="underline underline-offset-2 decoration-2">@{username}</span>
        < ThumbsUp className="inline ml-2 mr-1 " size={20} fill={postToView.liked_by.includes(userid) ? "white" : "#94a3b8"} color={postToView.liked_by.includes(userid) ? "gray" : "#cbd5e1"} />{postToView.likes}
        < ThumbsDown className="inline ml-2 mr-1 " size={20} fill={postToView.disliked_by.includes(userid) ? "white" : "#94a3b8"} color={postToView.disliked_by.includes(userid) ? "gray" : "#cbd5e1"} />{postToView.dislikes}
        </div>
        <div className="text-sm md:text-base h-fit ">{postToView.content}</div>
      </div>
    </Link>
  )
}

export default DisplayPosts