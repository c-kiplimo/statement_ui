import styles from "./card.header.m1.module.css"


export interface CardProps {
    title: string;
    description:string,
    content?: string;
    additonalContent?: string;
    icon?: React.ReactElement;
    style?: React.CSSProperties;
  }

const CardHeaderM1 =({icon,title,description,style}:CardProps)=>{
    return (
        <div className={styles.container} style={{...style}}>
            <div className={styles.iconBody}>
                {icon}
            </div>
        <div>
            <p className={styles.titleText}>{title}</p>
            <p className={styles.description}>{description}</p>
       </div>
      
      </div>
    )
}

export default CardHeaderM1;