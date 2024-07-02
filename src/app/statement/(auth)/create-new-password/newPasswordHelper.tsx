import React, { useState } from "react";
import styles from "./newPasswordHelper.module.css";
import Texter from "@/src/components/atoms/text/texter";
import { resetPasswordHandler } from "@/src/services/auth/reset-password";
import { Form, Input, notification, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewPasswordHelper = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { setNewPasswordService } = resetPasswordHandler();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (values: any) => {
    const { newPass, confirmNewPass } = values;
    if (newPass !== confirmNewPass) {
      setPasswordsMatch(false);
      return;
    }
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        const response = await setNewPasswordService(newPass, userId);
        console.log("response", response);
        notification.success({
          message: "Success",
          description: "Password updated successfully.",
        });
        router.push("/statement/sign-in");
      } catch (error) {
        console.error("Error setting new password:", error);
        notification.error({
          message: "Error",
          description: "Failed to update the password.",
        });
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
        <Texter text="Reset Password" className={`${styles.header} h3b`} />
        <div className={styles.form}>
          <div className={styles.formItem}>
            <Form.Item
              name="newPass"
              label="Create New Password"
              rules={[{message: "Please input your new password!" }]}
              className={styles.formInput}
            >
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`${styles.customInput} bodyr`}
              />
            </Form.Item>

            <Form.Item
              name="confirmNewPass"
              label="Confirm Password"
              className={styles.formInput}
              rules={[
                {message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPass") === value) {
                      setPasswordsMatch(true);
                      return Promise.resolve();
                    }
                    setPasswordsMatch(false);
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`${styles.customInput} bodyr ${!passwordsMatch && styles.error}`}
              />
            </Form.Item>
          </div>
          <Checkbox onChange={togglePasswordVisibility} className={`${styles.checkBox} bodyr`}>
           Show Password
          </Checkbox>        
        </div>
        <button type="submit" className={`${styles.button} bodyr`}>
            Create new password
          </button>
      </Form>
      <div className={styles.footer}>
        <span className="captionr">
          Don't have an account?
          <Link href="/statement/sign-up" className="sign-up-link p-1">
            Create Account.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default NewPasswordHelper;
