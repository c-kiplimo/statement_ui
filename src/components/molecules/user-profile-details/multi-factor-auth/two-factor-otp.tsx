"use client";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";
import OTPInputContainer from "@/src/components/atoms/input/otp/otpInputContainer";

type TwoFactorOtpInputProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const TwoFactorOtpCard = (props: TwoFactorOtpInputProps) => {
  const [value, valueChanged] = useState("");

  const [timer, timerChanged] = useState(300);

  const interValRef = useRef<number>(0);

  const token = useTokens();

  const stopTimer = () => {
    window.clearInterval(interValRef.current);
  };

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged(timer - 1);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, [timer]);

  const formatTime = (time: number) => {
    const secs = Math.floor(time) % 60;
    const mins = Math.floor(time / 60) % 60;
    return `${mins}:${secs}`;
  };

  function resendOtp(event: React.MouseEvent<HTMLDivElement>): void {
    console.log("resend the otp");
  }

  const handleSubmit = () => {};

  return (
    <div style={{ width: "30%" }}>
      <div
        style={{ width: "60px" }}
        id="OTPInputGroup"
        className="digitGroup"
        data-autosubmit="true"
      >
        <OTPInputContainer
          valueLength={4}
          value={value}
          onChange={(e: string) => {
            valueChanged(e);
          }}
        />
      </div>

      <p className="otp-leading-text-description text-left">
        Didn’t get code?
        <span className="otp-email-link-text">
          <div style={{ color: token.accent.info }} onClick={resendOtp}>
            Send again
          </div>
        </span>
      </p>

      <p
        style={{ color: token.text.description_01 }}
        className=" mt-5 w-52 text-left"
      >
        Time Remaining :{" "}
        <strong style={{ color: token.default.black }}>
          {formatTime(timer)} minutes remaining
        </strong>
      </p>

      <div
        style={{ marginTop: "2rem", minWidth: "100%" }}
        className="digitGroup"
      >
        <Button
          style={{ padding: "0", color: token.text.description_01 }}
          type="link"
          onClick={(event) => {
            props.onClick(event);
          }}
        >
          Back
        </Button>

        <div style={{ backgroundColor: token.default.white, minWidth: "100%" }}>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              height: "40px",
              borderRadius: "5px",
              minWidth: "250px",
              color: token.default.white,
              backgroundColor: "var(--brand-brand-primary)",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorOtpCard;
