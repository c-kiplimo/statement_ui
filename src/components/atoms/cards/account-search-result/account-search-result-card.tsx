import React from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";

interface CardProps {
  title: string;
  content?: React.ReactNode;
  additionalContent?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const AccountSearchResultCard: React.FC<CardProps> = ({
  title,
  content,
  style,
  icon,
  additionalContent,
}) => {
  const token = useTokens();
  return (
    <div
      className="account-search-result-card"
      style={{ ...styles.card, ...style }}
    >
      <div style={styles.header}>
        <h3>{title}</h3>
      </div>
      <div>
        <div style={styles.content}>{content} </div>
        <p style={styles.additionalContent}>{additionalContent}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "16px",
    alignItems: "top",
  },
  header: {
    display: "flex",
    alignItems: "center",
    color: "var(--tint-colors-tint-200)",
    paddingBottom: "8px",
  },
  content: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  additionalContent: {
    fontWeight: "normal",
    color: "var(--tint-colors-tint-300)",
  },
};

export default AccountSearchResultCard;
