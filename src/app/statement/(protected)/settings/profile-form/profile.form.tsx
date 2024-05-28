import React, { useState } from "react";
import styles from "./profile.form.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";

const ProfileForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("ENGLISH");

  const handleUserNameChange = (e: any) => setUserName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePhoneChange = (e: any) => setPhone(e.target.value);
  const handleLanguageChange = (e: any) => setLanguage(e.target.value);

  return (
    <div className={styles.container}>
      <div>
        <VerticalInfoDescription
          title={"General Information"}
          titleStyle={{ fontWeight: "500", fontSize: "20px" }}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.profileImage}>
          <span className={styles.imageContainer}>
            <img src={"/profile.png"} alt="profileImage" />
          </span>
        </div>
        <div className={styles.profileInfo}>
          <VerticalInfoDescription
            title={"Abia Mbabazi"}
            titleStyle={{ fontSize: "20px", fontWeight: "500" }}
          />
          <VerticalInfoDescription
            title={"Nairobi, Kenya"}
            description={"( GMT -11:46) Greenwich mean Time zone"}
            descriptionStyle={{
              fontSize: "16px",
              paddingTop: "4px",
              color: "#151E00",
            }}
          />
        </div>
      </div>

      <form className={styles.formContainer}>
        <div className={styles.inputsContainer}>
          <ProfileForm.Input
            placeholder="Abby"
            labelName="User Name"
            inputType="text"
            value={userName}
            onChange={handleUserNameChange}
          />
          <ProfileForm.Input
            placeholder="Kelixyabby@gmail.com"
            labelName="Email"
            inputType="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className={styles.inputsContainer}>
          <ProfileForm.Input
            placeholder="+250 788 000 000"
            labelName="Phone"
            inputType="text"
            value={phone}
            onChange={handlePhoneChange}
          />
          <div className={styles.labelInput}>
            <label htmlFor="language" className={`bodyr`}>
              Language
            </label>
            <select
              name="language"
              id="language"
              className={styles.selectbox}
              value={language}
              onChange={handleLanguageChange}
              required
            >
              <option value="ENGLISH">ENGLISH</option>
              <option value="SWAHILI">SWAHILI</option>
            </select>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button className={styles.updateButton}>Update Settings</button>
          <button className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

type inputProps = {
  labelName: string;
  inputType: string;
  placeholder: string;
  value?: string;
  onChange?: (e: any) => void;
};

ProfileForm.Input = (props: inputProps) => (
  <div className={styles.labelInput}>
    <label className={`bodyr`}>{props.labelName}</label>
    <div className={styles.inputContainer}>
      <input
        type={props.inputType}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        className={styles.input}
        required
      />
    </div>
  </div>
);
