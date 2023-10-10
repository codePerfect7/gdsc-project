import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import Form from "./Form"

const page = async () => {
    const supabase = createServerComponentClient({ cookies })
    const {data: {session}} = await supabase.auth.getSession()

    return (
        <Form session={session} />
    )
}

export default page