import React, { useEffect, useRef, useState } from "react";
import Texter from "@/src/components/atoms/text/texter";
import styles from "./onBoardingOtp.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import FormBuilder from "@/src/components/molecules/shared-features/form_builder";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { User } from "@/src/types/user.type";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import OtpInput from "@/src/components/atoms/input/otp/otpInputContainer";
import { SearchCustomerHandler } from "@/src/services/auth/searchCustomer.service";
import { useOnboardingContext } from "../../context/onBoardingContext";
import { CreateProfileHandler } from "@/src/services/auth/createProfile.service";
import { storeProfile } from "@/src/hooks/useProfileCreated";
import useUserSession from "@/src/hooks/useUserSession";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

let profileStatus: boolean;

type OtpProps ={
  selectedOption:string | null;
}

const OnboardingOtp = ({selectedOption}:OtpProps) => {
  const [value, valueChanged] = useState("");
  const [myUser, setMyUser] = useState<User>();
  const [timer, timerChanged] = useState(300);
  const tokenColor = useTokens();
  const interValRef = useRef<number>();
  const router = useRouter();
  const { getToken, getLoggedInUser } = AuthServiceProvider();
  const { onBoardingOtpService, validateOtpService } = SearchCustomerHandler();
  const { CreateProfileService } = CreateProfileHandler();
  const { profile } = useOnboardingContext();
  const { accessToken } = useUserSession();

  const handleSubmit = async () => {
    if (!value) return;
    const tokenData = getToken();
    if (!tokenData) {
      notification.error({
        message: "Token data is missing. Please try again.",
        description: '',
        icon: <CloseCircleOutlined style={{ color: "white" }} />,
        className: 'bodyr failure-notification', 
        placement: 'topRight',
        duration: 1,
      });
      return;
    }

    try {
      console.log("Submitting OTP:", value);
      const response = await validateOtpService(tokenData.accessToken, value);
      console.log("OTP Validation Response:", response);

      if (response) {
        notification.success({
          message: 'Your OTP has been successfully verified.',
          description: '',
          icon: <CheckCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr success-notification', 
          placement: 'topRight',
          duration: 1,
        });

        const createdProfile = {
          name: profile.customerName,
          customerId: profile.customerId,
          country: profile.country,
        };
        console.log("Customer profile:", createdProfile);

        const profileInfo = await CreateProfileService(
          createdProfile,
          tokenData.accessToken
        );
        console.log("Profile creation response:", profileInfo);

        storeProfile(profileInfo);
        
        notification.success({
          message: 'Your profile was successfully created.',
          description: '',
          icon: <CheckCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr success-notification', 
          placement: 'topRight',
          duration: 1,
        });
        router.replace("/statement/dashboard");
      } else {
        notification.error({
          message: 'The OTP entered is incorrect. Please try again.',
          description: '',
          icon: <CloseCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr failure-notification', 
          placement: 'topRight',
          duration: 1,
        });
      }
    } catch (error) {
      console.error("Profile creation failed:", error);
      notification.error({
        message: "An error occurred during profile creation. Please try again.",
        description: '',
        icon: <CloseCircleOutlined style={{ color: "white" }} />,
        className: 'bodyr failure-notification', 
        placement: 'topRight',
        duration: 1,
      });
      router.replace("/statement/sign-in");
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${Math.floor(time % 60)
      .toString()
      .padStart(2, "0")}`;

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

  const resendOtp = async () => {
    try {
      const response = await onBoardingOtpService(
        "EMAIL",
        accessToken!,
        myUser?.userName!,
        profile.email!
      );
      if (response) {
        notification.success({
          message: 'A new OTP has been sent to your email.',
          description: '',
          icon: <CheckCircleOutlined style={{ color: "green" }} />,
          className: 'success-notification', 
          placement: 'topRight',
          duration: 1,
        });
        timerChanged(300);
      } else {
        notification.error({
          message:"Failed to resend OTP. Please try again.",
          description: '',
          icon: <CloseCircleOutlined style={{ color: "red" }} />,
          className: 'failure-notification', 
          placement: 'topRight',
          duration: 1,
        });
      }
    } catch (error) {
      notification.error({
        message:"Failed to resend OTP. Please try again.",
        description: '',
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
        className: 'failure-notification', 
        placement: 'topRight',
        duration: 1,
      });
    }
  };

  useEffect(() => {
    if (value.length === 6) {
      handleSubmit();
    }
  }, [value]);

  return (
    <FormBuilder>
      <div className={styles.otpContainer}>
        {profileStatus}
        <div className={styles.title}>
          <Texter className="h4b text-left" text="Enter OTP To Verify" />
        </div>
        <div className={styles.otpBody}>
          <div className={styles.otpPrompt}>
          {selectedOption === "EMAIL"?(
              <p className="bodyr">
              Please enter the verification code just sent to your email
              <span
                className="otp-email-link-text bodyr"
                style={{ margin: "5px" }}
              >
                {profile?.email}
              </span>
            </p>
            ):
            (
              <p className="bodyr">
              Please enter the verification code just sent to your mobile number
              <span
                className="otp-email-link-text bodyr"
                style={{ margin: "5px" }}
              >
                {profile?.mobileNumber}
              </span>
            </p>
            )}  
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
  );
};

export default OnboardingOtp;
