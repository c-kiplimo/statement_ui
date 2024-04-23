import React, { ReactNode } from "react";
import styles from "./two-sided-layout.module.css";

type LayoutProps = {
  sidebar: ReactNode;
  link?: ReactNode;
  content: ReactNode;
};

const TwosidedLayout = ({ sidebar, link, content }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>{sidebar}</div>

      <div className={styles.content}>
        <div className={styles.linkHeader}>{link}</div>
        {content}
      </div>
    </div>
  );
};

export default TwosidedLayout;
