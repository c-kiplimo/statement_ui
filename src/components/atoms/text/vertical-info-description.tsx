import React, { CSSProperties } from 'react'
import styles from "./vertical-info-description.module.css"

type VerticalInfoDescriptionType = {
    title: String,
    description?: String
    bodyStyle?: CSSProperties
    titleStyle?: CSSProperties
    descriptionStyle?: CSSProperties

}
const VerticalInfoDescription = (props: VerticalInfoDescriptionType) => {
    return (
        <div className={styles.container} style={props.bodyStyle}>
            <span className={`${styles.title} bodyr`} style={props.titleStyle}>{props.title}</span>
            <span className={`${styles.description} captionr`} style={props.descriptionStyle}>{props.description}</span>
        </div>
    )
}

export default VerticalInfoDescription
