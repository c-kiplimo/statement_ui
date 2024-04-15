import React from 'react';

interface CustomButtonProps {
  text: string;
  icon?: React.ReactElement;
  bgColor?: string;
  textColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?:"button" | "reset" | "submit" | undefined,
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  bgColor = 'blue',
  textColor = 'white',
  onClick,
  disabled = false,
  className,
  style,
  type
}) => {
  return (
    <button
      className={`w-full py-2 rounded cursor-pointer ${className || ''}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default CustomButton;
