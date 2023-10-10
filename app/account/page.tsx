"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) alert("Error")
      if (session) setLoggedIn(true)
    }
    fetchUser()
    if (!loggedIn) router.push('/error?error=Not logged in')
  }, [loggedIn])
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="mt-10 text-foreground">
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default page