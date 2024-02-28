"use client";

import { useTokens } from "@/src/app/(context)/ColorContext";
import { InfoCircleFilled } from "@ant-design/icons";
import ContactCard from "../../atoms/cards/contact.card";

const UserSetupDetails = () => {
  const token = useTokens();
  return (
    <div
      style={{
        display: "flex",
        padding: "0px 32px 0px 64px",
        justifyContent: "space-between",
        alignItems: "flex-start",
        alignSelf: "stretch",
      }}
    >
      <ContactCard
        title="Country"
        content="Kenya"
        additonalContent="Nairobi"
        icon={<InfoCircleFilled />}
        style={{
          width: "30%",
          borderRight: `1px solid ${token.default.grey}`,
          background: token.default.white,
        }}
      />
      <ContactCard
        title="Email"
        content="Email"
        additonalContent="merakisystems@gmail.com"
        icon={<InfoCircleFilled />}
        style={{
          width: "30%",
          borderRight: `1px solid ${token.default.grey}`,
          background: token.default.white,
        }}
      />
      <ContactCard
        title="Mobile Number"
        content="Kenya"
        additonalContent="072800000000"
        icon={<InfoCircleFilled />}
        style={{
          width: "30%",

          background: token.default.white,
        }}
      />
    </div>
  );
};

export default UserSetupDetails;
