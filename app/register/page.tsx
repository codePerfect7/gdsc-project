import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import Form from "./Form"

export const dynamic = 'force-dynamic'

const page = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {data: {session}} = await supabase.auth.getSession()

    return (
        <Form session={session} />
    )
}

export default page