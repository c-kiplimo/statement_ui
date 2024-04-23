import React from "react";
import { URL } from "url";
import Link from "next/link";

type LinkProps = {
  className?: string;
  linkClassName?: string;
  text: string;
  href?: string | URL;
  linkText?: string;
  textStyle?: React.CSSProperties;
  onClick?: () => void;
};

const TexterLink = ({
  className,
  linkClassName,
  text,
  href,
  linkText,
  textStyle,
  onClick,
}: LinkProps) => {
  return (
    <span className={className}>
      {text}
      {href ? (
        typeof href === "string" ? (
          <Link href={href} passHref>
            <span className={linkClassName} style={textStyle} onClick={onClick}>
              {linkText}
            </span>
          </Link>
        ) : (
          <Link href={href.toString()} passHref>
            <span className={linkClassName} style={textStyle}>
              {linkText}
            </span>
          </Link>
        )
      ) : null}
    </span>
  );
};

export default TexterLink;
