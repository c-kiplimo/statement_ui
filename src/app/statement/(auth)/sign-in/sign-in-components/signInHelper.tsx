import React, { useState } from "react";
import styles from "./signInHelper.module.css";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import Link from "next/link";
import { Modal } from "antd";
import VerifyMailComponent from "./verify-mail";
import { AUTH_URL_LOGIN } from "@/src/constants/environment";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import { Button, Form, Input, notification } from "antd";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";

const SignInHelper = () => {
  const router = useRouter();
  const { storeToken } = AuthServiceProvider();
  const { loginService, requestOtpService } = authServiceHandler();

  type LoginProps = {
    login: {
      username: string;
      password: string;
      confirm?: boolean;
    };
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (values: LoginProps) => {
    const response = await loginService(AUTH_URL_LOGIN, values)
      .then((response) => {
        const tokenData = {
          accessToken: response.data?.access_token,
          refreshToken: response.data?.refresh_token,
          tokenType: response.data?.token_type,
          expiresIn: response.data?.expires_in,
        };
        storeToken(tokenData);
        console.log("saving");
        return tokenData;
      })
      .then((tokenData) => {
        return requestOtpService(tokenData.accessToken);
      })
      .then((data) => {
        notification.info({
          message: "OTP Generated",
          description: "A new OTP has been generated. Please check your email.",
        });
        router.push("/statement/otp-verification");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
      });
  };

  const redirectToCreateAccount = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    openModal();
    setTimeout(() => {
      router.push("/statement/create-account");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signinFrame}>
        <Form
          onFinish={onSubmit}
          style={{ width: "100%", padding: "16px", margin: "8px" }}
          name="sign"
          layout="vertical"
        >
          <div className={styles.formHeader}>
            <Texter text="Sign in" className={`${styles.title} h5b`} />
            <Texter
              text="Please sign in to your account to access the partner portal"
              className={`${styles.titleDesc} bodyr`}
            />
          </div>
          <div>
            <MyFormItemGroup prefix={["login"]}>
              <div className={styles.formItem}>
                <MyFormItem
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid Email address",
                    },
                  ]}
                  name="username"
                >
                  <Input className="form-input bodyr" placeholder="Email" />
                </MyFormItem>
                <MyFormItem
                  rules={[
                    { required: true, message: "Please enter your Password" },
                  ]}
                  name="password"
                >
                  <Input
                    className="form-input bodyr"
                    type="password"
                    placeholder="Password"
                  />
                </MyFormItem>
              </div>
              <div className={styles.formConsent}>
                <div className={`${styles.checkBox} kcb-remember-me`}>
                  <MyFormItem name="confirm">
                    <Input type="checkbox" />
                  </MyFormItem>
                  <label
                    className="pt-1 kcb-remember-me"
                    htmlFor="agreeCheckbox"
                  >
                    Remember me
                  </label>
                </div>
                <div className={styles.recover}>
                  <Link
                    href="/statement/password-recovery/recover-password"
                    className={`${styles.recoverLink} captionr`}
                  >
                    Recover Password
                  </Link>
                </div>
              </div>
              <CustomButton
                bgColor="var(--brand-brand-primary)"
                type="submit"
                className={styles.button}
                text="Sign in"
              />

              <div className={styles.footer}>
                <p className="captionr">
                  Don't have an account?
                  <span>
                    <Link
                      className="sign-up-link"
                      href=""
                      onClick={redirectToCreateAccount}
                    >
                      Create Account.
                    </Link>
                  </span>
                </p>
              </div>
            </MyFormItemGroup>
          </div>
        </Form>
      </div>
      {isModalVisible && (
        <Modal
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
          className={styles.modal}
        >
          <VerifyMailComponent />
        </Modal>
      )}
    </div>
  );
};

export default SignInHelper;