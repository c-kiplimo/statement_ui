import React, { useEffect, useRef, useState } from "react";
import Texter from "@/src/components/atoms/text/texter";
import styles from "./onBoardingOtp.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import FormBuilder from "@/src/components/molecules/shared-features/form_builder";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { TokenPayload } from "@/src/types/auth.types";
import { User } from "@/src/types/user.type";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import OtpInput from "@/src/components/atoms/input/otp/otpInputContainer";
import { userDetails } from "@/src/services/auth-user-details";
import { onBoardingHandler } from "@/src/services/auth/onboarding.service";

const OnboardingOtp = () => {
  // const user_details = userDetails();
  // const firstName = user_details?.firstName;
  const [value, valueChanged] = useState("");
  const { onBoardingOtpService, verifyOnboardingOtpService } =
    onBoardingHandler();
  const { storeToken, getToken, getLoggedInUser } = AuthServiceProvider();
  const [myUser, setMyUser] = useState<User>();
  const [timer, timerChanged] = useState(300);
  const tokenColor = useTokens();
  const interValRef = useRef<number>(0);
  const router = useRouter();

  const onOtpSubmit = async (otp: string) => {
    if (!otp || otp.trim() === "") {
      notification.error({
        message: "Error",
        description: "Please enter the OTP.",
      });
      return;
    }
    const tokenPayload: TokenPayload | undefined = getToken();
    if (tokenPayload) {
      await verifyOnboardingOtpService(tokenPayload.accessToken, otp)
        .then((otpVerificationResponse) => {
          storeToken(otpVerificationResponse);
          notification.success({
            message: "OTP Verified",
            description: "Your OTP has been successfully verified.",
          });

          router.push("/statement/dashboard");
        })
        .catch((error) => {
          if (error.response.status == 400) {
            notification.error({
              message: error.response.data.error,
              description: error.response.data.error_description,
            });
          } else {
            notification.error({
              message: "Error",
              description:
                "An error occurred during OTP verification. Please try again.",
            });
          }
        });
    } else {
      notification.error({
        message: "Invalid Session",
        description: "The provided Session is Invalid. Please login again.",
      });
      router.push("/statement/sign-in");
    }
  };

  useEffect(() => {
    console.log("=====>" + JSON.stringify(getLoggedInUser()));
    setMyUser(getLoggedInUser);
  }, [myUser?.email]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onOtpSubmit(value);
  };

  const formatTime = (time: number) => {
    const secs = Math.floor(time) % 60;
    const mins = Math.floor(time / 60) % 60;
    return `${mins}:${secs}`;
  };

  const stopTimer = () => {
    window.clearInterval(interValRef.current);
  };

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [timer]);

  function resendOtp(event: React.MouseEvent<HTMLDivElement>): void {
    event.preventDefault();
    timerChanged(300);
    stopTimer();
    let token = getToken();
    if (token) {
      onBoardingOtpService(token?.accessToken);
    } else {
      notification.error({
        message: "Invalid Session",
        description: "The provided Session is Invalid. Please login again.",
      });
    }
  }

  return (
    <>
      <FormBuilder>
        <div className={styles.otpContainer}>
          <div className={styles.title}>
            <Texter className="h4b text-left" text="Enter OTP To Verify" />
          </div>
          <div className={styles.otpBody}>
            <div className={styles.otpPrompt}>
              <p className="bodyr">
                Please enter the verification code just sent to your email
                <span
                  className="otp-email-link-text bodyr"
                  style={{ margin: "5px" }}
                >
                  {myUser?.email}
                </span>
              </p>
            </div>
            <div className={styles.otpInput}>
              <OtpInput
                length={6}
                onChange={(e: string) => {
                  valueChanged(e);
                }}
              />
              <div className="otp-leading-text-description text-left">
                <p className="otp-leading-text-description text-left">
                  Didn’t get code?
                  <span className="otp-email-link-text" onClick={resendOtp}>
                    Send again
                  </span>
                </p>
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
          <div className={styles.button}>
            <button
              type="submit"
              onClick={handleSubmit}
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
      </FormBuilder>
    </>
  );
};

export default OnboardingOtp;
