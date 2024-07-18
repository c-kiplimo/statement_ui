import React, { CSSProperties, ReactNode } from 'react';
import styles from './failure.module.css';

type SuccessModalProps = {
    onClick?: () => void;
    children: ReactNode;
    onOkClick?: () => void; 
    ionStyles?: CSSProperties; 
    textStyles?:CSSProperties; 
};

const FailureModal = ({ onClick, children, onOkClick }: SuccessModalProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
      <div className={styles.buttonsDiv}> 
      <button className={`${styles.canceButton} bodym`} onClick={onOkClick}>Cancel</button>
      <button className={`${styles.tryAgainButton} bodyr`} onClick={onOkClick}>Try again</button>
      </div>
    </div>
  );
};

export default FailureModal;

type IconsProps = {
    children: ReactNode
};

FailureModal.Icon = ({ children }: IconsProps) => (
    <div className={styles.icon}>{children}</div>
);

type titleProps = {
  title: string
};

FailureModal.title = ({ title }: titleProps) => (
    <div className={`${styles.title} h6m`}>{title}</div>
);

type descriptionProps = {
  description: string
};

FailureModal.description = ({ description }: descriptionProps) => (
  <div className={`${styles.description} bodyr`}>{description}</div>
);
