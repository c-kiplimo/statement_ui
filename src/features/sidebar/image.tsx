import React from 'react'
import Image from "next/image";
import styles from "./image.module.css"

const SideBarImage = () => {
  return (
    <div className={styles.container}>
          <Image src="/simba.png" alt="Finance" width={132} height={71} />
          
            <span className={styles.appname}>
                <span className='h5l'>Simba</span>
                <span className='h5b'>PORTAL</span>
            </span>
    </div>
  )
}

export default SideBarImage
