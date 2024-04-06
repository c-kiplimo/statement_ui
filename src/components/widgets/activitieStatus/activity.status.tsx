import React from "react";
import styles from "./activity.status.module.css";
import LastLogin from "../userStatus/user.login.status";
import TransactionHistory from "../../atoms/table/antdtable/antdtable";
import Search from "../../atoms/search/search";
import Filter from "../../atoms/filter/filter";
import Sort from "../../atoms/sort/sort";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

type activitiesProps = {
  title: string;
};

const transactionData = [
  {
    key: 1,
    date: "02/02/2023",
    transRef: "FT102QF66788",
    paymentDetails: "Monthly sales",
    moneyIn: "2,500,000",
    moneyOut: "",
    balance: "16,000,000",
  },

  {
    key: 1,
    date: "02/02/2023",
    transRef: "FT102245LOP89",
    paymentDetails: "Electricity",
    moneyIn: "",
    moneyOut: "-1,000,000",
    balance: "15,000,000",
  },
  {
    key: 1,
    date: "02/02/2023",
    transRef: "FT102245LOP89",
    paymentDetails: "Mobi AT-DPC",
    moneyIn: "4,500,450",
    moneyOut: "15,000,000",
    balance: "16,500,450",
  },
  {
    key: 1,
    date: "02/02/2023",
    transRef: "FT102245LOP89",
    paymentDetails: "Mobi AT-DPC",
    moneyIn: "4,500,450",
    moneyOut: "15,000,000",
    balance: "16,500,450",
  },
  {
    key: 1,
    date: "02/02/2023",
    transRef: "FT102245LOP89",
    paymentDetails: "Mobi AT-DPC",
    moneyIn: "4,500,450",
    moneyOut: "15,000,000",
    balance: "16,500,450",
  },
  {
    key: 1,
    date: "02/02/2023",
    transRef: "FT102245LOP89",
    paymentDetails: "Bill",
    moneyIn: "40,450",
    moneyOut: "15,000,000",
    balance: "16,500,450",
  },
  {
    key: 1,
    date: "02/03/2023",
    transRef: "FT167245LOP89",
    paymentDetails: "Mobi AT-DPC",
    moneyIn: "4,500,450",
    moneyOut: "15,000,000",
    balance: "16,500,450",
  },
  {
    key: 1,
    date: "02/04/2023",
    transRef: "FT1023u45LOP89",
    paymentDetails: "Transport",
    moneyIn: "4,500,450",
    moneyOut: "15,000,000",
    balance: "",
  },
];

const Activitystatus = (props: activitiesProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topDiv}>
        <LastLogin
          userName={"Meraki systems tech"}
          mail={"merakitech.ac.rw"}
          town={"Kampala Uganda"}
          timezone={"( GMT -11:46) Greenwich mean Time zone"}
          icon={<img src="/teamusericon.png" alt="teamusericon" />}
          lastSeenTime={"Last login on 45 minutes ago"}
          accounts={"Accounts"}
          users={"Users"}
          activities={"Activity"}
          restrictions={"Restrictions"}
        />
      </div>

      <div className={styles.lowerDiv}>
        <div className={styles.headiv}>
          <div className={styles.title}>
            <div className={styles.text}>{props.title}</div>
          </div>
          <div className={styles.filtsearchsort}>
            <Search title={"Search"} icon={<SearchOutlined />} />
            <Filter title={"Filter"} icon={<FilterOutlined />} />
            <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
          </div>
        </div>
        <div className={styles.table}>
          <TransactionHistory data={transactionData} />
        </div>
      </div>
    </div>
  );
};

export default Activitystatus;
