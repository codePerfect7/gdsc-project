"use client"

import { useRouter, useSearchParams } from "next/navigation"

const page = () => {
    const router = useRouter()
    const params = useSearchParams()
    const error = params.get('error')
    if (error) return <div className="flex-1">
        <div className="text-red-600 font-bold max-w-2xl break-words bg-slate-200 text-5xl mt-10 p-6 rounded-2xl ">{error}</div>
    </div>
    else router.push('/')
}

export default page
