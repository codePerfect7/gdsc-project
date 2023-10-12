import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import ProfileSection from "./ProfileSection"
import AccountSettings from "./AccountSettings"

export const dynamic = 'force-dynamic'

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session }, error } = await supabase.auth.getSession()
  if (!session) redirect('/login?error=Login to access this page')
  const { data, error: err } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
  if (err || (data.avatar_url == null)) redirect(`/error?error=${err?.message}`)
  return (
    <div className="w-full lg:grid grid-flow-col grid-cols-4 text-foreground mt-5 gap-8 p-5  ">
      <ProfileSection user={data} session={session} />
      <AccountSettings userProfile={data} session={session} />
    </div>
  )
}

export default page