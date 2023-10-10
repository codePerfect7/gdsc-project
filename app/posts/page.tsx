import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import DisplayPosts from "./DisplayPosts";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', {ascending: false})
  const { data: {session} } = await supabase.auth.getSession()
  if (!session) redirect('/login?error=Please Login First to view posts')
  if (error) {
    return <DisplayPosts error={error.message} post={null} session={session} userid={session.user.id} />
  }
  if (posts.length == 0) return <span className="text-foreground mt-5 text-2xl ">No posts found</span>
  return (
    <div className="w-full p-8 mt-2 flex flex-col justify-center items-center">
        {posts.map((post: { id: number, title: string, description: string }) => {
          return <DisplayPosts post={post} error={null} session={session} userid={session.user.id} />
        })}
    </div>
  )
}
