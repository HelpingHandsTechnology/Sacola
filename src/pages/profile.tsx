import { FaTrophy, FaUserFriends, FaPen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsFillGearFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";
import { getRandomInt, Heatmap } from "../Components/shared/Heatmap";

const hardCoded100ItemsOfHeatMap = [
  0, 1, 0, 0, 0, 0, 1, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 6, 0, 2,
  4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 0, 0, 1, 0, 4, 6, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 0, 0, 1, 0, 4, 6, 0, 4, 6, 0, 0, 1, 0, 4, 6,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 4, 6,
  0, 0, 1, 0, 4, 6, 0, 4, 3, 5, 6, 10, 0, 3, 5, 6, 6, 0,
];

export default function Profile() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white">
        <div className="w-full flex flex-col justify-center p-6 z-10 space-y-10 ">
          <HeaderProfile />
          <Stats />
          <div>
            <h4 className="text-lg font-semibold">Sua atividade</h4>
            <Heatmap count={hardCoded100ItemsOfHeatMap} squareNumber={120} />
          </div>
          <IconsOptions />
        </div>
      </div>
      <FixedHomeTabOutlet />
    </>
  );
}

const HeaderProfile = () => (
  <>
    <div className=" z-10 h-28 top-0 left-4 right-4 absolute rounded-lg bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 opacity-90 border border-slate-800" />
    <div className="z-20">
      <div className="items-center flex justify-center w-full ">
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
      <h3 className="text-center text-2xl font-bold">Luis Felipe</h3>
    </div>
  </>
);

const Stats = () => (
  <div className="flex flex-row justify-between">
    <StatsProfile statLabel="112" label="Conexões" />
    <StatsProfile statLabel="31" label="Seguidores" />
    <StatsProfile statLabel="42" label="Seguidores" />
  </div>
);

const IconsOptions = () => (
  <>
    <div className="flex flex-row justify-evenly items-center">
      <FaTrophy size={30} />
      <FaUserFriends size={30} />
      <MdFeedback size={30} />
      <FaPen size={30} />
      <Link href="/options">
        <a>
          <BsFillGearFill
            size={30}
            href="/options"
            className="cursor-pointer"
          />
        </a>
      </Link>
    </div>
    <button>Edit Profile</button>
  </>
);
const StatsProfile = ({ statLabel, label }) => (
  <div className="text-center">
    <p className="font-bold text-lg">{statLabel}</p>
    <h6 className="text-sm font-normal text-slate-300 ">{label}</h6>
  </div>
);
