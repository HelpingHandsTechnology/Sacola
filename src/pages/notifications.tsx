import { FaTrophy, FaUserFriends, FaPen, FaInfoCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdFeedback, MdOutlineSaveAlt } from "react-icons/md";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";
import { CommonHeaderContainer } from "../Components/shared/CommonHeaderContainer";
import { AiOutlineClose } from "react-icons/ai";

export default function Notifications() {
  return (
    <>
      <CommonHeaderContainer title={"Notificações"} />
      <main className="p-4">
        <div className="space-y-2">
          <NotificationInfoItem
            title={'Novo artigo de "Smashing Magazine": Scroll Bouncing On Your Websites'}
            description="Understanding the scroll bouncing effect and how to implement it on your websites."
          />
          <NotificationSocialItem
            title={'Novo artigo de "Smashing Magazine": Scroll Bouncing On Your Websites'}
            description="Understanding the scroll bouncing effect and how to implement it on your websites."
          />
        </div>
      </main>
      <FixedHomeTabOutlet />
    </>
  );
}

const NotificationInfoItem = ({ title, description }) => {
  return (
    <div className="flex flex-col p-4 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaInfoCircle size={32} className=" text-blue-400 flex-shrink" />
          <div className="flex flex-col">
            <div className="font-medium leading-none text-xs text-gray-100">{title}</div>
            <p className="text-xs text-gray-500 font-light leading-none mt-1">
              {description}
            </p>
          </div>
          <AiOutlineClose size={24} className="text-gray-200 flex-shrink" />
        </div>
      </div>
    </div>
  );
};

const NotificationSocialItem = ({ title, description }) => {
  return (
    <div className="container bg-gray-800 rounded-xl shadow-lg transform transition duration-500">
      <div className="flex p-4 justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            className="w-10 rounded-full"
            src="https://thispersondoesnotexist.com/image"
            alt="sara"
          />
          <div className="flex flex-row">
            <h2 className="text-gray-300 cursor-pointer text-xs">
              <b className="font-semibold">Luis Felipe</b> compartilhou com você o artigo:
              Advice for Developers
            </h2>
          </div>
          <MdOutlineSaveAlt size={24} className="text-gray-200" />
          <AiOutlineClose size={24} className="text-gray-200 flex-shrink" />
        </div>
      </div>
    </div>
  );
};
