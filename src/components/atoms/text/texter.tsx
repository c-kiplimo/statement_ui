<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> c16cc33 (Removing commits)
import React, { CSSProperties } from "react";

type TexterProps = {
  className: string;
  text: string;
<<<<<<< HEAD
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
=======
  textStyle?: CSSProperties;
};

const Texter = ({ className, text, textStyle }: TexterProps) => {
  return (
    <p className={className} style={textStyle}>
      {text}
    </p>
>>>>>>> c16cc33 (Removing commits)
  );
};

export default Texter;
