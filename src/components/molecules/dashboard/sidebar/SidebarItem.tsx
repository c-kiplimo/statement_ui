"use client";

import { ChevronRight } from "lucide-react";
import SubMenuItem from "./SubMenuItem";
import { MenuContext } from "@/src/app/(context)/MenuContext";
import { useContext, useState } from "react";
import Link from "next/link";

const SidebarItem = ({ icon, text, href, active, alert, submenu }: any) => {
  const { expanded }: any = useContext(MenuContext);
  const [submenuExpanded, setSubmenuExpanded] = useState(false);
  const [isActive, setIsActive] = useState(active);

  const toggleSubmenu = () => {
    setSubmenuExpanded((prev) => !prev);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Link href={`${href}`}>
      <li
        className={`
        relative flex flex-col py-2 px-3 my-1
        font-medium rounded-sm cursor-pointer
        transition-colors group
        ${
          isActive
            ? "bg-gray-200 rounded-sm text-indigo-800"
            : "hover:bg-lime-400 rounded-sm text-white"
        }
    `}
        onClick={handleClick}
      >
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        <div
          className={`flex p-0 items-center ${
            submenuExpanded ? "bg-gray-200" : ""
          }`}
          onClick={toggleSubmenu}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>

          {submenu && (
            <ChevronRight
              className={`ml-auto transition-transform ${
                submenuExpanded ? "transform rotate-90" : ""
              }`}
            />
          )}
        </div>

        {submenu && submenuExpanded && (
          <div
            className={`
            mt-1 py-2 px-2 bg-primary text-white
            rounded-md shadow-lg flex justify-center
          `}
          >
            <ul className="left top-1 mt-2 ml-1 py-1 bg-gray-200 rounded-md shadow-lg">
              {submenu?.map((subItem: any, index: any) => (
                <SubMenuItem
                  key={index}
                  text={subItem.text}
                  href={subItem.href}
                />
              ))}
            </ul>
          </div>
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full  rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all z-40
            group-hover:visible whitespace-nowrap text-center group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};

export default SidebarItem;
