import React from "react";

type SvgIconProps = {
  width: number;
  height: number;
  fillColor: string;
};

const CustomSvgIcon: React.FC<SvgIconProps> = ({
  width,
  height,
  fillColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect width="16" height="16" rx="6" fill={fillColor} />
      <path
        d="M12.385 2.19231L12.3939 2.18846H12.3983L8 0L3.60388 2.18846H3.59945L3.61498 2.19423L0 4V12L8 16L16 12V4L12.385 2.19231ZM7.34979 14.3769L4.1742 12.7885V10.1038L1.2982 8.68846V5.325L7.34979 8.35V14.3769ZM1.92399 4.33654L4.91318 2.84038L7.99556 4.37308L11.0824 2.83654L14.0827 4.33654L8.00444 7.375L1.92399 4.33654ZM14.7018 8.69808L11.8436 10.1038V12.7788L8.65021 14.375V8.35385L14.7018 5.32885V8.69808Z"
        fill="#151E00"
      />
    </svg>
  );
};

export default CustomSvgIcon;
