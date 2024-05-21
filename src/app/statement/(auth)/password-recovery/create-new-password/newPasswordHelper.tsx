"use client";

import { resetPasswordHandler } from "@/src/services/auth/reset-password";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import {Checkbox, Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./newPasswordHelper.module.css";
import Link from "next/link";
import Texter from "@/src/components/atoms/text/texter";

const NewPasswordHelper = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { setNewPasswordService } = resetPasswordHandler();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword || !confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword || !password);
  };

  const onFinish = async (values: any) => {
    const userId = sessionStorage.getItem("userId");

    if (userId) {
      try {
        const response = await setNewPasswordService(password, userId);
        console.log("response", response);
        notification.success({
          message: "Success",
          description: "Password updated successfully.",
        });
        router.push("/statement/sign-in");
      } catch (error) {
        console.error("Error setting new password:", error);
      }
    } else {
      console.error("userId is null.");
    }
  };

  return (
    <div className={styles.container}>
      <Form
        style={{ width: "100%" }}
        name="sign"
        layout="vertical"
        onFinish={onFinish}
      >
        <Texter
          text="Create new password"
          className="create-new-password-text text-left"
        />
        <Texter
          text="Enter a new password which will be used to authorize your account from
          now on"
          className="create-new-password-description  my-8 text-left"
        />
        <MyFormItemGroup prefix={["create_password"]}>
          <div className={styles.form}>
            <MyFormItem name="newPass" label="Create New Password">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onChange={handlePasswordChange}
                className="custom-input"
              />
            </MyFormItem>

            <MyFormItem name="confirmNewPass" label="Confirm Password">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onChange={handleConfirmPasswordChange}
                className="custom-input"
              />
            </MyFormItem>

            {!passwordsMatch && (
              <p className={`${styles.error} captionr`}>
                Passwords do not match
              </p>
            )}

            <Checkbox onChange={togglePasswordVisibility}>
              <span className="captionr">Show Password</span>
            </Checkbox>

            <button
              type="submit"
              className={styles.button}
              disabled={!passwordsMatch}
            >
              Save New Password
            </button>
          </div>
        </MyFormItemGroup>

        <div className={styles.footer}>
          <span className="captionr">
            Don't have an account?
            <Link
              href="/statement/create-account"
              className="sign-up-blue-link p-1"
            >
              Create Account.
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default NewPasswordHelper;
