"use client";

import React, { useContext } from "react";
import "./sidebar.css";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { MenuContext } from "@/src/app/(context)/MenuContext";
import SidebarItem from "./SidebarItem";
import ImageAndTextSection from "./image_and_text_section";

const CustomSidebar = ({ sidebarItems, activeItemIndex }: any) => {
  const { Toggle, expanded }: any = useContext(MenuContext);

  return (
    <aside className="h-full">
      <nav className="h-full flex p-7  flex-col bg-secondaryBrandColorSecondary border-r shadow-sm scrollbar-hide">
        <ImageAndTextSection expanded={expanded} />

        {sidebarItems?.map((item: any, index: number) => (
          <React.Fragment key={index}>
            {item?.type === "title" ? (
              <li
                className={`overflow-hidden font-mono text-sm ${
                  (item.type === "title" && expanded && index !== 0) ||
                  item.hasMargin
                    ? "mt-14"
                    : "mt-1"
                } ml-3 text-gray-400 transition-all opacity-transition ${
                  expanded ? "w-32" : "w-0 hidden-menu-item"
                }`}
              >
                {item?.text}
              </li>
            ) : (
              <SidebarItem
                key={index}
                href={item.href}
                icon={item.icon}
                text={item.text}
                active={index === activeItemIndex}
                submenu={item.submenu}
              />
            )}
          </React.Fragment>
        ))}

        <div className="border-t flex mt-20 p-3">
          <Image
            src="/profile.png"
            alt="img"
            width={40}
            height={40}
            className="w-auto h-auto rounded-full m-1"
          />
          <div
            className={`
                  flex justify-between items-center
                  overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }
              `}
          >
            <div className="leading-4">
              <Link href="/statement/profile-information">
                <h4 className="font-semibold text-white">John Doe</h4>
                <span className="text-xs text-white">johndoe@gmail.com</span>
              </Link>
            </div>
            <MoreVertical onClick={Toggle} className="text-white" size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default CustomSidebar;
