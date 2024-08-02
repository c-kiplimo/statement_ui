import React from 'react';
import styles from './confirm.failure.module.css'
import Image from 'next/image';

type DeleteGroupUsersFailProps ={
  title:string;
  description:string;
  onTryAgain:()=>void;
  onCancel:()=>void
}

const DeleteGroupUsersFail = ({title, description, onTryAgain, onCancel}: DeleteGroupUsersFailProps) => {
  
  return (
    <div className={styles.container}>
        <Image src={'/errorIcon.svg'} width={56} height={56} alt='errorIcon'/>

      <div className={styles.content}>
        <div className={styles.body}>
                <span className='h6m'>{title}</span>
                <span className={`${styles.text} bodyr`}>{description}</span>
        </div>
        <div className={styles.buttons}>
            <button className={`${styles.cancelbutton} bodyr`} onClick={onCancel}>Cancel</button>
            <button className={`${styles.trybutton} bodyr`} onClick={onTryAgain!}>Try Again</button>
        </div>

      </div>
    </div>
  )
}

export default DeleteGroupUsersFail
