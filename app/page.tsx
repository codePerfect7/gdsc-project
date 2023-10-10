import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'

const page = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: {session}, error } = await supabase.auth.getSession()
  let user;
  if (session) user = session.user.email || null
  return (
    <div className="mt-10 text-foreground">{user ? user : "Not logged in"}</div>
  )
}

export default page