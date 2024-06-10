import { authServiceHandler } from "@/src/services/auth/auth.service";
import OTPInputContainer from "@/src/components/atoms/input/otp/otpInputContainer";
import { useTokens } from "@/src/app/(context)/ColorContext";
import FormBuilder from "@/src/components/molecules/shared-features/form_builder";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { TokenPayload } from "@/src/types/auth.types";
import { User } from "@/src/types/user.type";
import { Button } from "antd";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type OtpVerifytProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function OtpVerifyHelper(props: OtpVerifytProps) {
  const [value, valueChanged] = useState("");
  const [myUser, setMyUser] = useState<User>();
  const [timer, timerChanged] = useState(300);
  const interValRef = useRef<number>(0);

  const tokenColor = useTokens();
  const router = useRouter();

  const { storeToken, getToken, getLoggedInUser } = AuthServiceProvider();
  const { requestOtpService, verifyOtpService } = authServiceHandler();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onOtpSubmit(value);
  };

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
      await verifyOtpService(tokenPayload.accessToken, otp)
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
      router.push("/statement/authentication/signIn");
    }
  };

  function resendOtp(event: React.MouseEvent<HTMLDivElement>): void {
    event.preventDefault();
    timerChanged(300);
    stopTimer();
    let token = getToken();
    if (token) {
      requestOtpService(token?.accessToken);
    } else {
      notification.error({
        message: "Invalid Session",
        description: "The provided Session is Invalid. Please login again.",
      });
      router.push("/statement/authentication/signIn");
    }
  }

  const formatTime = (time: number) => {
    const secs = Math.floor(time) % 60;
    const mins = Math.floor(time / 60) % 60;
    return `${mins}:${secs}`;
  };

  const stopTimer = () => {
    window.clearInterval(interValRef.current);
  };

  useEffect(() => {
    console.log("=====>" + JSON.stringify(getLoggedInUser()));
    setMyUser(getLoggedInUser);
  }, [myUser?.email]);

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [timer]);

  return (
    <FormBuilder>
      <div className="text-center">
        <h1 className="otp-title-text text-left">Enter OTP to verify</h1>
        <div className="otp-leading-text-description my-8 text-left">
          Please enter the verification code just sent to your email
          <span className="otp-email-link-text" style={{ margin: "5px" }}>
            <span>{myUser?.email}</span>
          </span>
        </div>
        <div className="space-y-5">
          <OTPInputContainer
            length={6}
            // value={value}
            onChange={(e: string) => {
              valueChanged(e);
            }}
          />
        </div>

        <div className="otp-leading-text-description text-left">
          Didn’t get code?
          <div className="otp-email-link-text">
            <span style={{ color: tokenColor.accent.info }} onClick={resendOtp}>
              Send again
            </span>
          </div>
        </div>

        <p
          style={{ color: tokenColor.text.description_01 }}
          className=" mt-5 w-52 text-left"
        >
          Time Remaining :{" "}
          <strong style={{ color: tokenColor.default.black }}>
            {formatTime(timer)} minutes remaining
          </strong>
        </p>

        <div
          style={{ marginTop: "2rem", minWidth: "100%" }}
          className="digitGroup"
        >
          <Button
            style={{ padding: "0", color: tokenColor.text.description_01 }}
            type="link"
            onClick={() => router.back()}
          >
            Back
          </Button>

          <div
            style={{
              backgroundColor: tokenColor.default.white,
              minWidth: "100%",
            }}
          >
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </FormBuilder>
  );
}

export default OtpVerifyHelper;
