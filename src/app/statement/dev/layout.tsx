"use client";

import React, { useState } from "react";
import { userDetails } from "@/src/services/auth-user-details";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/molecules/shared-features/navbar/navbar";
import CustomSidebar from "../../../components/molecules/dashboard/sidebar/Custom_sidebar";


import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { MulaPaySideBar } from "@/src/components/widgets/sidebar/msidebar";
import { MenuData } from "@/src/constants/siderbar.docs";
import { sidebarItems } from "../(protected)/routes";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div style={{ "display": "flex", flexDirection: "row", "height": "100vh" }}>
        <nav>
          <MulaPaySideBar items={MenuData} />
        </nav>
        <main>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
};

export function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

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
    <aside className="flex min-h-screen">
      <CustomSidebar
        sidebarItems={sidebarItems}
        onItemClick={handleItemClick}
        activeItemIndex={activeItemIndex}
      />
    </aside>
  );
};

const LNavbar = ({ children, bgColor }: any) => {
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
    <Navbar
      textColor="var(--Main-text)"
      imageSrc="/profile.png"
      bgColor="#FDFDFF"
      height="56px"
      fullName={"default"}
      onUserProfileClick={handleUserProfileClick}
    />
  );
};

export { Sidebar, LNavbar };
export default ProtectedLayout;
