import React from 'react';

type CustomerOnboardingButtonProps = {
  ButtonStyles?: any;
  onClick?: () => void;
  href?: string;
  leftIcon?: any;
  height?: string;
  width?: string;
  textColor?: string;
  rightIcon?: any;
  buttonText?: string;
  buttonDescription?: string;
  primaryColor?: string;
  secondaryColor?: string;
  descriptionColor?: string;
  borderSecondaryColor?: string;
  defaultWhitColor?: string;
  iconColor?: string;
};

const CustomerOnboardingButton = ({
  ButtonStyles,
  onClick,
  href,
  leftIcon,
  height,
  width,
  textColor,
  rightIcon,
  buttonText,
  buttonDescription,
  primaryColor,
  secondaryColor,
  descriptionColor,
  borderSecondaryColor,
  defaultWhitColor,
  iconColor,
}: CustomerOnboardingButtonProps) => {
  return (
    <>
      <div
        onClick={onClick}
        style={{
          width: width,
          height: height,
          padding: '16px 24px',
          display: 'flex ',
          borderRadius: '3px',
          background: defaultWhitColor,
          boxShadow: '0px 2px 12px -2px rgba(26, 38, 0, 0.14)',
          border: `0.5px solid ${borderSecondaryColor}`,
        }}
        className="flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span className="mr-2">{leftIcon}</span>
          <div className="text-left">
            <div
              style={{
                color: textColor,
                fontFamily: 'Roboto',
                fontStyle: 'normal',

                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '25.5px',
              }}
            >
              {buttonText}
            </div>
            <span
              style={{
                color: secondaryColor,
                fontFamily: 'Roboto',
                fontSize: '12.85px',
                fontStyle: 'normal',
                fontWeight: '300',
                lineHeight:
                  '16                                                                                                                                                                                                        px',
              }}
            >
              {buttonDescription}
            </span>
          </div>
        </div>

        <span className=" text-right">{rightIcon}</span>
      </div>
    </>
  );
};

export default CustomerOnboardingButton;
