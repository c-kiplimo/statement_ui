import React, { ReactNode } from "react";
import styles from "./two-sided-layout.module.css";
import { AuthFlowSideBar } from "../sidebar/common.sidebar";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";
import logo from '@/public/merakilogo.png'


type LayoutProps = {
  sidebar: ReactNode;
  link?: ReactNode;
  content: ReactNode;
};

const TwosidedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ "display": "flex", "height": "100vh"}}>
    <nav>
      <AuthFlowSideBar title={"Meraki"}
         description={"Portal"}
          icon={logo}/>
    </nav>
    <main style={{width:"100%"}}>
      {children}
    </main>
  </div>
  );
};

export default TwosidedLayout;
