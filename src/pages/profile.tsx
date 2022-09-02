import { FaTrophy, FaUserFriends, FaPen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdFeedback } from "react-icons/md";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";

export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center text-white ">
      <div className="w-[90%] h-32 top-0 left-0 absolute rounded-md bg-gradient-to-br from-blue-900 to-slate-800 opacity-90" />

      <div className="w-full flex flex-col justify-center p-6 z-10 space-y-10">
        <div className="items-center flex justify-center w-full">
          <CgProfile size={120} />
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
