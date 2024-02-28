import { CSSProperties, ReactNode } from "react"
import styles from "./info.items.module.css"
type InfoItemProps={
    title: String
    content:String,
    description?: String
    styles?:CSSProperties
}
export const InfoItem =(props:InfoItemProps)=>{
    return(
        <div className={styles.container} style={props.styles}>
            <p className={styles.title}>{props.title}</p>
            <div className={styles.contentContainer}>
              <p className={styles.content}>{props.content}</p>
              <p className={styles.description}>{props.description}</p>
            </div>
        </div>
    )
}

type InfoIconItemProps={
    title: String
    status: String
    styles?:CSSProperties
}

export const InfoIconItem =(props:InfoIconItemProps)=>{
    return(
        <div className={styles.container} style={props.styles}>
            <p className={styles.title}>{props.title}</p>
            <div className={styles.statusBox}>
               {props.status}
            </div>
        </div>
    )
}