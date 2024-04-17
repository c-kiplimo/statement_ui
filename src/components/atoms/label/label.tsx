import Link from "next/link";
import React from "react";

type LabelProps = {
  className?: string;
  htmlFor: string;
  label: string;
  link?: string;
  style?: React.CSSProperties;
};
const Label: React.FC<LabelProps> = ({
  className,
  htmlFor,
  label,
  link,
  style,
}) => {
  return (
    <label htmlFor={htmlFor} className={className} style={style}>
      {label}
      <Link href="/authentication/signUp" className="text-gray-600">
        <span className="sign-up-check-box-nhif-link">{link}</span>
      </Link>
    </label>
  );
};

type LabelDescProps = {
  className?: string;
  htmlFor: string;
  label: string;
  labelDesc?: string;
};


const LabelDesc: React.FC<LabelDescProps> = ({
  htmlFor,
  className,
  label,
  labelDesc,
}) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {label}
      <span className={className}>{labelDesc}</span>
    </label>
  );
};

export { Label, LabelDesc };
