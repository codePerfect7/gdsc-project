import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import DisplayPosts from "./DisplayPosts";
import { redirect, usePathname } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', {ascending: false})
  const { data: {session} } = await supabase.auth.getSession()
  if (!session) redirect('/login?error=Please Login First to view posts')
  if (error) {
    return <div className="mt-10 p-4 bg-red-500 text-foreground text-2xl">{error.message}</div>
  }
  if (posts.length == 0) return <span className="text-foreground mt-5 text-2xl ">No posts found</span>
  return (
    <div className="w-full p-8 mt-2 flex flex-col justify-center items-center">
        {posts.map((post) => {
          return <DisplayPosts postToView={post} session={session} userid={session.user.id} />
        })}
    </div>
  )
}
