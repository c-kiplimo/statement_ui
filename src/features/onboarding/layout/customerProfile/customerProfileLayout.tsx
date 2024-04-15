import React from "react";
import styles from "./customerProfileLayout.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";

const CustomerProfileLayout = ({ children, text }: any) => {
  const token = useTokens();
  return (
    <div
      style={{ background: token.default.white }}
      className={styles.container}
    >
      {children}
    </div>
  );
};

export default CustomerProfileLayout;
