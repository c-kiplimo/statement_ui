import React, { useState } from "react";
import styles from "./verify-mail.module.css";
import TexterLink from "@/src/components/atoms/text/texterLink";
import Image from "next/image";
import Texter from "@/src/components/atoms/text/texter";
import { Label } from "@/src/components/atoms/label/label";
import InputComponent from "@/src/components/atoms/input/inputComponent";
import CustomButton from "@/src/components/atoms/button/customButton";

const VerifyMailComponent = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Searching for email:", email);
  };

  return (
    // // <div className={styles.container}>
    //   {/* <div className={styles.link}>
    //     <TexterLink
    //       text="Having trouble? "
    //       className="bodyr"
    //       linkText="Get help"
    //       linkClassName="get-help-link"
    //       href="#"
    //     />
    //   </div> */}
    <div className={styles.content}>
      <div className={styles.icon}>
        <Image src="/Email-box.svg" alt="Email" width={32} height={32} />
      </div>
      <div className={styles.header}>
        <Texter
          className={`${styles.title} h6b`}
          text="Provide Email Address"
        />
        <Texter
          className={`${styles.titleDesc} bodyr`}
          text="Please enter your email address to check if you already have account"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.emailFrame}>
          <div className={styles.form}>
            <Label
              htmlFor="email"
              label="Provide Your Email Address"
              className={`${styles.label}bodyr`}
            />
            <InputComponent
              className={`${styles.input} bodyr`}
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email   "
              required={true}
            />
          </div>
          <div className={styles.button}>
            <CustomButton
              bgColor="var(--brand-brand-primary)"
              type="submit"
              className={`${styles.searchBtn} bodyr`}
              text="Search"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyMailComponent;
