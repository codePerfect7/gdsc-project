"use client"

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const SignOutComponent = ({ session }: {session: Session}) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error(error)
        else router.push('/')
    }
    return (
        <button onClick={handleSignOut} className="text-foreground text-2xl mt-4 bg-slate-500/50 hover:bg-slate-500/75 transition duration-150 ease p-4 rounded-full px-6 font-bold">Sign Out</button>
    )
}

export default SignOutComponent