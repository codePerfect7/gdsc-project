import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import DisplayPosts from "./DisplayPosts";
import { redirect } from "next/navigation";
import ImageComponent from "./Image";

export const dynamic = 'force-dynamic';

export default async function Index({params}: {params: {slug: string}}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: posts, error } = await supabase.from('posts').select('*').eq('id', params.slug)
  const { data: {session} } = await supabase.auth.getSession()
  if (!session) redirect('/login?error=Please Login First to view posts')
  if (error) return redirect(`/error?error=${error.message}`)
  if (posts.length == 0) return <span className="text-foreground mt-5 text-2xl ">No posts found</span>
  return (
    <div className="w-full p-8 mt-2 flex flex-col justify-center items-center">
      {posts[0].blog_image != null && <ImageComponent url={posts[0].blog_image} />}
      <DisplayPosts postToView={posts[0]} session={session} userid={session.user.id} />
    </div>
  )
}