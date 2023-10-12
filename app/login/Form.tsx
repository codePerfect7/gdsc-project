const Form = () => {
    return (
        <form className="mt-4 p-4 border" onSubmit={e => e.preventDefault()}>
            <div className="block md:flex my-8">
                <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
                    <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" required />
                    <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                    <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="email">Email</label>
                </div>
            </div>
            <div className="block md:flex my-8">
                <div className="w-full h-10 my-10 mx-0 md:mx-5 md:my-0 relative">
                    <input className="peer block w-full h-full text-lg font-bold bg-background border-b-2 border-b-white/40 outline-none overflow-hidden text-ellipsis" type="text" required />
                    <div className="underline absolute bottom-0 h-[2px] w-full before:absolute before:content-[''] before:h-[2px] before:w-full before:bg-white before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease peer-focus:before:scale-x-100 peer-valid:before:scale-x-100 "></div>
                    <label className="absolute pointer-events-none bottom-4 text-lg transition-all duration-300 ease peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm" htmlFor="email">Email</label>
                </div>
            </div>
            <div className="block md:flex my-8">
                <div className="w-full p-4 flex justify-center items-center ">
                    <input type="submit" value="Submit" className="mx-auto py-4 px-10 text-xl font-semibold bg-slate-600/50 hover:bg-slate-700 transition-all duration-200 ease cursor-pointer rounded-3xl  " />
                </div>
            </div>
            <div className="block md:flex my-8">
                <div className="w-full p-4 flex justify-center items-center ">
                    <input type="submit" value="Submit" className="mx-auto py-4 px-10 text-xl font-semibold bg-slate-600/50 hover:bg-slate-700 transition-all duration-200 ease cursor-pointer rounded-3xl  " />
                </div>
            </div>
        </form>
    )
}

export default Form