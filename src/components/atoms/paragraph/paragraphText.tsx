import React, { CSSProperties } from "react";

type ParagraphTextProps = {
  description: string;
  styles: CSSProperties;
};
const ParagraphText = (props: ParagraphTextProps) => {
  return <p style={props.styles}>{props.description}</p>;
};

export default ParagraphText;
