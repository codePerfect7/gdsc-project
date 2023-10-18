import Carousel from "@/components/Carousel"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session }, error } = await supabase.auth.getSession()
  let user;
  if (session) user = session.user.email || null
  const { data, error: err } = await supabase.from("posts").select("*").neq("blog_image", null)
  if (err) redirect(`/error?error=${err.message}`)
  return (
    <>
    <div className="text-foreground text-3xl font-extrabold bg-slate-700/50 p-3 rounded-2xl mt-8 flex-1 -mb-4">Featured Posts</div>
      <Carousel posts={data} />
    </>
  )
}

export default page