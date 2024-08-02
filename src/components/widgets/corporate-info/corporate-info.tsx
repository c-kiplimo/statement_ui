import React, { ReactNode } from "react";
import styles from "./corporate-info.module.css";
import Icon from "@/src/components/atoms/icon/icon";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import classNames from "classnames";

const CorporateInfo = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default CorporateInfo;

CorporateInfo.Header = ({ children }: { children: ReactNode }) => {
  return <div className={styles.header}>{children}</div>;
};

CorporateInfo.UserIcon = ({ children }: { children: ReactNode }) => {
  return <Icon>{children}</Icon>;
};

type userProps = {
  userName: string;
  userId: string;
  userType?: string;
};

CorporateInfo.UserDetails = ({ userName, userId, userType }: userProps) => {
  return (
    <div className={styles.userDetails}>
      <VerticalInfoDescription
        title={userName}
        titleStyle={{
          fontWeight: "500",
          fontSize: "20px",
          color: "#151E00",
        }}
        titleInfo={userId}
        titleInfoStyle={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#6F7269",
        }}
        description={userType}
        descriptionStyle={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#1A2600",
        }}
      />
    </div>
  );
};

CorporateInfo.Description = ({ children }: { children: ReactNode }) => {
  return <div className={styles.description}>{children}</div>;
};

type statusProps = {
  customerStatus: boolean;
};
CorporateInfo.Status = ({ customerStatus }: statusProps) => {
  const statusText = customerStatus ? "Active" : "Deactivated";
  const statusClass = classNames(styles.state, {
    [styles.active]: customerStatus,
    [styles.deactivated]: !customerStatus,
  });
  return <div className={statusClass}>{statusText}</div>;
};
