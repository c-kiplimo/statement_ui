import React, { CSSProperties, ReactNode } from "react";
import CustomSearchInput from "../../atoms/input/custom-search-input";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import CustomButton from "../../atoms/button/custom.button";
import styles from "./accounts.summary.item.module.css";
import AccountsBalanceOverview from "../accounts-balance-summary/accounts.balance.overview";

interface DataType {
  id: number;
  icon: ReactNode;
  accountName: string;
  accountBalance: string;
  bgcolor: string;
  imgcolor: string;
}

type AccountsSummaryItemProps = {
  cardTitle: string;
  placeholder: string;
  buttonname: string;
  icon: ReactNode;
  accountData: DataType[];
};

const AccountsSummaryItem = (props: AccountsSummaryItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <AccountsSummaryItem.CardTitle cardTitle={props.cardTitle} />
        </div>
        <div className={styles.buttons}>
          <AccountsSummaryItem.SearchItem placeholder={props.placeholder} />
          <AccountsSummaryItem.Filter
            buttonName={props.buttonname}
            icon={props.icon}
          />
        </div>
      </div>

      <div className={styles.body}>
        <AccountsSummaryItem.Body accountData={props.accountData} />
      </div>
    </div>
  );
};

export default AccountsSummaryItem;

type CardTitleProps = {
  cardTitle: string;
  titleStyle?: CSSProperties;
};
AccountsSummaryItem.CardTitle = (props: CardTitleProps) => (
  <VerticalInfoDescription
    title={props.cardTitle}
    titleStyle={{ color: "#151E00", fontWeight: "700", fontSize: "20px" }}
  />
);
type SearchItemProps = {
  placeholder: string;
  itemStyles?: CSSProperties;
};
AccountsSummaryItem.SearchItem = (props: SearchItemProps) => (
  <CustomSearchInput
    inputStle={{ outline: "none", height: "24px", width: "100px" }}
    placeholder={props.placeholder}
    iconStyles={{ height: "8px", color: "#6F7269" }}
  />
);
type FilterProps = {
  buttonName: string;
  icon: ReactNode;
  buttonstyle?: CSSProperties;
};
AccountsSummaryItem.Filter = (props: FilterProps) => (
  <CustomButton
    buttonName={props.buttonName}
    icon={props.icon}
    buttonStyle={{
      display: "flex",
      alignItems: "center",
      border: "1px solid #E6E6E6",
      gap: "8px",
      borderRadius: "8px",
      padding: "8px",
    }}
  />
);

type bodyProps = {
  accountData: DataType[];
  onClick?:(e:any)=>void
};

AccountsSummaryItem.Body = (props: bodyProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {props.accountData.map((data) => (
        <div key={data.id}>
          <AccountsBalanceOverview
            icon={data.icon}
            accountName={data.accountName}
            accountBalance={data.accountBalance}
            imageBackgroundcolor={data.bgcolor}
            imageColor={data.imgcolor}
            onClick={props.onClick}
          />
        </div>
      ))}
    </div>
  );
};
