import React, { ReactNode } from "react";
import styles from "./user.details.module.css";
import Icon from "../../atoms/icon/icon";
import classNames from "classnames";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import Texter from "../../atoms/text/texter";

const UserDetails = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default UserDetails;

UserDetails.Header = ({ children }: { children: ReactNode }) => {
  return <div className={styles.header}>{children}</div>;
};

UserDetails.Content = ({ children }: { children: ReactNode }) => {
  return <div className={styles.content}>{children}</div>;
};

UserDetails.ActionBtn = ({ children }: { children: ReactNode }) => {
  return <div className={styles.actionBtn}>{children}</div>;
};

UserDetails.Separator = ({ children }: { children: ReactNode }) => {
  return <div className={styles.separator}>{children}</div>;
};

UserDetails.ProfileImage = ({ children }: { children: ReactNode }) => {
  return <div className={styles.icon}>{children}</div>;
};
UserDetails.UserIcon = ({ children }: { children: ReactNode }) => {
  return <Icon>{children}</Icon>;
};

type ProfileProps = {
  userTitle: string;
  optionalData?: string;
  moreInfo?: string;
  description?: string;
};

UserDetails.Profile = ({
  userTitle,
  optionalData,
  moreInfo,
  description,
}: ProfileProps) => {
  return (
    <div className={styles.profile}>
      <VerticalInfoDescription
        title={userTitle}
        titleStyle={{
          fontWeight: "500",
          fontSize: "20px",
          color: "#151E00",
        }}
        titleInfo={optionalData}
        subTitle={moreInfo}
        subtitleStyle={{
          fontSize: "12px",
          color: "#6F7269",
        }}
        description={description}
        descriptionStyle={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#1A2600",
        }}
      />
    </div>
  );
};

type StatusProps = {
  status: boolean;
};

UserDetails.Status = ({ status }: StatusProps) => {
  const statusText = status ? "Active" : "Deactivated";
  const statusClass = classNames(styles.state, {
    [styles.active]: status,
    [styles.deactivated]: !status,
  });
  return <div className={statusClass}>{statusText}</div>;
};

type ActionProps = {
  onClick: (e: any) => void;
  text: string;
  className: string;
};

UserDetails.Actions = ({ onClick, text, className }: ActionProps) => {
  return (
    <div className={styles.userActions} onClick={onClick}>
      <Texter text={text} className={className} />
    </div>
  );
};
