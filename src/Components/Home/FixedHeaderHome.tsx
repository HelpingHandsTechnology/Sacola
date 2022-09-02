import { useState } from "react";
import { clsx } from "clsx";

import { AiFillHome, AiOutlineHeart, AiOutlineBell } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

import type { IconType } from "react-icons";

interface ITabOutletItemProps {
  active: boolean;
  icon: IconType;
  href: string;
}

export const FixedHeaderHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="px-2 bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-700">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex items-center">
          <span></span>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            LOGO
          </span>
        </a>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className={`inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500`}
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          onClick={() => {
            setIsOpen((v) => !v);
          }}
        >
          <span className="sr-only">Abrir Menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <MobileMenu isOpen={isOpen} />
    </nav>
  );
};

const MobileMenu = ({ isOpen }) => (
  <div
    className={clsx([!isOpen && "hidden", `w-full md:block md:w-auto`])}
    id="mobile-menu"
  >
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a
          href="#"
          className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
          aria-current="page"
        >
          Home
        </a>
      </li>
      <li>
        <button
          id="dropdownNavbarLink"
          data-dropdown-toggle="dropdownNavbar"
          className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        >
          Dropdown{" "}
          <svg
            className="ml-1 w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Dropdown menu */}
        <div
          id="dropdownNavbar"
          className="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownLargeButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Services
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Pricing
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Contact
        </a>
      </li>
    </ul>
  </div>
);

/**
 * ################################
 * START FixedTabOutlet
 */
export const FixedTabOutlet = () => {
  return (
    <ul className="z-[1] border-t border-gray bg-slate-900  dark flex fixed bottom-0 left-0 right-0 p-8 justify-between text-sm font-medium text-center text-gray-500 ">
      <TabOutletItem active={true} icon={AiFillHome} href="#" />
      <TabOutletItem active={false} icon={AiOutlineHeart} href="#" />
      <TabOutletItem active={false} icon={AiOutlineBell} href="#" />
      <TabOutletItem active={false} icon={IoPersonOutline} href="#" />
    </ul>
  );
};

/**
 * TODO: Adicionar label e icone como prop
 */
function TabOutletItem({ active, icon: Icon, href }: ITabOutletItemProps) {
  const classActive =
    "flex text-blue-600 rounded-t-lg border-blue-600 active dark:text-blue-500 dark:border-blue-500 group bg-";
  const classInactive =
    "flex rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";

  return (
    <li className="mr-2">
      <a href={href}>
        <Icon size={24} className={active ? classActive : classInactive} />
      </a>
    </li>
  );
}
