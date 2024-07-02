/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button, Form, Input, notification } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import Modal from "@/src/components/widgets/modals/modal";
import OTPInputContainer from "@/src/components/atoms/input/otp/otpInputContainer";
import { useRouter } from "next/navigation";
import { resetPasswordHandler } from "@/src/services/auth/reset-password";
import OtpInput from "@/src/components/atoms/input/otp/otpInputContainer";

const ResetPasswordHelper = () => {
  const tokenColor = useTokens();
  const [value, valueChanged] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { resetPasswordService, validateOtpService } = resetPasswordHandler();

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHanlder = () => {
    setShowModal(false);
  };

  const onFinish = async (values: any) => {
    const response = await resetPasswordService(email);
    console.log("response", response);
    const userId = response.userId;
    sessionStorage.setItem("userId", userId);
    console.log("userId", userId);
    setUserId(userId);
    openModalHandler();
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("otp", value);
    console.log("userId", userId);
    await validateOtpService(value, userId);
    router.push(
      "/statement/authentication/manage-password/create-new-password"
    );
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

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [timer]);
  return (
    <>
      <Form
        style={{ width: "100%" }}
        name="sign"
        layout="vertical"
        onFinish={onFinish}
      >
        <h1 className="create-new-password-text text-left">Reset password</h1>
        <p className="create-new-password-description my-8 text-left">
          We will send you a password reset link connected to your existing
          account
        </p>
        <MyFormItemGroup prefix={["city_gender"]}>
          <div className="space-y-5">
            <MyFormItem name="email" label="Your email">
              <Input
                className="black-placeholder"
                placeholder="Enter Your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </MyFormItem>
            <div className="flex gap-20">
              <Link href="/authentication/signIn">
                <Button
                  style={{
                    padding: "0",
                    color: tokenColor.default.black,
                  }}
                  type="link"
                >
                  Back
                </Button>
              </Link>

              <div style={{ width: "100%" }}>
                <Button
                  onClick={onFinish}
                  style={{
                    width: "100%",
                    color: tokenColor.default.white,
                    backgroundColor: "var(--brand-brand-primary)",
                    height: "42px",
                    cursor: "pointer",
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </MyFormItemGroup>
      </Form>

      <Modal isOpen={showModal} onDismiss={closeModalHanlder} title="">
        <div className="w-[695px] flex justify-center">
          <div style={{ width: "70%" }}>
            <div className="text-center">
              <h1 className="otp-title-text text-left">Enter OTP to verify</h1>
              <div className="otp-leading-text-description my-8 text-left">
                Please enter the verification code just sent to your email
                <span className="otp-email-link-text" style={{ margin: "5px" }}>
                  <Link href="#">abbymba@email.com</Link>
                </span>
              </div>
              <div className="space-y-5">
                <OtpInput
                  length={6}
                  onChange={(e: string) => {
                    valueChanged(e);
                  }}
                />
              </div>

              <div className="otp-leading-text-description text-left">
                Didn’t get code?
                <div className="otp-email-link-text">
                  <span
                    style={{ color: tokenColor.accent.info }}
                    onClick={resendOtp}
                  >
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
                  style={{
                    padding: "0",
                    color: tokenColor.text.description_01,
                  }}
                  type="link"
                  onClick={() => router.back()}
                >
                  Back
                </Button>

                <div
                  style={{
                    backgroundColor: tokenColor.default.white,
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
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResetPasswordHelper;
