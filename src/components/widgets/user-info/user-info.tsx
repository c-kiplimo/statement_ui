import React, { ReactNode } from "react";
import styles from "./user-info.module.css";
import HorizontalInfoDescription from "../../atoms/text/horizontal-info-description";
import Texter from "../../atoms/text/texter";

type UserInfoProps = {
  children: ReactNode;
};

const UserInfo = ({ children }: UserInfoProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default UserInfo;

type TitleProps = {
  title: string;
  children?: ReactNode;
};

UserInfo.Title = ({ title, children }: TitleProps) => {
  return (
    <div className={styles.title}>
      <Texter text={title} className={"bodyr"} />
      {children}
    </div>
  );
};

type DescriptionProps = {
  title: string;
  description?: string;
};

UserInfo.Description = ({ title, description }: DescriptionProps) => {
  return (
    <div className={styles.description}>
      <HorizontalInfoDescription
        title={title}
        titleStyle={{
          fontWeight: "500",
          fontSize: "16px",
          color: "var(-shade-colors-shade-100)",
        }}
        description={description}
        descriptionStyle={{
          fontWeight: "500",
          fontSize: "16px",
          color: "var(--Text-Text-Description-01)",
        }}
      />
    </div>
  );
};
