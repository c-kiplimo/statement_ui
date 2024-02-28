import React, { CSSProperties } from "react";
import { CoreProps, FontProperties } from "@/src/types/context.types";
import styles from "./statement.account.module.css";

interface CardHeaderDetailsProps {
  title?: string;
  description?: string;
  coreProps: CoreProps;
  borderBottom?: string;
  paddingBottom?: string;
}

const CardHeader = (props: CardHeaderDetailsProps) => {
  const token = props.coreProps.colorToken;
  const font = props.coreProps.font;

  const {
    title = "Meraki Systems - Accounts",
    description = "Check and configure all accounts to be accessed by Simba Portal",
  } = props;

  return (
    <div className={styles.statementCardHeader}>
      <TextLabel
        description={title}
        style={{
          fontProp: font.typography.h6?.bold,
          color: token.brand.secondary,
        }}
      />
      <TextLabel
        description={description}
        style={{
          fontProp: font.typography.caption?.light,
          color: token.text.secondary,
        }}
      />
    </div>
  );
};

const TextLabel = (props: {
  description: string;
  style: {
    fontProp?: FontProperties;
    color: string;
  };
}) => {
  return (
    <div
      style={{
        ...props.style.fontProp,
        color: props.style.color,
      }}
    >
      {props.description}
    </div>
  );
};

export default CardHeader;
