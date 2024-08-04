import React, { CSSProperties, ReactNode } from "react";
import styles from "./failure.module.css";

type FailureModalProps = {
  onClick?: () => void;
  children: ReactNode;
  onCancelClick?: () => void;
  onTryAgainClick?: () => void;
  iconStyles?: CSSProperties;
  textStyles?: CSSProperties;
};

const FailureModal = ({
  onClick,
  children,
  onCancelClick,
  onTryAgainClick,
}: FailureModalProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
      <div className={styles.buttonsDiv}>
        <button
          className={`${styles.cancelButton} bodym`}
          onClick={onCancelClick}
        >
          Cancel
        </button>
        <button
          className={`${styles.tryAgainButton} bodyr`}
          onClick={onTryAgainClick}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FailureModal;

type IconsProps = {
  children: ReactNode;
};

FailureModal.Icon = ({ children }: IconsProps) => (
  <div className={styles.icon}>{children}</div>
);

type TitleProps = {
  title: string;
};

FailureModal.title = ({ title }: TitleProps) => (
  <div className={`${styles.title} h6m`}>{title}</div>
);

type DescriptionProps = {
  description: string;
};

FailureModal.description = ({ description }: DescriptionProps) => (
  <div className={`${styles.description} bodyr`}>{description}</div>
);
