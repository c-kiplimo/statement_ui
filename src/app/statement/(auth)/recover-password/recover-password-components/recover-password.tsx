import Link from "next/link";
import React, { ReactNode, useState } from "react";
import styles from "./recover-password.module.css";
import { ReloadOutlined } from "@ant-design/icons";
import Texter from "@/src/components/atoms/text/texter";
import InputComponent from "@/src/components/atoms/input/inputComponent";
import { Label } from "@/src/components/atoms/label/label";
import CustomButton from "@/src/components/atoms/button/customButton";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Send a request to the server to search for the email
    console.log("Searching for email:", email);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <Texter
            text="Verify Existing Account"
            className={`${styles.title} h4r`}
          />
          <Texter
            text="Please enter your email address to check if you already have account"
            className={`${styles.titleDesc} bodyr`}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.email}>
            <div className={styles.emailFrame}>
              <Label htmlFor="email" label="Your email" className="bodyr" />
              <InputComponent
                className={`${styles.input} bodyr`}
                id="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required={true}
              />
            </div>
            <div className={styles.button}>
              <CustomButton
                bgColor="var(--brand-brand-primary)"
                type="submit"
                className={styles.searchBtn}
                text="Search"
              />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.linkWrapper}>
        <RecoverPassword.Icon icon={<ReloadOutlined size={16} />} />
        <span className={styles.linkContainer}>
          <Link href="#" className={`${styles.link} bodyr`}>
            Resend mail
          </Link>
        </span>
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
