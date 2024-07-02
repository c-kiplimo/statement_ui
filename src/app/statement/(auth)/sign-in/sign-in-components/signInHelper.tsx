import React, { useState } from "react";
import styles from "./signInHelper.module.css";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import Link from "next/link";
import { AUTH_URL_LOGIN } from "@/src/constants/environment";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import {Form, Input, Modal, notification } from "antd";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import EnterOtpToVerify from "./otp-verify/enter_otp_to_verify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignInHelper = () => {
  const router = useRouter();
  const { storeToken } = AuthServiceProvider();
  const { loginService, requestOtpService } = authServiceHandler();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  type LoginProps = {
    login: {
      username: string;
      password: string;
      confirm?: boolean;
    };
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const onSubmit = async (values: LoginProps) => {
    await loginService(AUTH_URL_LOGIN, values)
      .then((response) => {
        const tokenData = {
          accessToken: response.data?.access_token,
          refreshToken: response.data?.refresh_token,
          tokenType: response.data?.token_type,
          expiresIn: response.data?.expires_in,
        };
        storeToken(tokenData, rememberMe);
        console.log("Stored token data>>", tokenData);
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
      router.replace("/statement/sign-up");
    }, 120);
  };

  return (
    <div className={styles.signinFrame}>
      <Form
        className={styles.form}
        onFinish={onSubmit}
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
                <Input
                  className={`${styles.customInput} bodyr`}
                  placeholder="Email"
                />
              </MyFormItem>
              <MyFormItem
                rules={[
                  { required: true, message: "Please enter your Password" },
                ]}
                name="password"
              >
                <Input
                  className={`${styles.customInput} bodyr`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  suffix={
                    <span
                      onClick={togglePasswordVisibility}
                      className={styles.passwordToggleIcon}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible  style={{ color: "#c9c9cc" }} size={16} />
                      ) : (
                        <AiOutlineEye style={{ color: "#c9c9cc" }} size={16} />
                      )}
                    </span>
                  }
                />
              </MyFormItem>
            </div>
            <div className={styles.formConsent}>
              <div className={styles.checkBoxContainer}>
                <input
                  id="confirm"
                  name="confirm"
                  type="checkbox"
                  className={styles.checkBox}
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="confirm" className="captionr">
                  Remember me
                </label>
              </div>
              <div className={styles.recover}>
                <Link
                  href="/statement/recover-password"
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
          </MyFormItemGroup>
        </div>
      </Form>
      <div className={styles.footer}>
        <p className="captionr">
          Don't have an account?
          <span>
            <Link
              className="sign-up-link"
              href="/statement/sign-up"
              onClick={redirectToCreateAccount}
            >
              Create Account.
            </Link>
          </span>
        </p>
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onCancel={closeModal}
          footer={null}
          className={styles.modal}
        >
          <EnterOtpToVerify />
        </Modal>
      )}
    </div>
  );
};

export default SignInHelper;
