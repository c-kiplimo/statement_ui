"use client";
import React, { useState } from "react";
import styles from "./recover-password.module.css";
import Texter from "@/src/components/atoms/text/texter";
import CustomButton from "@/src/components/atoms/button/customButton";
import { useRouter } from "next/navigation";
import { Form, Input, notification } from "antd";
import { confirmUserPassword } from "@/src/services/auth/confirmUser";

const ConfirmUser = ({userId}:any) => {
  const [passwrd, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [error, setError] = useState('');
  const router = useRouter();
  
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long!";
    }
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!hasLetter || !hasNumber) {
      return "Password must contain at least one letter and one number!";
    }
    return ""; 
  };

  const onFinish = async () => {
    const passwordError = validatePassword(passwrd);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (passwrd !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const  setPassword  = {
      password:passwrd
    }

    const response = await confirmUserPassword(userId,setPassword  )
    if (response) {
      notification.success({
        message:'Password Has Been Set Successfully.'
      });
      router.replace("/statement/sign-in")
    } else {
      notification.error({
        message:'An Error Occured.'
      })
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <Texter text="Confirm Password" className={`${styles.title} h3b`} />
          <Texter
            text="Set Your Password."
            className={`${styles.titleDesc} bodyr`}
          />
        </div>
        <Form
          onFinish={onFinish}
          style={{ width: "100%" }}
          name="recover"
          layout="vertical"
        >
          <Form.Item
            className={`${styles.email} bodyr`}
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input
              className={`${styles.input} bodyr`}
              type="password"
              value={passwrd}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Item>

          <Form.Item
            className={`${styles.email} bodyr`}
            label="Confirm Password"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input
              className={`${styles.input} bodyr`}
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmpassword(event.target.value)}
              placeholder="Enter confirm password"
              required
            />
          </Form.Item>

          <div className="text-error font-bold mb-1">
            {error}
          </div>

          <div className={styles.btn}>
            <CustomButton
              bgColor="var(--brand-brand-primary)"
              type="submit"
              text="Confirm Password"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmUser;
