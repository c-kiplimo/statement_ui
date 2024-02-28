import { useTokens } from "@/src/app/(context)/ColorContext";

import EntryInfoText from "@/src/components/atoms/text/entry-info-text/entry-info-text";
import { MenuProps } from "antd";
import DropdownButton from "@/src/components/atoms/button/dropdown/dropdown";

interface AccountStatementHeaderDataItem {
  title: string;
  description: string;
}

interface AccountStatementHeaderProps {
  data: AccountStatementHeaderDataItem[];
}

const AccountStatementHeaderComponent: React.FC<
  AccountStatementHeaderProps
> = ({ data }) => {
  const token = useTokens();

  const items: MenuProps["items"] = [
    {
      label: "Corporate",
      key: "corporate",
    },
    {
      label: "Safaricom",
      key: "safaricom",
    },
    {
      label: "Retail",
      key: "retail",
    },
    {
      label: "Default",
      key: "default",
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        alignSelf: "stretch",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {data?.map((item, index) => (
          <EntryInfoText
            key={index}
            title={item.title}
            description={item.description}
            styles={{
              container: { backgroundColor: "white" },
              title: {},
              description: {},
            }}
          />
        ))}
      </div>

      <DropdownButton
        onClick={onClick}
        items={items}
        text=" Dowmload"
        icon={<ArrowDownIcon color={token.default.white} />}
        styles={{
          buttonStyles: {
            display: "flex",
            height: "40px",
            padding: "8px 12px",
            color: token.default.white,
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "25.5px",
            alignItems: "center",
            gap: "8px",
            borderRadius: "4px",
            backgroundColor: token.accent.success,
          },
        }}
      />
    </div>
  );
};

const ArrowDownIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      style={{ color: color || "white" }}
    >
      <path
        d="M15.0003 1.11695L7.86816 8.99938L1.00222 0.884028"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AccountStatementHeaderComponent;
