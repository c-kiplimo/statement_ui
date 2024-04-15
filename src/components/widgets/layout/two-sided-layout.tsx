import React, { ReactNode } from "react";
import styles from "./two-sided-layout.module.css";

type LayoutProps = {
  sidebar: ReactNode;
  content: ReactNode;
};

const TwosidedLayout = ({ sidebar, content }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default TwosidedLayout;
