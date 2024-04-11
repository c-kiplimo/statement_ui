import React, { useRef, useState } from "react";
import styles from "./otpInputContainer.module.css";

type OTpProps = {
  length: number;
  onChange: (otp: string) => void;
};

const OtpInput = ({ length = 4, onChange }: OTpProps) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    onChange(newPin.join(''));
  };

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.currentTarget.value && index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  return (
    <div className={styles.otpContainer}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
          ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
          className={styles.inputContainer}
          style={{ marginRight: index === length - 1 ? "0" : "10px" }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
