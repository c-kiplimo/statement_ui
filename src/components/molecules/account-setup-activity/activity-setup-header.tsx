"use client";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import style from "./account-setup-activity.module.css";

import { ChevronDown } from "lucide-react";
import { CustomText } from "@/src/components/atoms/typography/primary_text";
import ActivityBadge from "@/src/components/atoms/badge/active-badge";
import RoundImageIcon from "@/src/components/atoms/avator/avator";

const ActivityHeaderComponent = () => {
  const token = useTokens();
  const font = useFont();

  const paragraphSelectTextStyle = {
    color: token.text.primary,
    ...font.typography.body.regular,
    fontStyle: "normal",
  };
  return (
    <div className={style.accuntSetupUserDetails}>
      <RoundImageIcon
        imageUrl="/user-icon.svg"
        backgroundColor={token.brand.secondary}
        textColor={token.default.white}
        iconSize={25}
        containerSize={60}
      />
      <div className={style.accountContent}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <CustomText
            title="Meraki Systems Tech"
            fontSize={font.typography.h6.medium.fontSize}
            textColor={token.text.secondary}
            lineHeight={font.typography.h6.medium.lineHeight}
            fontWeight={font.typography.h6.medium.fontWeight}
            className="custom-text"
          />
          <CustomText
            title="1234353"
            fontSize={font.typography.caption.regular.fontSize}
            textColor={token.text.description_01}
            lineHeight={font.typography.caption.regular.lineHeight}
            fontWeight={font.typography.caption.regular.fontWeight}
            className="custom-text"
          />
          <CustomText
            title="High Volume Customer"
            fontSize={font.typography.caption.regular.fontSize}
            textColor={token.text.secondary}
            lineHeight={font.typography.caption.regular.lineHeight}
            fontWeight={font.typography.caption.regular.fontWeight}
            className="custom-text"
          />
        </div>
        <ActivityBadge
          icon={<ChevronDown />}
          title="Active"
          token={token}
          paragraphSelectTextStyle={paragraphSelectTextStyle}
        />
      </div>
    </div>
  );
};

export default ActivityHeaderComponent;
