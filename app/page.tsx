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
      <Carousel posts={data} />
  )
}

export default page