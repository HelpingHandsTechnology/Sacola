import { BiExport, BiDotsHorizontalRounded } from "react-icons/bi";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaHeadphonesAlt } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";

import type { IconType } from "react-icons";
import Link from "next/link";

interface ITabOutletItemProps {
  icon: IconType;
  href?: string;
}

/**
 * ################################
 * START FixedTabOutlet
 */
export const FixedArticleTabOutlet = () => {
  return (
    <ul className="h-74 z-1 border-t border-gray bg-slate-900  dark flex fixed bottom-0 left-0 right-0 px-8 py-5 justify-between text-sm font-medium text-center text-gray-500 ">
      <TabOutletItem icon={IoChevronBackSharp} href="/" />

      <div className="flex gap-4">
        <TabOutletItem icon={BiExport} />
        <TabOutletItem icon={FaHeadphonesAlt} />
        <TabOutletItem icon={BsArchive} />
        <TabOutletItem icon={BiDotsHorizontalRounded} />
      </div>
    </ul>
  );
};

/**
 * TODO: Adicionar label e icone como prop
 */
function TabOutletItem({ icon: Icon, href }: ITabOutletItemProps) {
  return (
    <li className="mr-2 cursor-pointer">
      {href ? (
        <Link href={href}>
          <Icon
            size={28}
            className={
              "flex rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            }
          />
        </Link>
      ) : (
        <button>
          <Icon
            size={28}
            className={
              "flex rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            }
          />
        </button>
      )}
    </li>
  );
}
