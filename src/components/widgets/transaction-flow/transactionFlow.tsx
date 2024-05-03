import React, { CSSProperties, ReactNode } from "react";
import styles from "./transactionflow.module.css";
import { Flex, Progress } from "antd";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";

type TransactionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  percentage?: number;
  strokeColor?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const TransactionCard = (props: TransactionProps) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.info}>
        <TransactionCard.Icon icon={props.icon} iconStyle={{background:props.strokeColor}}/>
        <TransactionCard.Text
          title={props.title}
          titleStyle={{
            gap: "8px",
            fontWeight: "400",
            fontSize: "16px",
            color: "#6F7269",
            lineHeight: "24px",
          }}
          description={props.description}
          descriptionStyle={{
            gap: "8px",
            fontWeight: "500",
            fontSize: "20px",
            color: "#151e00",
            lineHeight: "32px",
          }}
        />
      </div>
      <TransactionCard.Progress
        percentage={props.percentage}
        strokeColor={props.strokeColor}
      />
    </div>
  );
};

export default TransactionCard;

type iconProps = {
  icon: ReactNode;
  iconStyle?: CSSProperties;
};
TransactionCard.Icon = (props: iconProps) => {
  return (
    <div className={styles.icon} style={props.iconStyle}>
      {props.icon}
    </div>
  );
};

type textProps = {
  title: string;
  description: string;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
};

TransactionCard.Text = (props: textProps) => {
  return (
    <div className={styles.text}>
      <VerticalInfoDescription
        title={props.title}
        description={props.description}
        titleStyle={props.titleStyle}
        descriptionStyle={props.descriptionStyle}
      />
    </div>
  );
};

type progressProps = {
  percentage?: number;
  strokeColor?: string;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
};
TransactionCard.Progress = (props: progressProps) => {
  return (
    <div className={styles.progress}>
      <Flex vertical>
        <Progress
          percent={props.percentage}
          strokeColor={props.strokeColor}
          status="active"
        />
      </Flex>
    </div>
  );
};
