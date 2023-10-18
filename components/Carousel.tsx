"use client"

import { ArrowLeft, ArrowRight, Dot } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Carousel = ({ posts }: { posts: Post[] }) => {

    let slides: any[] = [];
    posts.map((post) => {
        slides.push({
            id: post.id,
            url: post.blog_image,
            title: post.title,
        })
    })
    const [currentSlide, setCurrentSlide] = useState<number>(1)

    const prevSlide = () => setCurrentSlide(current => current - 1)

    const nextSlide = () => setCurrentSlide(current => current + 1)

    return (
        <div className='overflow-hidden max-w-[960px] h-[540px] w-full mt-10 p-4 py-8 mb-8 '>
            <div className="relative overflow-hidden">
                <div  className="flex transition-transform ease-out duration-200" 
                    style={{ transform: `translateX(-${(Math.abs(currentSlide) % slides.length) * 100}%)` }}>
                    {slides.map((slide, index) => {
                        return <img src={slide.url} alt="Image" className="rounded-2xl cursor-pointer" key={index} />
                    })}
                </div>
                <Link href={`/posts/${slides[Math.abs(currentSlide) % slides.length].id}`} className="absolute top-3/4 z-50 left-1/2 -translate-x-1/2 text-base md:text-2xl bg-black/80 text-white p-2 px-4 rounded-2xl hover:underline hover:bg-black transition-all duration-150 ease-out   text-foreground">
                    {slides[Math.abs(currentSlide) % slides.length].title}
                </Link>
                <div className="absolute inset-0 text-gray flex items-center justify-between p-4">
                    <button className="p-1 rounded-full shadow bg-white/30 hover:bg-white/75 transition-all duration-200 ease-linear  " onClick={prevSlide}><ArrowLeft size={40} className="p-2 full cursor-pointer transition-all duration-150 ease-in " /></button>
                    <button className="p-1 rounded-full shadow bg-white/30 hover:bg-white/75 transition-all duration-200 ease-linear  " onClick={nextSlide}><ArrowRight size={40} className="p-2 full cursor-pointer transition-all duration-150 ease-in " /></button>
                </div>
            </div>
        </div>
    )
}

export default Carousel