import Image from "next/image"
import SignOutComponent from "./SignOutComponent"
import { Session } from "@supabase/supabase-js"

const ProfileSection = ({ user, session }: { user: Profile, session: Session }) => {
  return (
    <div className="col-span-1 lg:h-[75vh] lg:sticky lg:top-[21vh] w-full">
      <div className="w-full h-full relative">
        <div className="w-full max-w-[200px] aspect-square">
          <Image src={user.avatar_url ?? ""} alt="Avatar" width={150} height={150} className="rounded-full absolute -z-10 top-0 left-1/2 -translate-x-1/2 translate-y-[25%] outline outline-4 outline-slate-200" />
        </div>
        <div className=" p-4 mt-2 ">
          <h1 className="mt-1 text-md xl:text-xl font-bold relative border-4 p-2 ">
            <div className="absolute text-sm -top-3 left-0 bg-white text-background rounded-3xl px-1 ">Username</div>
            <span className="block truncate">{user.username}</span>
          </h1>
          <h1 className="mt-3 text-md xl:text-xl font-bold relative border-4 p-2 ">
            <div className="absolute text-sm -top-3 left-0 bg-white text-background rounded-3xl px-1 ">Email</div>
            <span className="block truncate">{user.email}</span>
          </h1>
          <div className="flex justify-center">
            <SignOutComponent session={session} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection