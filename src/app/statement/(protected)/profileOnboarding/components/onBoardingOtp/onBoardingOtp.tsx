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
import { useProfile } from "../../../context/useProfileContext";

let profileStatus: boolean;

const OnboardingOtp = () => {
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

 const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  if (!value) return;
  const tokenData = getToken();
  if (!tokenData) {
    notification.error({
      message: "Error",
      description: "Token data is missing. Please try again.",
    });
    return;
  }

  try {
    const response = await validateOtpService(tokenData.accessToken, value);
    if (response) {
      notification.success({
        message: "OTP Verified",
        description: "Your OTP has been successfully verified.",
      });
    } else {
      notification.error({
        message: "OTP Verification Failed",
        description: "The OTP entered is incorrect. Please try again.",
      });
      return;
    }

    const createdProfile: ProfileCreation = {
      name: profile.customerName,
      customerId: profile.customerId,
      country: profile.country,
    };
    console.log("Customer profile>>",createdProfile)

    const profileInfo:CustomerProfile = await CreateProfileService(createdProfile,tokenData.accessToken);
    console.log("Profile creation response:", profileInfo);
    storeProfile(profileInfo);   
    notification.success({
      message: "Profile created",
      description: "Your profile was successfully created.",
    });
    router.push("/statement/dashboard");
  } catch (error) {
    console.error("Profile creation failed:", error);
    notification.error({
      message: "Profile Creation failed",
      description: "Your profile was not successfully created. Please try again.",
    });
    router.push("/statement/sign-in");
  }
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
    console.log("Logged in User ==>" + JSON.stringify(getLoggedInUser()));
    let data = getLoggedInUser();
    profileStatus = data.profileComplete!;
    setMyUser(getLoggedInUser());
  }, [myUser?.email]);

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [timer]);

  // const resendOtp = async () => {
  //   try {
  //     const response = await onBoardingOtpService("EMAIL", accessToken!, user.id!);
  //     if (response) {
  //       notification.success({
  //         message: "OTP Resent",
  //         description: "A new OTP has been sent to your email.",
  //       });
  //       timerChanged(300);
  //     } else {
  //       notification.error({
  //         message: "Error",
  //         description: "Failed to resend OTP. Please try again.",
  //       });
  //     }
  //   } catch (error) {
  //     notification.error({
  //       message: "Error",
  //       description: "Failed to resend OTP. Please try again.",
  //     });
  //   }
  // }

  return (
    <>
      <FormBuilder>
        <div className={styles.otpContainer}>
          {profileStatus}
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
                  {profile?.email}
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
                  <span
                    className="otp-email-link-text"
                    //  onClick={resendOtp}
                  >
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
