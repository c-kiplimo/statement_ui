import React, { CSSProperties, ReactNode, useContext, useState } from "react";
import AccountsFilterItem from "../accounts-filter-item/accounts.filter.item";
import styles from "./account.details.card.module.css";
import Button from "../../atoms/button/custom.button";
import SelectionCard from "../card-info/card-info-radio";
import Link from "next/link";
import CustomSearchInput from "../../atoms/input/custom-search-input";
import { ProfileContext } from "@/src/app/statement/(protected)/dashboard/context/customerContext";

export type AccountDataHome = {
    id: number,
    icon?:ReactNode,
    accountName: string,
    accountInfo: string,
  }
type AccountDetailsCardProps = {
  headerTitle: string;
  filterIcon: ReactNode;
  addIcon: ReactNode;
  buttonName: string;
  padding: string;
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
  cardDetailsData:AccountDataHome[]
};

const AccountDetailsCard = (props: AccountDetailsCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filterSelected,setFilterSelected ] = useState(false);
  const {custId} = useContext(ProfileContext)

  const selectFilter = ()=>{
    setFilterSelected(!filterSelected);   
     
  }

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };

  return (
    <div className={`${styles.container} `}>
      <div className={styles.header}>
        <AccountDetailsCard.Title
          headerTitle={props.headerTitle}
          filterIcon={props.filterIcon}
          addIcon={props.addIcon}
          onClick={selectFilter}
        />
      </div>
      <div className={filterSelected ? styles.filterSelected : styles.search}>
        <CustomSearchInput inputStle={{outline:'none', width:'300px', }} iconStyles={{color:'gray'}} placeholder="Filter Keyword" />
      </div>
      <div className={styles.cardBody}>
        {props.cardDetailsData.map((account) => (
          <Link
            href={"/statement/dashboard/accounts/singleAccount/" + account.id}
            key={account.id}
          >
            <div className="mb-2">
              <SelectionCard
                id={account.id.toString()}
                icon={<img src={`/${account.icon}`}/>}
                label={account.accountName}
                description={account.accountInfo}
                name="card-info"
                borderColor="#84BD00"
                activeCardId={selectedOption}
                onSelection={() => handleOptionChange(account.id)}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.button}>
      <Link href={"/statement/dashboard/accounts/" + custId}>
        <AccountDetailsCard.ViewButton
          buttonname={props.buttonName}
          padding={props.padding}
          width={props.width}
          height={props.height}
          backgroundColor={props.backgroundColor}
          color={props.color}
          borderRadius={props.borderRadius}
        />
        </Link>
      </div>
    </div>
  );
};

export default AccountDetailsCard;

type titleProps = {
  headerTitle: string;
  headerStyle?: CSSProperties;
  filterIcon: ReactNode;
  filterIconStyle?: CSSProperties;
  addIcon: ReactNode;
  addIconStyle?: CSSProperties;
  onClick?:(e:any)=>void
};
AccountDetailsCard.Title = (props: titleProps) => (
  <AccountsFilterItem
    headerTitle={props.headerTitle}
    filterIcon={props.filterIcon}
    addIcon={props.addIcon}
    onClick={props.onClick}
  />
);

type BtnProps = {
  buttonname: string;
  btnStyle?: CSSProperties;
  padding: string;
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
};

AccountDetailsCard.ViewButton = (props: BtnProps) => (
  <div>
      <Button
        buttonName={props.buttonname}
        buttonStyle={{
          padding: props.padding,
          width: props.width,
          height: props.height,
          backgroundColor: props.backgroundColor,
          color: props.color,
          borderRadius: props.borderRadius,
        }}
      />
  </div>
);
