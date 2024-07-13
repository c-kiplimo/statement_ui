import React, { ReactNode } from "react";
import styles from "./icon.module.css"

type iconProps = {
  children: ReactNode;
};

const Icon = ({ children }: iconProps) => {
  return <div className={styles.icon}>{children}</div>;
};

export default Icon;
