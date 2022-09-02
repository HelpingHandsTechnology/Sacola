import { AiFillHome, AiOutlineHeart, AiOutlineBell } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

import type { IconType } from "react-icons";
import { useRouter } from "next/router";
import Link from "next/link";

interface ITabOutletItemProps {
  icon: IconType;
  href: string;
}

/**
 * ################################
 * START FixedTabOutlet
 */
export const FixedTabOutlet = () => {
  return (
    <ul className="h-74 z-[1] border-t border-gray bg-slate-900  dark flex fixed bottom-0 left-0 right-0 px-8 py-5 justify-between text-sm font-medium text-center text-gray-500 ">
      <TabOutletItem icon={AiFillHome} href="/" />
      <TabOutletItem icon={AiOutlineHeart} href="/favorites" />
      <TabOutletItem icon={AiOutlineBell} href="/notifications" />
      <TabOutletItem icon={IoPersonOutline} href="/profile" />
    </ul>
  );
};

/**
 * TODO: Adicionar label e icone como prop
 */
function TabOutletItem({ icon: Icon, href }: ITabOutletItemProps) {
  const classActive =
    "flex text-blue-600 rounded-t-lg border-blue-600 active dark:text-blue-500 dark:border-blue-500 group bg-";
  const classInactive =
    "flex rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";

  const router = useRouter();
  const active = router.pathname === href;

  return (
    <li className="mr-2 cursor-pointer">
      <Link href={href}>
        <Icon size={28} className={active ? classActive : classInactive} />
      </Link>
    </li>
  );
}
