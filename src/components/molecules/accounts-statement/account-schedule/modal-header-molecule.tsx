import React from "react";
import Cards from "@/src/components/atoms/cards";
import ContactCard from "@/src/components/atoms/cards/contact.card";
import { CustomText } from "@/src/components/atoms/typography/primary_text";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";
import { InfoCircleFilled } from "@ant-design/icons";
import { userIcon } from "@/src/components/atoms/svg/document_svg";

interface modalHeaderProps {
  data: {
    title: string;
    description: string;
    lastActivity: string;
    availableBalance: string;
    workingBalance: string;
    terms: string;
  };
}

const ModalHeader: React.FC<modalHeaderProps> = ({ data }) => {
  const token = useTokens();
  const font = useFont();

  const {
    title,
    description,
    lastActivity,
    availableBalance,
    workingBalance,
    terms,
  } = data;

  return (
    <div
      style={{
        display: "flex",
        padding: "32px 0px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "32px",
        alignSelf: "stretch",
        borderRadius: "8px",
        background: "var(--Default-White, #FFF)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <Cards.CardHeaderM1
          title={title}
          description={description}
          icon={userIcon}
        ></Cards.CardHeaderM1>
        <CustomText
          title={`Last activity ${lastActivity}`}
          fontSize={font.typography.body.regular.fontSize}
          textColor={token.text.description_01}
          lineHeight={font.typography.body.regular.lineHeight}
          fontWeight={font.typography.body.regular.fontWeight}
          className="custom-text"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <ContactCard
          title="Available Balance"
          content={availableBalance}
          additonalContent={workingBalance}
          icon={<InfoCircleFilled />}
          style={{
            borderRight: `1px solid ${token.default.grey}`,
            background: token.default.white,
          }}
        />
        <ContactCard
          title="Working Balance"
          content={workingBalance}
          icon={<InfoCircleFilled />}
          style={{
            borderRight: `1px solid ${token.default.grey}`,
            background: token.default.white,
          }}
        />
        <ContactCard
          title="Terms"
          content={terms}
          icon={<InfoCircleFilled />}
          style={{
            background: token.default.white,
          }}
        />
      </div>
    </div>
  );
};

export default ModalHeader;
