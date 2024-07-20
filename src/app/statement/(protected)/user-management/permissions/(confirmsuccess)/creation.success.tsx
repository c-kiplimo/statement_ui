import React from 'react';
import styles from './creation.success.module.css'
import Image from 'next/image';

type CreationSuccessProps ={
  title:string;
  description:string;
  onClick:()=>void;
}

const CreationSuccess = ({title, description, onClick}: CreationSuccessProps) => {
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
            <button className={styles.button} onClick={onClick}>Ok</button>
        </div>

      </div>
    </div>
  )
}

export default CreationSuccess
