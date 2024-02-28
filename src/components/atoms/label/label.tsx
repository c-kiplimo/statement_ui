import React from 'react';

type LabelProps = {
  htmlFor: string;
  label?: string;
  required?: boolean;
  additionalProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  marginBottom?: string;
};
const Label: React.FC<LabelProps> = ({
  htmlFor,
  label,
  required,
  style,
  children,
  marginBottom,
  ...additionalProps
}) => {
  return (
    <label htmlFor={htmlFor} {...additionalProps} style={style}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
