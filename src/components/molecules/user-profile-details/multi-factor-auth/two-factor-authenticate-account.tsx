import React from "react";
import { AppColorToken, FontType } from "@/src/types/context.types";
import TwoFactorOtpCard from "./two-factor-otp";

type AuthenticatorFormProps = {
  title: string;
  description: string;
  font: FontType;
  token: AppColorToken;
  onOtpSubmit: () => void;
  backClicked: (event: React.MouseEvent<HTMLElement>) => void;
};

const TwoFactorAuthenticateAccount = (props: AuthenticatorFormProps) => {
  return (
    <div className="text-center">
      <h1
        style={{
          color: props.token.text.primary,
          ...props.font.typography.h5?.medium,
        }}
        className="otp-title-text text-left"
      >
        {props.title}
      </h1>
      <p className="otp-leading-text-description my-8 text-left">
        {props.description}
      </p>
      <div className="space-y-5">
        <TwoFactorOtpCard
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            props.backClicked(event);
          }}
        />
      </div>
    </div>
  );
};

export default TwoFactorAuthenticateAccount;
