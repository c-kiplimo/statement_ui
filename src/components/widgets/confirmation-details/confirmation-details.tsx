import React, { ReactNode } from "react";
import styles from "./confirmation-details.module.css";
import Texter from "../../atoms/text/texter";

type userProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

const ConfirmationDetails = ({ title, description, children }: userProps) => {
  return (
    <div className={styles.description}>
      <div className={styles.header}>
        <div className={styles.icon}>{children}</div>
        <Texter
          text={title}
          className={"bodyr"}
          textStyle={{ color: "var(--Text-Text-Description-01)" }}
        />
      </div>
      <Texter
        text={description}
        className={"bodym"}
        textStyle={{ color: "var(--shade-colors-shade-100)" }}
      />
    </div>
  );
};

export default ConfirmationDetails;
