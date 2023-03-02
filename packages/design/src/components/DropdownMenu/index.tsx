import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

type DropdownMenu = {
  xClassName?: string;
  items: {
    name: string;
    onClick?: () => void;
  }[];
};

export const DropdownMenu = ({ xClassName, items }: DropdownMenu) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div ref={ref} className={`flex flex-col items-end gap-2 ${xClassName}`}>
      <button
        id="dropdownMenuIconButton"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        onClick={(e) => {
          setOpen(!open);

          e.stopPropagation();
        }}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>

      {open && (
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            {items.map((item) => (
              <li
                key={item.name}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(e) => {
                  item.onClick && item.onClick();

                  e.stopPropagation();
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
