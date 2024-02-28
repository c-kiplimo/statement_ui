import { FontType, AppColorToken } from "@/src/types/context.types";
import { CSSProperties } from "react";

import { Text } from "./text";

const InfoTitle = (props: {
  font?: FontType;
  color?: AppColorToken;
  title: string;
  description: string;
}) => {
  const flexContainerStyles: any = {
    display: "flex",
    gap: "1rem",
    padding: "0.3rem",
  };

  const titleStyles: CSSProperties = {
    ...props.font?.typography.h5?.bold,
    color: props.color?.brand.primary,
    minWidth: "120px",
    maxWidth: "120px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };

  const descriptionStyles: CSSProperties = {
    ...props.font?.typography.h6?.bold,
    color: props.color?.text.secondary,
  };

  return (
    <div style={flexContainerStyles}>
      <Text style={titleStyles}>{props.title + " :"}</Text>
      <Text style={descriptionStyles}>{props.description}</Text>
    </div>
  );
};

export default InfoTitle;
