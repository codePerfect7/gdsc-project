const ImageComponent = ({ url }: { url: string }) => {
  return (
    <div className="-mb-12 -z-10"><img src={url} className="w-1/2 min-w-[330px] mx-auto rounded-2xl shadow-md shadow-slate-600 " alt="Blog Image" /></div>
  )
}

export default ImageComponent