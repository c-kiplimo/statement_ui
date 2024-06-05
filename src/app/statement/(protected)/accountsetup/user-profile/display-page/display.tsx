import React from 'react'
import styles from "./display.module.css"
import Userprofile from '../user.profile'

type data={
    userId:number;
}

const Display = (userId: any) => {
  return (
    <div className={styles.container}>
      <Userprofile/>
    </div>
  )
}

export default Display
