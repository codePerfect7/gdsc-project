import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import ClientComponent from "./ClientComponent"
import { redirect, useRouter } from "next/navigation"

const page = async () => {
    const supabase = createServerComponentClient({ cookies })
    const {data: {session}} = await supabase.auth.getSession()

    if (!session) redirect('/error?error=Please Login First to create a post')

    return <ClientComponent session={session} />
}

export default page