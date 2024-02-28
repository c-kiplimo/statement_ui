import { CSSProperties, ReactNode } from "react"
import styles from "./card.header.m2.module.css"
export type CardHeaderM2Props={
    title: string,
    description: string,
    additionInfo: string,
    icon: ReactNode
    iconStyles?:CSSProperties
    titleStyles?:CSSProperties
    descriptionStyles?:CSSProperties
    additionStyles?:CSSProperties
}
const CardHeaderM2=(props:CardHeaderM2Props)=>{


    return (

        <div className={styles.container}>
            <div className={styles.icon} style={{...props.iconStyles}}>{props.icon}</div>
    
            <div className={styles.textContainer}>
             <div><p className={styles.title}>{props.title}</p></div>
            <div>
                <p className={styles.description}>{props.description}</p>
                <p className={styles.additionInfo}>{props.additionInfo}</p>
            </div>
            </div>
           
        </div>
    )
}

export default CardHeaderM2