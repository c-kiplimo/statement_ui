import { AppColorToken, FontType } from "@/src/types/context.types";
import React, { CSSProperties } from "react";

type ParagraphTextProps = {
  description: string;
  font: FontType;
  style: CSSProperties;
  color: AppColorToken;
};

const ReusableText = (props: ParagraphTextProps) => {
  return <p style={props.style}>{props.description}</p>;
};

export default ReusableText;
