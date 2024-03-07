import React, { CSSProperties, ReactNode } from "react";
import styles from "./summary-items.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import HorizontalInfoDescription from "../../atoms/text/horizontal-info-description";

type summaryProps = {
  svgIcon: ReactNode;
  svgIconStyle?: CSSProperties;
  summaryTitle: string;
  titleDescription: string;
  titleStyle?: CSSProperties;
  amount: string;
  amountStyle?: CSSProperties;
  svgIcons: ReactNode;
  svgIconsStyle?: CSSProperties;
  percentage: string;
  percentageStyle?: CSSProperties;
  date: string;
  dateStyle?: CSSProperties;
  onClick?: (e: any) => void;
};

const SummaryItem = (props: summaryProps) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            {props.svgIcon}
            <VerticalInfoDescription
              title={props.summaryTitle}
              description={props.titleDescription}
            />
          </div>
          <div className={styles.amount}>
            <VerticalInfoDescription
              title={props.amount}
              titleStyle={{ fontWeight: "700", fontSize: "20px" }}
            />
          </div>
        </div>
        <div className={styles.bodyContainer}>
          {props.svgIcons}
          <HorizontalInfoDescription
            title={props.percentage}
            description={props.date}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
