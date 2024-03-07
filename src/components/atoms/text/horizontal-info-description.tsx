import React, { CSSProperties } from "react";
import styles from "./horizontal-info-description.module.css";

type HorizontalInfoDescriptionType = {
  title?: String;
  description?: String;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
};
const HorizontalInfoDescription = (props: HorizontalInfoDescriptionType) => {
  return (
    <div className={styles.container}>
      <span className={`${styles.title} captionr`} style={props.titleStyle}>
        {props.title}
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

export default HorizontalInfoDescription;
