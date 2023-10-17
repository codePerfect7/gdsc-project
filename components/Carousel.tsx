"use client"

import { ArrowLeft, ArrowRight, Dot } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Carousel = ({ posts }: { posts: Post[] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    let slides: any[] = [];
    posts.map((post) => {
        slides.push({
            id: post.id,
            url: post.blog_image,
            title: post.title,
        })
    })

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[960px] h-[540px] w-full m-auto py-16 px-4 relative group'>
            <Link href={`/blog/${posts[currentIndex].id}`}>
                <div 
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className='w-full h-full rounded-2xl bg-center bg-cover duration-500 relative'
                >
                    <div className="absolute text-foreground text-2xl underline decoration-2 underline-offset-4 font-bold  bottom-4 bg-black/90 p-3 rounded-2xl left-1/2 -translate-x-1/2  ">{slides[currentIndex].title}</div>
                </div>
            </Link>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <ArrowLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <ArrowRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        <Dot />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel