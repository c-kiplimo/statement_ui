import React, { CSSProperties, useState } from "react";
import styles from "./cashFlowCard.module.css";
import HorizontalInfoDescription from "../../atoms/text/horizontal-info-description";
import { Button } from "antd";
import { Text } from "../../atoms/text/text";

type CashFlowCardProps = {
  title: string;
  buttonProps: CustomButtonProps[];
  texts: { text: string; textInfo: string }[];
};

const CashFlowCard = (props: CashFlowCardProps) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  );
  const [activeTextIndex, setActiveTextIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  const handleTextClick = (index: number) => {
    setActiveTextIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CashFlowCard.Header
          title={props.title}
          titleStyle={{ fontWeight: "700", fontSize: "20px" }}
        />
        <CashFlowCard.Button
          buttons={props.buttonProps}
          activeButtonIndex={activeButtonIndex}
          onButtonClick={handleButtonClick}
        />
      </div>
      {props.texts.map((textData, index) => (
        <CashFlowCard.Text
          key={index}
          text={textData.text}
          textStyle={{
            fontWeight: "400",
            fontSize: "16px",
            color: "#6F7269",
            lineHeight: "24px",
          }}
          textInfo={textData.textInfo}
          textInfoStyle={{
            fontWeight: "500",
            fontSize: "16px",
            color: "#151E00",
            lineHeight: "24px",
          }}
          active={activeTextIndex === index}
          onClick={() => handleTextClick(index)}
        />
      ))}
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

type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

type CustomButtonProps = ButtonProps & { customStyle?: CSSProperties };

type ButtonComponentProps = {
  buttons: CustomButtonProps[];
  activeButtonIndex: number | null;
  onButtonClick: (index: number) => void;
};

CashFlowCard.Button = ({
  buttons,
  activeButtonIndex,
  onButtonClick,
}: ButtonComponentProps) => {
  return (
    <div className={styles.button}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          className={button.className}
          onClick={() => onButtonClick(index)}
          size="small"
          style={{
            ...button.customStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              activeButtonIndex === index ? "#F5F5F5" : "#ffffff",
            color: "#6F7269",
            border: "none",
            borderRadius: "4px",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

type TextProps = {
  text: string;
  textInfo: string;
  textStyle?: CSSProperties;
  textInfoStyle?: CSSProperties;
  active: boolean;
  onClick: () => void;
};

CashFlowCard.Text = (props: TextProps) => {
  const containerStyle: CSSProperties = {
    backgroundColor: props.active ? "#F9FAF7" : "transparent",
    padding: "16px",
    borderRadius: "8px",
    width: "465px",
    height: "56px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <div className={styles.text} style={containerStyle} onClick={props.onClick}>
      <div className={styles.title}>
        <Text children={props.text} style={props.textStyle} />
      </div>
      <div className={styles.title}>
        <Text children={props.textInfo} style={props.textInfoStyle} />
      </div>
    </div>
  );
};
