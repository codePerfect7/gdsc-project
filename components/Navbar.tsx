"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const linkass: Function = ({ href, name, className, active, key }: { href: string, name: string, className: string | null, active: boolean | null, key: string | null }) => {
    return <Link href={href} key={key ? key : ""} className={`relative rounded-full px-3 py-1.5 text-slate-200 ${active ? "" : "hover:text-red-100/50"} transition ${className ? className : ""} `}  >
        {active && (
            <motion.div layoutId='active-pill' className="absolute inset-0 bg-slate-200" style={{borderRadius: 9999}} transition={{type: "spring", duration: 0.6}} />
        )}
        <span className="relative z-10 mix-blend-exclusion">{name}</span>
    </Link>
}

export default function Navbar() {

    let pages = new Map<string, string>([["/", "Home"], ["/posts", "Posts"], ["/account", "Account"], ["/post", "Post"]])

    const [page, setPage] = useState("")
    const path = usePathname()
    useEffect(() => {
        // switch (path) {
        //     case '/': setPage("Home"); break;
        //     case '/posts': setPage("Posts"); break;
        //     case '/account': setPage("Account"); break;
        //     case '/post': setPage("Post"); break;
        //     default: setPage(""); break;
        // }
        if (path == '/') setPage("Home")
        else if (path.startsWith("/posts")) setPage("Posts")
        else if (path.startsWith("/account")) setPage("Account")
        else if (path.startsWith("/post")) setPage("Post")
        else setPage("")
    }, [path])
    return (
        <div className="w-screen flex justify-center items-center text-foreground pt-6 sticky top-2 z-10  ">
            <div className="p-2 md:p-4 font-semibold text-sm md:text-2xl rounded-full bg-slate-900 ring ring-offset-2 ring-slate-200 backdrop-filter backdrop-blur-2xl  ">
                <div className="flex space-x-0.5 md:space-x-2 px-3">
                    {/* {linkass({ href: "/", name: "Home",  active: (page == "Home") })}
                    {linkass({ href: "/posts", name: "Posts",  active: (page == "Posts") })}
                    {linkass({ href: "/account", name: "Account",  active: (page == "Account") })}
                    {linkass({ href: "/post", name: "Post",  active: (page == "Post") })} */}
                    {Array.from(pages).map(([key, value]) => {
                        return linkass({ href: key, name: value, active: (page == value), key: value})
                    })}
                </div>
            </div>
        </div>
    )
}
