import React, { useState } from "react";
import styles from "./create-Account.module.css";
import CustomButton from "@/src/components/atoms/button/customButton";
import { Label } from "@/src/components/atoms/label/label";
import InputComponent from "@/src/components/atoms/input/inputComponent";
import TexterLink from "@/src/components/atoms/text/texterLink";
import Texter from "@/src/components/atoms/text/texter";
import CheckboxComponent from "@/src/components/atoms/checkbox/checkBox";

const SignUp = () => {
  const countryOptions = [
    { value: "+254", label: "+254" },
    { value: "+256", label: "+256" },
    { value: "+255", label: "+255" },
    { value: "+250", label: "+250" },
  ];

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    password: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
    setSubmitted(false);
  };

  const handleCheckboxChange = (value: any) => {
    setUser({ ...user, consent: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            <div className={styles.formBody}>
              <div className={styles.header}>
                <Texter text="CREATE ACCOUNT" className="bodyb" />
              </div>
              {submitted && (
                <div className="success">
                  <h6>User {user.firstName} successfully registered!!</h6>
                </div>
              )}
              <div className={styles.row}>
                <Label
                  htmlFor="email"
                  label="Email Address"
                  className={`${styles.rowLabel} bodyr`}
                />
                <InputComponent
                  className={`${styles.input} bodyr`}
                  id="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className={styles.formRegister}>
                <div className={styles.twoRow}>
                  <div className={styles.rowItem}>
                    <Label
                      htmlFor="firstName"
                      label="First Name"
                      className={`${styles.rowLabel} bodyr`}
                    />
                    <InputComponent
                      className={`${styles.inputField} bodyr`}
                      id="firstName"
                      type="text"
                      value={user.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.rowItem}>
                    <Label
                      htmlFor="lastName"
                      label="Last Name"
                      className={`${styles.rowLabel} bodyr`}
                    />
                    <InputComponent
                      className={`${styles.inputField} bodyr`}
                      id="lastName"
                      type="text"
                      value={user.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.select}>
                  <Label
                    htmlFor="phoneNumber"
                    label="Phone Number"
                    className={`${styles.rowLabel} bodyr`}
                  />
                  <div className={`${styles.selectorRow} bodyr`}>
                    <select
                      className={`${styles.selectionStandard} bodyr`}
                      value={user.countryCode}
                      onChange={(e) =>
                        handleChange("countryCode", e.target.value)
                      }
                    >
                      {countryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <InputComponent
                      id="phoneNumber"
                      className={`${styles.selectorInput} bodyr`}
                      type="text"
                      value={user.phoneNumber}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                      placeholder="780000000"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <Label
                    htmlFor="password"
                    label="Password"
                    className={`${styles.rowLabel} bodyr`}
                  />
                  <InputComponent
                    className={`${styles.passwordField} bodyr`}
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formConsent}>
              <CheckboxComponent
                onChange={handleCheckboxChange}
                checked={user.consent}
              />
              <Label
                htmlFor="agreeCheckbox"
                className={styles.signupCheck}
                label="I consent to the collection and processing of my personal data in line with data regulations as described in"
                link="kcb privacy policy"
              />
            </div>
          </div>
          <CustomButton
            bgColor="var(--brand-brand-primary)"
            type="submit"
            className={styles.button}
            text="Create Account"
          ></CustomButton>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
