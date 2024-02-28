import React from 'react';

const Text = ({ title, font, textcolor, lineHeight, className }: any) => {
  return (
    <>
      <h1
        style={{ fontSize: font, color: textcolor, lineHeight: lineHeight }}
        className={className}
      >
        {title}
      </h1>
    </>
  );
};

type CustomTextProps = {
  title: string;
  fontSize: string;
  textColor: string;
  lineHeight: string;
  fontWeight: number;
  className: string;
};

const CustomText = (props: CustomTextProps) => {
  return (
    <>
      <h1
        style={{
          fontSize: props.fontSize,
          color: props.textColor,
          lineHeight: props.lineHeight,
          fontWeight: props.fontWeight,
        }}
        className={props.className}
      >
        {props.title}
      </h1>
    </>
  );
};

const TextDescription = ({
  title,
  font,
  textcolor,
  lineHeight,
  className,
}: any) => {
  return (
    <>
      <h1
        style={{ fontSize: font, color: textcolor, lineHeight: lineHeight }}
        className={className}
      >
        {title}
        <span className="customer-profile-text-description--learn-more-link">
          Learn more.
        </span>
      </h1>
    </>
  );
};

export { TextDescription, Text, CustomText };
