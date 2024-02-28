"use -client";

import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import React, { CSSProperties } from "react";
import ProfileLink from "@/src/components/atoms/links/profile-link";
import ParagraphText from "@/src/components/atoms/paragraph/paragraphText";

const ProfileHeadContent = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex", gap: "32px" }}>
        <ProfileHeadImage />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ProfileHeadtextDescription
            fullName="Abia Mbabazi"
            email="abbymbabazi@gmail.com"
            location="Nairobi, Kenya"
            timezone="( GMT -11:46 ) Greenwich mean Time zone"
          />
          <UserProfileLink />
        </div>
      </div>
      <div>
        <ProfileHeadSelectInput activate="Active" />
      </div>
    </section>
  );
};

const ProfileHeadImage = () => {
  return (
    <div className="profile-info-image">
      <Image
        src="/profile.png"
        alt="img"
        width={139}
        height={139}
        style={{
          borderRadius: "144px",
        }}
      />
    </div>
  );
};

type ProfileHeadtextDescriptionProps = {
  fullName: string;
  email: string;
  location: string;
  timezone: string;
};

const ProfileHeadtextDescription = (props: ProfileHeadtextDescriptionProps) => {
  const token = useTokens();
  const font = useFont();

  const paragraphStyle = {
    color: token.text.primary,
    ...font.typography.body.regular,
    fontStyle: "normal",
  };
  const paragraphHeaderStyle = {
    color: token.text.primary,
    ...font.typography.h6.medium,
    fontStyle: "normal",
  };
  const profileHeadtextDescriptionCss: CSSProperties = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
  };

  return (
    <div style={profileHeadtextDescriptionCss}>
      <ParagraphText
        styles={paragraphHeaderStyle}
        description={props.fullName}
      />
      <ParagraphText styles={paragraphStyle} description={props.email} />
      <ParagraphText styles={paragraphStyle} description={props.location} />

      <ParagraphText styles={paragraphStyle} description={props.timezone} />
    </div>
  );
};

const UserProfileLink = () => {
  const token = useTokens();
  const font = useFont();

  const handleButtonClick = () => {
    console.log("clicked");
  };

  const itemslink = [
    { href: "#", label: "Edit profile" },
    { href: "#", label: "Manage Email Address" },
    { href: "#", label: "Reset Password" },
  ];

  function hasBorder(index: number) {
    return index != 0 && true;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
      }}
    >
      {itemslink.map((item, index) => (
        <ProfileLink
          key={index}
          fontProperties={font.typography.body.regular}
          color={token.text.secondary}
          title={item.label}
          hasBorder={hasBorder(index)}
          borderColor={token.border.secondary}
          onClick={handleButtonClick}
        />
      ))}
    </div>
  );
};

type ProfileHeadSelectInputProps = {
  activate: string;
};
const ProfileHeadSelectInput = (props: ProfileHeadSelectInputProps) => {
  const token = useTokens();
  const font = useFont();

  const profileHeadSelectInputCss: CSSProperties = {
    display: "flex",
    padding: "4px 8px",
    width: "83px",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0.8",
    backgroundColor: token.accent.success_invert_01,
    gap: "8px",
  };

  const paragraphSelectTextStyle = {
    color: token.text.primary,
    ...font.typography.body.regular,
    fontStyle: "normal",
  };
  return (
    <div>
      <div>
        <ParagraphText
          styles={paragraphSelectTextStyle}
          description="Last login on 45 minutes ago"
        />
      </div>

      <div style={profileHeadSelectInputCss}>
        <p
          style={{
            color: token.accent.success,
            ...font.typography.body.regular,
          }}
        >
          {props.activate}
        </p>
        <ChevronDown size={20} color={token.accent.success} />
      </div>
    </div>
  );
};

export default ProfileHeadContent;
