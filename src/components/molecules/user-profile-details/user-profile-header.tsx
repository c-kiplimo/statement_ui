"use client";

import React from "react";
import Image from "next/image";
import Select from "antd/es/select";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";
import Link from "next/link";

const ProfileInformationHeader = ({
  fullName,
  email,
  location,
  timezone,
  loginStatus,
  onChangeStatus,
}: any) => {
  const token = useTokens();
  const font = useFont();

  const links = [
    { href: "#", label: "Edit profile" },
    { href: "#", label: "Manage Email Address" },
    { href: "#", label: "Reset Password" },
  ];

  const ProfileLinks = ({ links }: any) => (
    <p
      className="profile-links"
      style={{
        color: token.text.primary,
        display: "flex",
        flexWrap: "nowrap",
        fontSize: font.typography.body.regular.fontSize,
        fontStyle: "normal",
        fontWeight: font.typography.body.regular.fontWeight,
        lineHeight: font.typography.body.regular.lineHeight,
      }}
    >
      {links.map((link: any, index: any) => (
        <span style={{ paddingRight: "2px" }} key={index}>
          <Link className="text-[#28273B] hover:text-blue-500" href={link.href}>
            {link.label}
          </Link>
          {index < links.length - 1 && " | "}{" "}
        </span>
      ))}
    </p>
  );

  return (
    <div
      className="profile-info-header-user-details"
      style={{
        display: "flex",
        padding: "0px 32px",

        flexDirection: "column",
        alignItems: "flex-start",
        gap: "54px",
        alignSelf: "stretch",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          gap: "32px",
        }}
      >
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
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            gap: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <p
              style={{
                color: token.text.primary,
                fontSize: font.typography.h6.medium.fontSize,
                fontStyle: "normal",
                fontWeight: font.typography.h6.medium.fontWeight,
                lineHeight: font.typography.h6.medium.lineHeight,
              }}
            >
              {fullName}
            </p>

            <p
              style={{
                color: token.text.primary,
                fontSize: font.typography.body.regular.fontSize,
                fontStyle: "normal",
                fontWeight: font.typography.body.regular.fontWeight,
                lineHeight: font.typography.body.regular.lineHeight,
              }}
            >
              {email}
            </p>
            <p
              style={{
                color: token.text.primary,
                fontSize: font.typography.body.regular.fontSize,
                fontStyle: "normal",
                fontWeight: font.typography.body.regular.fontWeight,
                lineHeight: font.typography.body.regular.lineHeight,
              }}
            >
              {location}
            </p>
            <p
              style={{
                color: token.text.primary,
                fontSize: font.typography.body.regular.fontSize,
                fontStyle: "normal",
                fontWeight: font.typography.body.regular.fontWeight,
                lineHeight: font.typography.body.regular.lineHeight,
              }}
            >
              {timezone}
            </p>
            <ProfileLinks links={links} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            <div>
              <p
                style={{
                  color: token.text.secondary,

                  fontSize: font.typography.body.regular.fontSize,
                  fontStyle: "normal",
                  fontWeight: font.typography.body.regular.fontWeight,
                  lineHeight: font.typography.body.regular.lineHeight,
                }}
              >
                {loginStatus}
              </p>

              <Select
                labelInValue
                defaultValue={{
                  value: "Active",
                  label: "Active",
                }}
                onChange={onChangeStatus}
                options={[
                  {
                    value: "Active",
                    label: "Active",
                  },
                  {
                    value: "Inactive",
                    label: "Inactive",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInformationHeader;
