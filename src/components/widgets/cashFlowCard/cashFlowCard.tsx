import React, { CSSProperties, useState } from "react";
import styles from "./cashFlowCard.module.css";
import HorizontalInfoDescription from "../../atoms/text/horizontal-info-description";
import { Button } from "antd";
import classNames from "classnames";
import { Text } from "../../atoms/text/text";

type CashFlowCardProps = {
  title: string;
  buttons: { label: string }[];
  onButtonClick: (label: string) => void;
  texts: { text: string; textInfo: string }[];
};

const cx = classNames.bind(styles);

const CashFlowCard = (props: CashFlowCardProps) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (label: string) => {
    setActiveButton(label);
    props.onButtonClick(label);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CashFlowCard.Header
          title={props.title}
          titleStyle={{ fontWeight: "700", fontSize: "20px" }}
        />
        <CashFlowCard.Button
          buttons={props.buttons}
          onButtonClick={handleButtonClick}
          activeButton={activeButton}
        />
      </div>
      <CashFlowCard.Text
        texts={props.texts}
        activeButton={activeButton}
        textStyle={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#6F7269",
          lineHeight: "24px",
        }}
        textInfoStyle={{
          fontWeight: "500",
          fontSize: "16px",
          color: "#151E00",
          lineHeight: "24px",
        }}
      />
    </div>
  );
};

export default CashFlowCard;

type HeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
};

CashFlowCard.Header = (props: HeaderProps) => {
  return (
    <div className={styles.headerTitle}>
      <HorizontalInfoDescription
        title={props.title}
        titleStyle={props.titleStyle}
      />
    </div>
  );
};

type ButtonComponentProps = {
  buttons: { label: string }[];
  onButtonClick: (label: string) => void;
  activeButton: string | null;
};

CashFlowCard.Button = ({
  buttons,
  onButtonClick,
  activeButton,
}: ButtonComponentProps) => {
  return (
    <div className={styles.btnContainer}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          type="text"    
          style={{
            border: "none",
            backgroundColor:
              button.label === activeButton ? "#f5f5f5" : "#ffffff",
          }}
          onClick={() => onButtonClick(button.label)}
          size="small"
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

type TextProps = {
  texts: { text: string; textInfo: string }[];
  activeButton: string | null;
  textStyle?: CSSProperties;
  textInfoStyle?: CSSProperties;
};

CashFlowCard.Text = (props: TextProps) => {
  const [isActive, setIsActive] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setIsActive(index === isActive ? null : index);
  };

  return (
    <div className={styles.text}>
      {props.activeButton &&
        props.texts.map((item, index) => (
          <div
            key={index}
            className={cx(styles.title, {
              [styles.titleActive]: index === isActive,
            })}
            onClick={() => handleClick(index)}
          >
            <Text children={item.text} style={props.textStyle} />
            <Text children={item.textInfo} style={props.textInfoStyle} />
          </div>
        ))}
    </div>
  );
};
