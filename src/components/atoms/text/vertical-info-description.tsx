import React, { CSSProperties } from "react";
import styles from "./vertical-info-description.module.css";

type VerticalInfoDescriptionType = {
  title: String;
  titleInfo?: String;
  subTitle?: String;
  description?: String;
  bodyStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  titleInfoStyle?: CSSProperties;
  subtitleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
};
const VerticalInfoDescription = (props: VerticalInfoDescriptionType) => {
  return (
    <div className={styles.container} style={props.bodyStyle}>
      <div className={styles.header}>
        <span className={`${styles.title} bodyr`} style={props.titleStyle}>
          {props.title}
        </span>
      </div>
      <span className={`bodyr`} style={props.titleInfoStyle}>
        {props.titleInfo}<span className={`bodyr`} style={props.subtitleStyle}>{props.subTitle}</span>
      </span>
      <span
        className={`${styles.description} captionr`}
        style={props.descriptionStyle}
      >
        {props.description}
      </span>
    </div>
  );
};

export default VerticalInfoDescription;
