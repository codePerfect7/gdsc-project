import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import ClientComponent from "./ClientComponent"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Post - TCH Hub"
}

const page = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {data: {session}} = await supabase.auth.getSession()

    if (!session) redirect('/login?error=Please Login First to create a post')

    return <ClientComponent session={session} />
}

export default page
