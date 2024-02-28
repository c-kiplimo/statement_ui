import React from "react";
import AccountSearchResultCard from "../../atoms/cards/account-search-result/account-search-result-card";
import style from "./account-search-results.module.css";
import ViewEyeIcon from "../../atoms/view-eye-icon/view-eye-icon";

interface CardObject {
  title: string;
  content?: React.ReactNode;
  additionalContent?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

interface AccountSearchResultsProps {
  cards: CardObject[];
  handleClick?: (apiId?: string | undefined) => void;
  customStyle?: React.CSSProperties;
  width?: string;
  apiId?: string;
}

const AccountSearchResults: React.FC<AccountSearchResultsProps> = ({
  cards,
  handleClick,
  customStyle,
  apiId,
}) => {
  return (
    <div
      className={style.card_results}
      style={{
        ...customStyle,
      }}
    >
      {cards.map((card, index) => (
        <AccountSearchResultCard
          key={index}
          title={card.title}
          content={card.content}
          additionalContent={card.additionalContent}
          icon={
            card.title === "" ? (
              <ViewEyeIcon
                style={{
                  cursor: "pointer",
                  color: "#979992",
                }}
                onClick={() => (handleClick ?? (() => {}))(apiId)}
              />
            ) : (
              card.icon
            )
          }
          style={card.style}
        />
      ))}
    </div>
  );
};

export default AccountSearchResults;
