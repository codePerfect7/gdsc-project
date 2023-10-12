import { SupabaseClient } from "@supabase/supabase-js"
import toast from "react-hot-toast"

const like_post = async (supabase: SupabaseClient<Database>, id: string, userid: string) => {
    const { data, error } = await supabase.rpc('like_post', { postid: id, userid: userid })
    if (error) toast.error(error.message)
    else toast.success("Liked", {icon: "👍"})
}

const remove_like = async (supabase: SupabaseClient<Database>, id: string, userid: string) => {
    const { data, error } = await supabase.rpc('remove_like', { postid: id, userid: userid })
    if (error) toast.error(error.message)
    else toast.success("Removed Like", {icon: "🗙"})
}

const dislike_post = async (supabase: SupabaseClient<Database>, id: string, userid: string) => {
    const { data, error } = await supabase.rpc('dislike_post', { postid: id, userid: userid })
    if (error) toast.error(error.message)
    else toast.success("Disliked", {icon: "👎"})
}

const remove_dislike = async (supabase: SupabaseClient<Database>, id: string, userid: string) => {
    const { data, error } = await supabase.rpc('remove_dislike', { postid: id, userid: userid })
    if (error) toast.error(error.message)
    else toast.success("Removed Dislike", {icon: "🗙"})
}

export { like_post, remove_like, dislike_post, remove_dislike }