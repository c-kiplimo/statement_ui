import React, { ReactNode, useState } from "react";
import AccountsFilterItem from "../accounts-filter-item/accounts.filter.item";
import styles from "./cardtype.details.info.module.css";
import SelectionCard from "../card-info/card-info-radio";
import Button from "../../atoms/button/custom.button";
import Link from "next/link";

interface DataTypes {
  id: number;
  icon: ReactNode;
  accountName: string;
  accountInfo: string;
}

type CardtypeDetailsInfoProps = {
  cardTitle: string;
  filterIcon: ReactNode;
  addIcon: ReactNode;
  cardTypedata: DataTypes[];
};

const CardtypeDetailsInfo = (props: CardtypeDetailsInfoProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AccountsFilterItem
          headerTitle={props.cardTitle}
          filterIcon={props.filterIcon}
          addIcon={props.addIcon}
        />
      </div>
      <div className={styles.body}>
        {props.cardTypedata.map((account) => (
          <Link href={"/statement/dashboard/accounts/singleCard/" + account.id} key={account.id}>
            <div className="mt-3">
              <SelectionCard
                id={account.id.toString()}
                icon={account.icon}
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
        <Link href={"/statement/dashboard/accounts/viewmore"}>
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
