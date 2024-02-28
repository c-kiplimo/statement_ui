import React, { ChangeEvent, useState } from "react";
import { Input } from "antd";
import { MyFormItem } from "../../shared-features/form_builder_component";
import { useTokens } from "@/src/app/(context)/ColorContext";
import Image from "next/image";

interface CustomInputProps {
  placeholder: string;
  formData: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactElement;
  customStyles: React.CSSProperties;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  formData,
  name,
  onChange,
  icon,
  customStyles,
}) => {
  const token = useTokens();
  const [isActive, setIsActive] = useState(false);

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputBlur = () => {
    setIsActive(false);
  };

  const inputStyles: React.CSSProperties = {
    width: "100%",
    backgroundColor: isActive ? "white" : token.background.secondary,
    padding: "10px",
    display: "flex",
    gap: "10px",
    ...customStyles,
  };

  const iconStyles: React.CSSProperties = {
    marginRight: "10px",
  };

  const inputFieldStyles: React.CSSProperties = {
    border: "none",
    backgroundColor: isActive ? "white" : token.background.secondary,
    outline: "none",
    flex: 1,
  };

  return (
    <div className={`input-container ${isActive ? "active" : ""} mb-4"`}>
      <div style={inputStyles}>
        <div style={iconStyles} className="input-icon">
          {icon}
        </div>
        <input
          type="text"
          name={name}
          value={formData}
          onChange={onChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          style={inputFieldStyles}
        />
      </div>
    </div>
  );
};

interface IndividualDocumentsProps {
  formData: {
    GovernmentIssuedCard: string;
    DriversLicense: string;
    Passport: string;
  };
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}

const IndividualDocuments: React.FC<IndividualDocumentsProps> = ({
  formData,
  handleChangeInput,
  handleNextStep,
}) => {
  return (
    <div>
      <h1
        style={{
          color: "#120E49",
          fontFamily: "Roboto",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "32px",
        }}
      >
        Individual Documents
      </h1>
      <p
        style={{
          color: "#28273B",
          fontSize: "16px",
          fontStyle: "normal",
          marginTop: "32px",
          marginBottom: "32px",
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        Use a valid government-issued documents
      </p>
      <p
        style={{
          color: "#696972",
          fontFamily: "Roboto",
          marginBottom: "24px",
          marginTop: "24px",
          fontSize: "12.85",
          fontWeight: "400",
          lineHeight: 1.3,
        }}
      >
        Only the following Documents listed below will be accepted. all other
        document will be rejected.
      </p>

      <CustomInput
        name="Government-Issued Card"
        placeholder="Government-Issued Card"
        formData={formData.GovernmentIssuedCard}
        onChange={(e) => handleChangeInput(e)}
        icon={<Image alt="img" width={15} height={15} src="/Idcard.svg" />}
        customStyles={{ fontWeight: "bold" }}
      />

      <CustomInput
        name="DriversLicense"
        placeholder="Driver’s License"
        formData={formData.DriversLicense}
        onChange={(e) => handleChangeInput(e)}
        icon={<Image alt="img" width={15} height={15} src="/idcard.svg" />}
        customStyles={{}}
      />
      <CustomInput
        name="Passport"
        placeholder="Passport"
        formData={formData.Passport}
        onChange={(e) => handleChangeInput(e)}
        icon={<Image alt="img" width={15} height={15} src="/Read.svg" />}
        customStyles={{}}
      />
      <div className="mt-4 gap-4 flex items-center">
        <div className="mt-4 gap-4 flex items-center">
          <MyFormItem name="password">
            <Input type="checkbox" />
          </MyFormItem>
          <label
            htmlFor="agreeCheckbox"
            className="sign-up-check-box-description text-left"
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.3",
                letterSpacing: "0.14px",
                fontWeight: "500",
                fontStyle: "normal",
                fontFamily: "Lato",
                color: "#696972",
              }}
            >
              This information is used for personal verification only, and is
              kept private and confidential by Nhif
            </p>
          </label>
        </div>
      </div>
      <div className="my-2 flex justify-end items-center">
        <button
          style={{ backgroundColor: "var( --brand-brand-primary)" }}
          className="bg-primary w-full h-6 text-white px-2 py-1 mt-2 rounded"
          onClick={handleNextStep}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IndividualDocuments;
