"use client";

import React, { useEffect, useState } from "react";
import { userDetails } from "@/src/services/auth-user-details";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/molecules/shared-features/navbar/navbar";
import CustomSidebar from "../../../components/molecules/dashboard/sidebar/Custom_sidebar";
import { sidebarItems } from "./routes";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { MulaPaySideBar } from "@/src/components/widgets/sidebar/msidebar";
import { MenuData, MenusData } from "@/src/constants/siderbar.docs";
import { ProfileProvider } from "./context/useProfileContext";
import Topbar from "./topbar/top.bar";
import styles from './statement.module.css'
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { fetchUserDetailsByUserId } from "@/src/services/auth/confirmUser";
import useProfileCreated from "@/src/hooks/useProfileCreated";


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [role, setRole] = useState('');
  const profile = useProfileCreated();
  const userId = profile?.userId;

  const handleClick = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSidebarItemClick = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    const userInfo = async () => {
      if (userId) {
        const response = await fetchUserDetailsByUserId(userId);
        setRole(response.userType);
      }
    };
    userInfo();
  }, [userId]);
  
  return (
    <SessionProvider>
    <ProfileProvider>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <div className={`${styles.overlay} ${sidebarVisible ? styles.visible : ''}`} onClick={handleClick}></div>
        <nav className={`${styles.sidebar} ${sidebarVisible ? styles.visible : ''}`}>
          {role.toUpperCase() === 'ADMIN' && 
          <MulaPaySideBar items={MenuData} onItemClick={handleSidebarItemClick}/>
          }
          <MulaPaySideBar items={MenusData} onItemClick={handleSidebarItemClick}/>

        </nav>
        <main style={{ width: '100%', overflowY: 'auto' }}>
          <Topbar onClick={handleClick} />
          {children}
        </main>
      </div>
    </ProfileProvider>
  </SessionProvider>
  );
};

function App({
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

// export { Sidebar, LNavbar };
export default ProtectedLayout;
