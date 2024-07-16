import React, { ReactNode, useState } from "react";
import AccountsFilterItem from "../accounts-filter-item/accounts.filter.item";
import styles from "./cardtype.details.info.module.css";
import SelectionCard from "../card-info/card-info-radio";
import Button from "../../atoms/button/custom.button";
import Link from "next/link";
import CustomSearchInput from "../../atoms/input/custom-search-input";

export interface CardDataHome {
  id: number;
  icon?: ReactNode;
  accountName: string;
  accountInfo: string;
}

type CardtypeDetailsInfoProps = {
  cardTitle: string;
  filterIcon: ReactNode;
  addIcon: ReactNode;
  cardTypedata: CardDataHome[];
};

const CardtypeDetailsInfo = (props: CardtypeDetailsInfoProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filterSelected,setFilterSelected ] = useState(false);


  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };

  const selectFilter = ()=>{
    setFilterSelected(!filterSelected);   
     
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AccountsFilterItem
          headerTitle={props.cardTitle}
          filterIcon={props.filterIcon}
          addIcon={props.addIcon}
          onClick={selectFilter}
        />
      </div>
      <div className={filterSelected ? styles.filterSelected : styles.search}>
        <CustomSearchInput inputStle={{outline:'none', width:'250px', }} iconStyles={{color:'gray'}} placeholder="Filter Keyword" />
      </div>
      <div className={styles.body}>
        {props.cardTypedata.map((account) => (
          <Link href={"/statement/dashboard/accounts/singleCard/" + account.id} >
            <div className="mt-3" key={account.id}>
              <SelectionCard
                id={account.id.toString()}
                icon={<img src={`/${account.icon}`}/>}
                label={account.accountName}
                description={account.accountInfo}
                name="card-info"
                borderColor="#4272DD"
                activeCardId={selectedOption}
                onSelection={() => handleOptionChange(account.id)}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.button}>
        <Link href={""}>
        <Button
          buttonName={"View More"}
          buttonStyle={{
            color: "#84BD00",
            width: "138px",
            height: "40px",
            fontSize: "16px",
            backgroundColor: "#EFF2E6",
            borderRadius: "27px",
          }}
        />
        </Link>
      </div>
    </div>
  );
};

export default CardtypeDetailsInfo;
