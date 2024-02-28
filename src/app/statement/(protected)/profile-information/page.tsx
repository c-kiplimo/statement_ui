"use client"
import React from "react";
import ProfileHeadContent from "@/src/components/molecules/user-profile-details/profile-head-content/profile-head-content";
import UserProfileTabContent from "@/src/components/molecules/user-profile-details/user-profile-tab-bar-content";

const ProfileInformation = () => {
  return (
    <section
    className="content"
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <section
      className="content"
      style={{
        width: "95%",
        padding: "40px",
        display: "flex",
        marginTop: "40px",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <ProfileHeadContent />
      <UserProfileTabContent />
    </section>
  </section>
  );
};

export default ProfileInformation;
