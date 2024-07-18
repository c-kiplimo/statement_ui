import React, { CSSProperties, ReactNode } from 'react';
import styles from './success.module.css';

type SuccessModalProps = {
    onClick?: () => void;
    children: ReactNode;
    onOkClick?: () => void; 
    ionStyles?: CSSProperties; 
    textStyles?:CSSProperties; 
};

const SuccessModal = ({ onClick, children, onOkClick }: SuccessModalProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
      <button className={styles.okButton} onClick={onOkClick}>OK</button>
    </div>
  );
};

export default SuccessModal;

type IconsProps = {
    children: ReactNode
};

SuccessModal.Icon = ({ children }: IconsProps) => (
    <div className={styles.icon}>{children}</div>
);

type titleProps = {
  title: string
};

SuccessModal.title = ({ title }: titleProps) => (
    <div className={`${styles.title} h6m`}>{title}</div>
);

type descriptionProps = {
  description: string
};

SuccessModal.description = ({ description }: descriptionProps) => (
  <div className={`${styles.description} bodyr`}>{description}</div>
);
