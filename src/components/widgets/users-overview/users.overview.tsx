import React, { ReactNode } from "react";
import styles from "./usrers.overview.module.css";
import Search from "../../atoms/search/search";
import Filter from "../../atoms/filter/filter";
import Sort from "../../atoms/sort/sort";
import AddItem from "../../atoms/add-item/add.item";
import Accountdetails from "../../atoms/table/antdtable/table";

const transactionData = [
  {
    key: 1,
    accnumber: <div className={styles.accnumber}>000129899 KES</div>,
    name: "Meraki Systems Tech",
    accstatus: (
      <div className={styles.unconfigured}>
        <img src="/configure.png" alt="configure" />
        Configured Account
      </div>
    ),
    configured: true,
  },
  {
    key: 2,
    accnumber: <div className={styles.accnumber}>000179899 KES</div>,
    name: "loans account",
    accstatus: (
      <div className={styles.statusdiv}>
        <img src="/configure.png" alt="configure" />
        Unconfigured Account
      </div>
    ),
    configured: false,
  },

  {
    key: 2,
    accnumber: <div className={styles.accnumber}>000429899 KES</div>,
    name: "loans account",
    accstatus: (
      <div className={styles.statusdiv}>
        <img src="/configure.png" alt="configure" style={{ color: "red" }} />
        Unconfigured Account
      </div>
    ),
    configured: false,
  },

  {
    key: 1,
    accnumber: <div className={styles.accnumber}>000129099 KES</div>,
    name: "Loans account",
    accstatus: (
      <div className={styles.unconfigured}>
        <img src="/configure.png" alt="configure" />
        Configured Account
      </div>
    ),
    configured: true,
  },
];

type usersoverviewProps = {
  title: string;
};

const Usersoverview = (props: usersoverviewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerdiv}>
        <div className={styles.title}>
          <div className={styles.text}>{props.title}</div>
        </div>
        <div className={styles.searchFiterSort}>
          <Search
            title={"Search"}
            icon={<img src="/searchicon.svg" alt="Search icon.svg" />}
          />
          <Filter
            title={"Filter"}
            icon={<img src="/filter.svg" alt="filter" />}
          />
          <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
          <AddItem
            title={"Add user"}
            icon={<img src="/plusIcon.svg" alt="plusIcon" />}
          />
        </div>
      </div>
      <div className={styles.bodydiv}>
        <Accountdetails
          data={transactionData.map((item) => ({
            ...item,
            className: item.configured ? "" : styles.unconfigured,
          }))}
        />
      </div>
    </div>
  );
};

export default Usersoverview;
