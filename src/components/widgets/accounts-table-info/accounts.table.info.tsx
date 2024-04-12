import React, { CSSProperties, ReactNode, useState } from "react";
import AccountsOverviewDetailsCard from "../accounts-overview-details-card/accounts-overview-details-card";
import styles from "./accounts.table.info.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import CustomSearchInput from "../../atoms/input/custom-search-input";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";

interface AccountDetail {
  key: number;
  accountName: string;
  accountNumber: string;
  currentBalance: string;
}

interface DataType {
  id: number;
  accountIcon: ReactNode;
  accountTitle: string;
  amount: string;
  accountsbreakdownInfo: AccountDetail[];
}

type accountsTableProps = {
  accountsData: DataType[];
  title: string;
  inputPlaceholder: string;
};

const AccountsTableInfo = (props: accountsTableProps) => {
  const [isGridView, setIsGridView] = useState(false);

  const toggleGridView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AccountsTableInfo.Title title={props.title} />
      </div>
      <div className={styles.accountsinputs}>
        <div>
          <AccountsTableInfo.Search inputPlaceholder={props.inputPlaceholder} />
        </div>
        <div className={styles.headerbtn}>
          <AccountsTableInfo.Buttons
            buttonIcon={<TableOutlined />}
            buttonName="Grid"
            onClick={toggleGridView}
          />
          <AccountsTableInfo.Buttons
            buttonIcon={<UnorderedListOutlined />}
            buttonName="List"
            onClick={toggleGridView}
          />
        </div>
      </div>
      <div className={isGridView ? styles.gridBody : styles.body}>
        {props.accountsData.map((accounts) => (
          <AccountsOverviewDetailsCard
            key={accounts.id}
            svgIcon={accounts.accountIcon}
            accountTitle={accounts.accountTitle}
            amount={accounts.amount}
            data={accounts.accountsbreakdownInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountsTableInfo;

type TitleProps = {
  title: string;
};
AccountsTableInfo.Title = (props: TitleProps) => (
  <VerticalInfoDescription title={props.title} titleStyle={{}} />
);

type SearchProps = {
  inputPlaceholder: string;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
};
AccountsTableInfo.Search = (props: SearchProps) => (
  <CustomSearchInput
    inputStle={{ outline: "none" }}
    iconStyles={{ cursor: "pointer" }}
    placeholder={props.inputPlaceholder}
    onChange={props.onChange}
    onClick={props.onClick}
  />
);

type ButtonProps = {
  buttonIcon: ReactNode;
  buttonName: string;
  onClick?: () => void;
  buttonStyles?: CSSProperties;
};
AccountsTableInfo.Buttons = (props: ButtonProps) => (
  <button
    type="button"
    style={props.buttonStyles}
    className={styles.button}
    onClick={props.onClick}
  >
    {" "}
    <span>{props.buttonIcon}</span> {props.buttonName}{" "}
  </button>
);
