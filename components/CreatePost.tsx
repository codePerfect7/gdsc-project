import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

const CreatePost = async ({ title, description }: { title: string, description: string }) => {
    const supabase = createServerComponentClient<Database>({cookies})
    const {data, error} = await supabase.from('posts').insert([{
        title: title,
        content: description,
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