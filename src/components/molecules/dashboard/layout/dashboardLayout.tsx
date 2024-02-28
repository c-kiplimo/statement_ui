"use client";

import React, { useState } from "react";
import { userDetails } from "@/src/services/auth-user-details";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Projector,
  Receipt,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../../shared-features/navbar/navbar";
import CustomSidebar from "../sidebar/Custom_sidebar";

const sidebarItems = [
  {
    type: "title",
    text: "OVERVIEW",
  },
  {
    href: "/statement/dashboard",
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    active: 1,
  },
  {
    href: "/statement/account-statement",
    icon: <BarChart3 size={20} />,
    text: "Account Statement",
    active: 2,
  },

  {
    href: "/statement/loan-statement",
    icon: <Boxes size={20} />,
    text: "Loan Statement",
    // alert: "active",
    active: 3,
  },

  {
    href: "/statement/card-statement",
    icon: <LifeBuoy size={20} />,
    text: "Card Statement",
    active: 4,
  },
  {
    href: "/statement/swift-statement",
    icon: <Package size={20} />,
    text: "Swift Statement",
    active: 5,
  },

  {
    type: "title",
    text: "SETUP",
    hasMargin: true,
  },
  {
    href: "/statement/customer-setup",
    icon: <LayoutDashboard size={20} />,
    text: "Customer Setup",
    active: 1,
  },
  {
    href: "/statement/user-setup",
    icon: <BarChart3 size={20} />,
    text: "User Setup",
    active: 2,
  },

  {
    href: "/statement/template-setup",
    icon: <Boxes size={20} />,
    text: "Template Setup",
    active: 3,
  },

  {
    type: "title",
    text: "PROFILE",
  },

  {
    href: "/statement/user-management",
    icon: <Projector size={20} />,
    text: "Users Management",
    active: 7,
  },

  {
    href: "/statement/setting",
    icon: <Receipt size={20} />,
    text: "Settings",
    active: 8,
  },
  {
    href: "/statement/logout",
    icon: <Settings size={20} />,
    text: "Log out",
    active: 9,
  },
];

const Sidebar = ({ children, bgColor }: any) => {
  const router = useRouter();

  const user_details = userDetails();
  const firstName = user_details?.firstName;
  const lastName = user_details?.lastName;
  const fullName = `${firstName} ${lastName}`;

  const handleUserProfileClick = () => {
    router.push("/statement/profile-information");
  };

  const [activeItemIndex, setActiveItemIndex] = useState(-1); // Initialize with -1

  const handleItemClick = (index: any) => {
    setActiveItemIndex(index);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="flex min-h-screen">
        <CustomSidebar
          sidebarItems={sidebarItems}
          onItemClick={handleItemClick}
          activeItemIndex={activeItemIndex}
        />
      </aside>

      <main
        style={{ backgroundColor: bgColor || "white" }}
        className=" w-full bg-slate-100 flex-grow p-0"
      >
        <Navbar
          textColor="var(--Main-text)"
          imageSrc="/profile.png"
          bgColor="#FDFDFF"
          height="56px"
          fullName={fullName || "default"}
          onUserProfileClick={handleUserProfileClick}
        />
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
