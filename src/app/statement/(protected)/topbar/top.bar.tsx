import { MenuOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./top.bar.module.css";

type TopbarProps = {
  onClick: () => void;
};

const Topbar = ({ onClick }: TopbarProps) => {
  return (
    <div className={`${styles.container} p-4 align-middle`}>
      <MenuOutlined onClick={onClick} />
    </div>
  );
};

export default Topbar;
