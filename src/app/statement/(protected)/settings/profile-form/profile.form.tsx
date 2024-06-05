import React, { useState, useEffect, useContext } from "react";
import styles from "./profile.form.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { profileInformationDetails } from "@/src/lib/get.profileinfo.action";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { useQuery } from "react-query";
import { updateUserDetails } from "@/src/services/auth/get.user.byUserId";
import { notification } from "antd";
import { UserInformationContext } from "../context/user.info.context";

export type UserInformationDetails = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  language: string;
};

const ProfileForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("ENGLISH");
  const profile = useProfileCreated();
  const { setUserInfodetails } = useContext(UserInformationContext);
  let userId = profile?.userId;

  const [initialUserName, setInitialUserName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [initialLanguage, setInitialLanguage] = useState("ENGLISH");

  console.log(userId)
  const fetchProfileData = async () => {
    const result = await profileInformationDetails(userId!);
    setUserInfodetails(result);
    return result;
  };

  const { data: profileInfodata, error, isError, isLoading } = useQuery(
    ["userid", userId],
    fetchProfileData,
    {
      enabled: !!userId,
      refetchInterval: 5000,
    }
  );

  useEffect(() => {
    if (profileInfodata) {
      const fullName = `${profileInfodata.firstname} ${profileInfodata.lastname}`;
      setUserName(fullName);
      setEmail(profileInfodata.email);
      setPhone(profileInfodata.phone);
      setLanguage(profileInfodata.language);

      setInitialUserName(fullName);
      setInitialEmail(profileInfodata.email);
      setInitialPhone(profileInfodata.phone);
      setInitialLanguage(profileInfodata.language);
    }
  }, [profileInfodata]);

  const handleUserNameChange = (e: any) => setUserName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePhoneChange = (e: any) => setPhone(e.target.value);
  const handleLanguageChange = (e: any) => setLanguage(e.target.value);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();

    const nameParts = userName.split(" ");
    const firstname = nameParts[0];
    const lastname = nameParts.slice(1).join(" ");

    const editProfileData = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      mobileNumber: phone,
      language: language,
    };

    try {
      await updateUserDetails(userId!, editProfileData);
      notification.success({
        message: "Account Profile Updated Successfully!",
      });
      setInitialUserName(userName);
      setInitialEmail(email);
      setInitialPhone(phone);
      setInitialLanguage(language);
    } catch (error) {
      notification.error({
        message: "Failed to Update Profile.",
      });
      throw error;
    }
  };

  const handleCancel = () => {
    setUserName(initialUserName);
    setEmail(initialEmail);
    setPhone(initialPhone);
    setLanguage(initialLanguage);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(now);
  };

  const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = getCurrentTime();

  if (isError) {
    return <div>An error occurred. Please try again!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <img src={"/profileholder.svg"} alt="profileImage" />
          </span>
        </div>
        <div className={styles.profileInfo}>
          <VerticalInfoDescription
            title={`${profileInfodata?.firstname!} ${profileInfodata?.lastname}`}
            titleStyle={{ fontSize: "20px", fontWeight: "500" }}
          />
          <VerticalInfoDescription
            title={location}
            description={`(${currentTime})`}
            descriptionStyle={{
              fontSize: "16px",
              paddingTop: "4px",
              color: "#151E00",
            }}
          />
        </div>
      </div>

      <form className={styles.formContainer} onSubmit={handleUpdateProfile}>
        <div className={styles.inputsContainer}>
          <ProfileForm.Input
            placeholder="John James"
            labelName="User Name"
            inputType="text"
            value={userName}
            onChange={handleUserNameChange}
          />
          <ProfileForm.Input
            placeholder="john@gmail.com"
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

            <div className={styles.selectbox}>
            <select
              name="language"
              id="language"
              value={language}
              onChange={handleLanguageChange}
              required
            >
              <option value="ENGLISH">ENGLISH</option>
              <option value="SWAHILI">SWAHILI</option>
            </select>
            </div>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit" className={styles.updateButton}>
            Update Settings
          </button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
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
