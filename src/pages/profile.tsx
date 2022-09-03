import { FaTrophy, FaUserFriends, FaPen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsFillGearFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center text-white ">
      <div className=" h-20 top-0 left-4 right-4 absolute rounded-lg bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 opacity-90 border border-slate-800" />

      <div className="w-full flex flex-col justify-center p-6 z-10 space-y-10">
        <div className="items-center flex justify-center w-full">
          <AvatarPrimitive.Avatar>
            <AvatarPrimitive.Fallback
              className={`items-center flex justify-center 
              bg-gray-400 font-medium rounded-full
              h-20 w-20 text-white
              p-4 
              `}
            >
              LF
            </AvatarPrimitive.Fallback>
          </AvatarPrimitive.Avatar>
        </div>
        <div className="flex flex-row justify-between">
          <StatsProfile statLabel="+500" label="Conexões" />
          <StatsProfile statLabel="+500" label="Seguidores" />
          <StatsProfile statLabel="+500" label="Seguidores" />
        </div>
        <div className="flex flex-row justify-evenly items-center">
          <FaTrophy size={30} />
          <FaUserFriends size={30} />
          <MdFeedback size={30} />
          <FaPen size={30} />
          <Link href="/options">
            <BsFillGearFill size={30} href="/options" className="cursor-pointer" />
          </Link>
        </div>
        <button>Edit Profile</button>
      </div>
      <FixedHomeTabOutlet />
    </div>
  );
}

const StatsProfile = ({ statLabel, label }) => (
  <div className="text-center">
    <p className="font-bold text-lg">{statLabel}</p>
    <h6 className="text-sm font-normal text-slate-300 ">{label}</h6>
  </div>
);
