import { AppColorToken } from "@/src/types/context.types";
import React, { CSSProperties } from "react";

type ActivityBadgeProps = {
  token: AppColorToken;
  icon: React.ReactElement;
  paragraphSelectTextStyle: CSSProperties;
  title: string;
};

const ActivityBadge = ({
  token,
  icon,
  title,
  paragraphSelectTextStyle,
}: ActivityBadgeProps) => {
  return (
    <div className="activity-badge">
      <div
        className="activity-badge-button"
        style={{
          display: "inline-flex",
          padding: "4px 8px",
          color: token.default.white,
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          borderRadius: "4px",
          opacity: "0.8",
          background: token.accent.success,
        }}
      >
        <p style={paragraphSelectTextStyle}>{title}</p>
        <span>{icon}</span>
      </div>
    </div>
  );
};

export default ActivityBadge;
