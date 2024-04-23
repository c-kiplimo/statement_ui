import TexterLink from "@/src/components/atoms/text/texterLink";
import React, { useState } from "react";
import styles from "./signInHelper.module.css";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import InputComponent from "@/src/components/atoms/input/inputComponent";
import CheckboxComponent from "@/src/components/atoms/checkbox/checkBox";
import { Label } from "@/src/components/atoms/label/label";
import Link from "next/link";
import { Modal } from "antd";
import VerifyMailComponent from "./verify-mail";

const SignInHelper = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    checkbox: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleCheckboxChange = (value: any) => {
    setUser({ ...user, checkbox: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted successfully");
  };

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <TexterLink
          text="Having trouble? "
          className="bodyr"
          linkText="Get help"
          linkClassName="get-help-link"
          href="#"
        />
      </div>
      <div className={styles.signinFrame}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formBody}>
            <div className={styles.formHeader}>
              <Texter text="Sign in" className={`${styles.title} h5b`} />
              <Texter
                text="Please sign in to your account to access the partner portal"
                className={`${styles.titleDesc} bodyr`}
              />
            </div>

            <div className={styles.form}>
              <div className={styles.formFrame}>
                <div className={styles.formInputs}>
                  <InputComponent
                    className={`${styles.input} bodyr`}
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email"
                    required={true}
                  />
                  <InputComponent
                    className={`${styles.input} bodyr`}
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Password"
                    required={true}
                  />
                </div>
                <div className={styles.formConsent}>
                  <div className={`${styles.checkBox} kcb-remember-me`}>
                    <CheckboxComponent
                      onChange={handleCheckboxChange}
                      checked={user.checkbox}
                    />
                    <Label
                      htmlFor="agreeCheckbox"
                      className={`${styles.checkLabel} kcb-remember-me`}
                      label="Remember me"
                    />
                  </div>
                  <div className={styles.recover}>
                    <Link
                      href="/statement/recover-password"
                      className={`${styles.recoverLink} captionr`}
                    >
                      Recover Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <CustomButton
              bgColor="var(--brand-brand-primary)"
              type="submit"
              className={styles.button}
              text="Sign in"
            ></CustomButton>
          </div>
        </form>
        <div className={styles.footer}>
          <TexterLink
            text="Don't have an account?"
            className="captionr"
            linkText="Create Account."
            href="#"
            linkClassName="sign-up-link"
            onClick={openModal}
          />
        </div>
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
