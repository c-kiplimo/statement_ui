import { CSSProperties, ReactNode } from "react";
import styles from "./common.module.css";
import { SiderBarTitle } from "./sidebar.title";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type AuthFlowSideBarProp = {
  title: string;
  description: string;
  icon: StaticImport;
  opened?: boolean;
  style?: CSSProperties;
};

export const AuthFlowSideBar = ({
  title,
  description,
  icon,
  opened = true,
  style,
}: AuthFlowSideBarProp) => {
  return (
    <div className={styles.container} style={style}>
      <SiderBarTitle
        title={title}
        description={description}
        icon={icon}
        opened={opened}
      />
      <div className={styles.content}>
        <span className="main-text h3r">Welcome to simba portal.</span>
        <span className="description bodyl">
          Empowering you with easy access to your financial statements.View
          account statement, Loan statement, Card statement and Swift statement
        </span>
      </div>
    </div>
  );
};
