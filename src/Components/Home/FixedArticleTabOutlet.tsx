import { BiExport, BiDotsHorizontalRounded } from "react-icons/bi";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaHeadphonesAlt } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";

import type { IconType } from "react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ITabOutletItemProps {
  icon: IconType;
  href?: string;
  onClick?(): void;
  active?: boolean;
}

interface IFixedArticleTabOutletProps {
  textHtml: string;
}

/**
 * ################################
 * START FixedTabOutlet
 */
export const FixedArticleTabOutlet = ({
  textHtml,
}: IFixedArticleTabOutletProps) => {
  const synth = window.speechSynthesis;

  const [playSound, setPlaySound] = useState(false);

  const utterance = new SpeechSynthesisUtterance(textHtml);

  useEffect(() => {
    if (playSound) {
      synth.speak(utterance);
    } else {
      synth.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playSound]);

  return (
    <ul className="h-74 z-1 border-t border-gray bg-slate-900  dark flex fixed bottom-0 left-0 right-0 px-8 py-5 justify-between text-sm font-medium text-center text-gray-500 ">
      <TabOutletItem icon={IoChevronBackSharp} href="/" />

      <div className="flex gap-4">
        <TabOutletItem icon={BiExport} />
        <TabOutletItem
          icon={FaHeadphonesAlt}
          onClick={() => setPlaySound(!playSound)}
          active={playSound}
        />
        <TabOutletItem icon={BsArchive} />
        <TabOutletItem icon={BiDotsHorizontalRounded} />
      </div>
    </ul>
  );
};

/**
 * TODO: Adicionar label e icone como prop
 */
function TabOutletItem({
  icon: Icon,
  href,
  onClick,
  active,
}: ITabOutletItemProps) {
  return (
    <li className="mr-2 cursor-pointer">
      {href ? (
        <Link href={href}>
          <a>
            <Icon
              size={28}
              className={`flex rounded-t-lg border-transparent dark:hover:text-gray-300 group`}
            />
          </a>
        </Link>
      ) : (
        <button onClick={onClick}>
          <Icon
            size={28}
            className={`flex rounded-t-lg border-transparent   group ${
              active && "dark:text-gray-300"
            }`}
          />
        </button>
      )}
    </li>
  );
}
