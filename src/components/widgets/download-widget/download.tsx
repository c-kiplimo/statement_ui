import React, {ReactNode } from 'react'
import styles from "./download.module.css"

type DownloadProps = {
children:ReactNode;
onClick?: () => void;
}

const DownloadWidget = ({children,onClick}:DownloadProps) => {
  return (
    <div className={`${styles.container} bodyr`} onClick={onClick}>
      {children}
    </div>
  )
}

export default DownloadWidget


type IconProps={
    children:ReactNode
  }

  DownloadWidget.Icon=({children}:IconProps)=>(
    <div>{children}</div>
  )

  type textProps={
    text:string
  }

  DownloadWidget.text=({text}:textProps)=>(
    <div>{text}</div>
  )