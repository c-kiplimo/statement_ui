import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SubMenuItem = ({ text, href }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={`${href}`}
      className={`flex items-center py-1 px-4 my-1 ml-6 font-medium rounded-sm cursor-pointer transition-colors group ${
        isActive
          ? "bg-lime-400 text-indigo-800"
          : "hover:bg-slate-100 text-primary"
      }`}
    >
      <span className="mr-2">{text}</span>
    </Link>
  );
};

export default SubMenuItem;
