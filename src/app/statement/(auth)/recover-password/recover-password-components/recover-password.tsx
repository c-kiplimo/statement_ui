import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./recover-password.module.css";
import Texter from "@/src/components/atoms/text/texter";
import CustomButton from "@/src/components/atoms/button/customButton";
import { resetPasswordHandler } from "@/src/services/auth/reset-password";
import { useRouter } from "next/navigation";
import { Form, Input, Modal, Radio, notification } from "antd";
import {
  MyFormItem,
  MyFormItemGroup,
} from "@/src/components/molecules/shared-features/form_builder_component";
import OtpInput from "@/src/components/atoms/input/otp/otpInputContainer";
import { useTokens } from "@/src/app/(context)/ColorContext";

const RecoverPassword = () => {
  const tokenColor = useTokens();
  const [value, valueChanged] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(2);
  const router = useRouter();

  const { resetPasswordService, validateOtpService } = resetPasswordHandler();

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRedirect = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      router.replace("/statement/sign-in");
    }, 120);
  };

  const onFinish = async (values: any) => {
    const response = await resetPasswordService(email);
    console.log("response", response);
    const userId = response.userId;
    localStorage.setItem("userId", userId);
    console.log("userId", userId);
    setUserId(userId);
    openModalHandler();
  };

  const onOtpSubmit = async () => {
    await validateOtpService(value, userId);
    router.push("/statement/create-new-password");
  };

  const [timer, timerChanged] = useState(120);

  const interValRef = useRef<number>(0);

  const formatTime = (time: number) => {
    const secs = Math.floor(time) % 60;
    const mins = Math.floor(time / 60) % 60;
    return `${mins}:${secs}`;
  };

  const stopTimer = () => {
    window.clearInterval(interValRef.current);
  };

  function resendOtp(event: React.MouseEvent<HTMLDivElement>): void {
    event.preventDefault();
    timerChanged(120);
    stopTimer();
    notification.info({
      message: "OTP Resent",
      description:
        "A new OTP has been sent to your email. Please check your email.",
    });
  }

  const maskEmail = (email: string) => {
    const [localPart, domainPart] = email.split("@");
    const maskedLocalPart =
      localPart.slice(0, 4) + "*".repeat(Math.max(localPart.length - 4, 0));
    return `${maskedLocalPart}@${domainPart}`;
  };

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [timer]);

  useEffect(() => {
    if (value.length === 6) {
      onOtpSubmit();
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <Texter text="Reset Password" className={`${styles.title} h3b`} />
          <Texter
            text="We will send you one time password to verify your account"
            className={`${styles.titleDesc} bodyr`}
          />
        </div>
        <Form
          onFinish={onFinish}
          style={{ width: "100%" }}
          name="sign"
          layout="vertical"
        >
          <Form.Item className={styles.radioForm}>
            <Texter
              text="Where do you want your OTP notification delivered?"
              className={`${styles.radioDesc} bodyr`}
            />
            <Radio.Group
              name="radiogroup"
              className={styles.radio}
              defaultValue={2}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <Radio value={1} className={`${styles.radioBtn} bodyr`}>
                Phone Number
              </Radio>
              <Radio value={2} className={`${styles.radioBtn} bodyr`}>
                Email
              </Radio>
            </Radio.Group>
          </Form.Item>
          {deliveryMethod === 1 && (
            <Form.Item
              className={`${styles.email} bodyr`}
              label="Your phone number"
            >
              <Input
                className={`${styles.input} bodyr`}
                type="phone"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Enter your phone number"
                required={true}
              />
            </Form.Item>
          )}
          {deliveryMethod === 2 && (
            <Form.Item className={`${styles.email} bodyr`} label="Your email">
              <Input
                className={`${styles.input} bodyr`}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required={true}
              />
            </Form.Item>
          )}

          <div className={styles.btn}>
            <CustomButton
              bgColor="var(--white)"
              textColor="var(--Text-Text-Description-01)"
              className={`${styles.backBtn} bodyr`}
              text="Back"
              onClick={() => router.push("statement/sign-in")}
            />
            <CustomButton
              bgColor="var(--brand-brand-primary)"
              type="submit"
              className={`${styles.searchBtn}`}
              text="Reset Password"
            />
          </div>
        </Form>
        {showModal && (
          <Modal
            open={showModal}
            onCancel={closeModal}
            footer={null}
            className={styles.modal}
          >
            <div className={styles.otpContainer}>
              <div className={styles.otpTitle}>
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
                      {maskEmail(email)}
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
                  className=" mt-5 w-52 text-left"
                >
                  Time Remaining :{" "}
                  <strong style={{ color: tokenColor.default.black }}>
                    {formatTime(timer)}
                  </strong>
                </p>
              </div>

              <div className={styles.button}>
                <button
                  type="submit"
                  onClick={onOtpSubmit}
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
          </Modal>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;

type IconProps = {
  icon: ReactNode;
};
RecoverPassword.Icon = ({ icon }: IconProps) => {
  return <div className={styles.icon}>{icon}</div>;
};
