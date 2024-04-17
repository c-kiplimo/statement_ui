import React, { CSSProperties } from "react";

type TexterProps = {
  className: string;
  text: string;
  textStyle?: CSSProperties;
};

const Texter = ({ className, text, textStyle }: TexterProps) => {
  return (
    <p className={className} style={textStyle}>
      {text}
    </p>
  );
};

export default Texter;
