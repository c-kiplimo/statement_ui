
import { MulaPaySideBar } from "@/src/components/widgets/sidebar/msidebar";
import { SiderBar } from "@/src/components/widgets/sidebar/sidebar";
import { SideNavItemsData, MenuData } from "@/src/constants/siderbar.docs";
import { ReactNode } from "react";

const DocsLayout = ({ children }: { children: ReactNode }) => {


    return (
        <div style={{ "display": "flex", flexDirection: "row", "height": "100vh" }}>

            <nav>
                <MulaPaySideBar items={[]} {...MenuData} />
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}
export default DocsLayout