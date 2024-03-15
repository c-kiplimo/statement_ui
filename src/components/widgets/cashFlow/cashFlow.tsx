import React, { CSSProperties, ReactNode, useState } from "react";
import styles from "./cashFlow.module.css";
import ImageIcon from "../../atoms/imageIcon/imageIcon";
import { Text } from "../../atoms/text/text";

type CashFlowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  borderColor?: string;
};

function CashFlow(props: CashFlowProps) {
  const [selectedValue, setSelectedValue] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedValue(!selectedValue);
    props.onClick?.(event);
  };

  console.log("Border Color:", props.borderColor);
  return (
    <div
      className={styles.container}
      onClick={handleClick}
      style={{ borderColor: selectedValue ? props.borderColor : "var(--grey)" }}
    >
      
        <CashFlow.Icon icon={props.icon} iconStyle={{ color: "white" }} />
      
      <CashFlow.Info
        title={props.title}
        titleStyle={{ fontWeight: "400", fontSize: "16px", color: "#6F7269" }}
        description={props.description}
        descriptionStyle={{
          fontWeight: "500",
          fontSize: "20px",
          color: "#151E00",
        }}
      />
    </div>
  );
}

export default CashFlow;

type CashFlowIconProps = {
  icon: ReactNode;
  iconStyle?: CSSProperties;
};
CashFlow.Icon = (props: CashFlowIconProps) => {
  return (
    <div className={styles.icon} style={props.iconStyle}>
      {props.icon}
    </div>
  );
};

type CashFlowInfoProps = {
  title: string;
  description: string;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
};
CashFlow.Info = (props: CashFlowInfoProps) => {
  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <Text children={props.title} style={props.titleStyle} />
      </div>
      <div className={styles.description}>
        <Text children={props.description} style={props.descriptionStyle} />
      </div>
    </div>
  );
};
