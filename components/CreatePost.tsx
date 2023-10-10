import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

const CreatePost = async ({ title, description }: { title: string | null, description: string | null }) => {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase.from('posts').insert([{
        title: title,
        description: description,
    }]).select()
    if (error) return {
        error: true,
        message: error.message
    }
    else return {
        error: false,
        message: "Success"
    }
}

export default CreatePost