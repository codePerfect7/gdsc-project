"use client"

import { useRouter, useSearchParams } from "next/navigation"

const page = () => {
    const router = useRouter()
    const params = useSearchParams()
    const error = params.get('error')
    if (error) return <div className="text-red-600 bg-slate-200 text-5xl mt-10 p-4">{error}</div>
    else router.push('/')
}

export default page