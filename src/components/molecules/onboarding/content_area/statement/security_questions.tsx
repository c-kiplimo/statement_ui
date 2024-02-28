/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { ChangeEvent, useState } from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { useRouter } from "next/navigation";

interface CustomInputProps {
  name: string;
  formData: string;
  placeholder: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  customStyles: React.CSSProperties;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  formData,
  onChange,
  placeholder,
  label,
  customStyles,
}: CustomInputProps) => {
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
    backgroundColor: isActive ? "white" : token.default.white,
    padding: "10px",
    color: token.text.description_01,
    display: "flex",
    borderRadius: "5px",
    gap: "10px",
    ...customStyles,
  };

  const iconStyles: React.CSSProperties = {
    marginRight: "10px",
  };

  const inputFieldStyles: React.CSSProperties = {
    border: "none",
    borderRadius: "5px",
    backgroundColor: isActive ? "white" : token.default.white,
    outline: "none",
    flex: 1,
  };

  return (
    <div className="py-[16px]">
      <label style={{ color: token.text.secondary }}>{label}</label>
      <div className={`input-container ${isActive ? "active" : ""} mb-4"`}>
        <div style={inputStyles}>
          <input
            placeholder={placeholder}
            type="text"
            name={name}
            value={formData}
            onChange={onChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={inputFieldStyles}
          />
        </div>
      </div>
    </div>
  );
};

const SecurityQuestions = () => {
  const router = useRouter();
  const token = useTokens();

  const [inputData, setInputData] = useState({
    question1: "",
    question2: "",
    question3: "",
  });

  const handleSubmit = () => {
    console.log("Submitted data:", inputData);
    router.push("/statement/dashboard");
  };

  const handleInputChange = (name: string, value: string) => {
    setInputData({ ...inputData, [name]: value });
  };
  return (
    <div className="w-[350px]">
      <h1
        style={{
          color: token.text.secondary,

          fontSize: "25px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "32px",
        }}
      >
        Security Question
      </h1>
      <p
        style={{
          color: token.text.secondary,
          fontSize: "16px",
          fontStyle: "normal",
          marginTop: "32px",
          marginBottom: "32px",
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        You are almost Done
      </p>

      <CustomInput
        name="question1"
        label="Question 1"
        placeholder="In which city were you born ?"
        formData={inputData.question1}
        onChange={(e) => handleInputChange("question1", e.target.value)}
        customStyles={{}}
      />
      <CustomInput
        name="question2"
        label="Question 2"
        placeholder="Which high  school did you attend ?"
        formData={inputData.question2}
        onChange={(e) => handleInputChange("question2", e.target.value)}
        customStyles={{}}
      />
      <CustomInput
        name="question3"
        label="Question 3"
        placeholder="Which is your favourite meal ?"
        formData={inputData.question3}
        onChange={(e) => handleInputChange("question3", e.target.value)}
        customStyles={{}}
      />

      <div className="my-2 mt-12 flex justify-end items-center">
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: "var(--brand-brand-primary)" }}
          className="bg-primary w-full h-10 text-white px-2 py-1 mt-2 rounded"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default SecurityQuestions;
