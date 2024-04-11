import React, { useEffect, useRef, useState } from "react";
import { userDetails } from "@/src/services/auth-user-details";
import Texter from "@/src/components/atoms/text/texter";
import styles from "./enter_otp_to_verify.module.css";
import OtpInput from "../../atoms/input/otp/otpInputContainer";
import { useTokens } from "@/src/app/(context)/ColorContext";
import FormBuilder from "@/src/components/molecules/shared-features/form_builder";
import Link from "next/link";

const EnterOtpToVerify = () => {
  const user_details = userDetails();
  const firstName = user_details?.firstName;
  const [otpValue, setOtpValue] = useState("");
  const [timer, setTimer] = useState(300);
  const tokenColor = useTokens();
  const interValRef = useRef<number>();

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => clearInterval(interValRef.current);
  }, []);

  const handleOtpResend = () => {
    setTimer(300);
    clearInterval(interValRef.current);
  };

  const formatTime = (time: number) => {
    const secs = Math.floor(time) % 60;
    const mins = Math.floor(time / 60) % 60;
    return `${mins}:${secs}`;
  };

  const handleOtpComplete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpValue }),
      });

      if (response.ok) {
        console.log("OTP verification successful");
      } else {
        console.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleOtpChange = (otp: string) => {
    setOtpValue(otp);
  };

  return (
    <>
      <FormBuilder>
        <div className={styles.otpContainer}>
          <div className={styles.title}>
            <Texter className="h4b text-left" text="Enter OTP to verify" />
          </div>

          <div className={styles.otpBody}>
            <div className={styles.otpPrompt}>
              <Texter
                text="Please enter the verification code just sent to your email"
                className={"otp-leading-text-description"}
              />
              <span className="otp-email-link-text" style={{ margin: "5px" }}>
                <Link href="#">{firstName}</Link>
              </span>
            </div>
            <div className={styles.otpInput}>
              <OtpInput length={6} onChange={handleOtpChange} />
              <div className="otp-leading-text-description text-left">
                <Texter
                  text="Didn’t get code?"
                  className={"otp-leading-text-description text-left"}
                />
                <div className="otp-email-link-text">
                  <span
                    style={{ color: tokenColor.accent.info, cursor: "pointer" }}
                    onClick={handleOtpResend}
                  >
                    Send again
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.timer}>
            <p
              style={{ color: tokenColor.text.description_01 }}
              className="mt-5 w-52 text-left"
            >
              Time Remaining:{" "}
              <strong style={{ color: tokenColor.default.black }}>
                {formatTime(timer)}
              </strong>
            </p>
          </div>

          <div
            style={{ marginTop: "2rem", minWidth: "100%" }}
            className="digitGroup"
          >
            <div
              style={{
                backgroundColor: tokenColor.default.white,
                minWidth: "100%",
              }}
            >
              <button
                type="submit"
                onClick={handleOtpComplete}
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  minWidth: "250px",
                  color: tokenColor.default.white,
                  backgroundColor: "var(--brand-brand-primary)",
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </FormBuilder>
    </>
  );
};

export default EnterOtpToVerify;
