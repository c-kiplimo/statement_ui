import React, { useState } from "react";
import styles from "./signInHelper.module.css";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import Link from "next/link";
import { AUTH_URL_LOGIN } from "@/src/constants/environment";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import { Form, Input, Modal, notification } from "antd";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import EnterOtpToVerify from "./otp-verify/enter_otp_to_verify";

const SignInHelper = () => {
  const router = useRouter();
  const { storeToken } = AuthServiceProvider();
  const { loginService, requestOtpService } = authServiceHandler();
  const [showModal,setShowModal]=useState(false);

  type LoginProps = {
    login: {
      username: string;
      password: string;
      confirm?: boolean;
    };
  };

  const openModalHandler=()=>{
    setShowModal(true);
  }

  const closeModal=()=>{
    setShowModal(false);
  }

  const onSubmit = async (values: LoginProps) => {
     await loginService(AUTH_URL_LOGIN, values)
      .then((response) => {
        const tokenData = {
          accessToken: response.data?.access_token,
          refreshToken: response.data?.refresh_token,
          tokenType: response.data?.token_type,
          expiresIn: response.data?.expires_in,
        };
        storeToken(tokenData);
        console.log("Sending OTP>>",tokenData);
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
        openModalHandler();
        //router.push("/statement/otp-verification");
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
                  <Input.Password
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
                    Forgot Password
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
        {showModal && (
          <Modal open={showModal}
          onCancel={closeModal}
            footer={null}
            className={styles.modal}
          >
            <EnterOtpToVerify/>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SignInHelper;
