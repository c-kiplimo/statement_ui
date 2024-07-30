import React from 'react';
import styles from './deletion.success.module.css'
import Image from 'next/image';

type DeletionSuccessProps = {
  title: string;
  description: string;
  onClose: () => void; 
};

const DeletionSuccess = ({ title, description, onClose }: DeletionSuccessProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.body}>
          <Image src={'/success.png'} width={42} height={42} alt='successicon'/>
          <div className={styles.header}>
            <span className='h6m'>{title}</span>
            <span className={`${styles.text} bodyr`}>{description}</span>
          </div>
        </div>
        <div>
          <button className={styles.button} onClick={onClose}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default DeletionSuccess;
