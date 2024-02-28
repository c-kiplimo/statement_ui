import React from "react";
import style from "./account.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";

const AccountCardHeader = ({ text, width, searchIcon, addIcon }: any) => {
  const token = useTokens();
  return (
    <div
      style={{
        display: "flex",
        minWidth: width,
        width: "100%",
        padding: "0px 0 16px 0",
        justifyContent: "space-between",
        borderBottom: `1px solid ${token.default.grey}`,
        alignItems: "center",
      }}
    >
      <div className={style.accountText}>{text}</div>
      <div className={style.accoutnHeaderSearchAddIcon}>
        {searchIcon}
        {addIcon}
      </div>
    </div>
  );
};

export default AccountCardHeader;
