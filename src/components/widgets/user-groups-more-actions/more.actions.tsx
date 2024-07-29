
import React, { ReactNode } from 'react';
import styles from './more.actions.module.css';

type ModalProps = {
  children: ReactNode;
};

const MoreActions = ({ children }: ModalProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

type TitleProps = {
  title: string;
};

MoreActions.Title = ({ title }: TitleProps) => (
  <div className={`${styles.titlediv} bodyb`}>{title}</div>
);

type NameProps = {
  text: string;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

MoreActions.Text = ({ text, children, isActive, onClick }: NameProps) => (
  <button 
    className={`${styles.nameIcon} ${isActive ? styles.active : ''}`} 
    onClick={onClick}
  >
    <div className={styles.icon}>{children}</div>
    <div className={`${styles.text} bodyr`}>{text}</div>
  </button>
);

export default MoreActions;