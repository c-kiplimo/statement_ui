import React from "react";
import Image from "next/image";

import Link from "next/link";

import { useTokens } from "@/src/app/(context)/ColorContext";

const ResetPasswordSubmissionHelper = () => {
  const tokens = useTokens();
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <div>
        <Image
          style={{
            width: "80%",
            paddingLeft: "4rem",
            textAlign: "center",
          }}
          src="/email.svg"
          alt="Avatar"
          width={15}
          height={100}
        />
      </div>

      <h1
        style={{
          fontSize: "25px",
          color: tokens.text.secondary,
          lineHeight: "40px",
          fontWeight: "500",
        }}
        className="text-2xl mt-5"
      >
        Password reset email sent!
      </h1>
      <p
        style={{
          lineHeight: "25.5px",
          fontWeight: "400",
          fontSize: "16px",
          color: tokens.text.description_02,
          fontFamily: "Roboto",
        }}
        className="text-center"
      >
        If you do not receive any email from us within 15 minutes, please check
        your SPAM folder. if there is still no email
      </p>
      <Link href="#">
        <span style={{ color: tokens.text.secondary }}>
          click here to resend email
        </span>
      </Link>
    </div>
  );
};

export default ResetPasswordSubmissionHelper;
