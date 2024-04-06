import React, { ReactNode } from 'react'
import styles from "./filter.module.css"
import { FilterOutlined } from '@ant-design/icons'

type filterhProps={
    title:string;
    icon:ReactNode;
  }

const Filter = (props:filterhProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.textdiv}>{props.title}</div>
      <div className={styles.icondiv}>{props.icon}</div>
    </div>
  )
}

export default Filter
