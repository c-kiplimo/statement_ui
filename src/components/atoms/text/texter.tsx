import Link from "next/link";
import React, { CSSProperties } from "react";

type TexterProps = {
  className: string;
  text: string;
  href?: string;
  linkText?: string;
  textStyle?: CSSProperties;
};

const Texter = ({
  className,
  text,
  href,
  linkText,
  textStyle,
}: TexterProps) => {
  return (
    <>
      <p className={className} style={textStyle}>
        {text}
        {href && linkText && (
          <Link href={href} className="otp-email-link-text">
            <span>{linkText}</span>
          </Link>
        )}
      </p>
    </>
  );
};

export default Texter;
