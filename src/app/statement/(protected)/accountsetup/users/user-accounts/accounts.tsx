import React from "react";
import UserAcctStatus from "../../widgets/users-view-widget/user.groups";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import styles from "./accounts.module.css";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import AddItem from "@/src/components/atoms/add-item/add.item";
import CustomTable from "../../widgets/table/table";
import { Currency } from "lucide-react";

const Accounts = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "createdOn",
      render: (text: string) => {
        const [date, time] = text.split(" ");

        return (
          <div className={styles.dateTime}>
            <span className={styles.top}>{date}</span>
            <br />
            <span className={styles.lower}>{time}</span>
          </div>
        );
      },
    },
    {
      title: "Account Number",
      dataIndex: "userName",
      render: (text: string) => {
        const [account, currency] = text.split(" ");

        return (
          <div className={styles.accountCurrency}>
            <span className={styles.top}>{account}</span>
            <br />
            <span className={styles.lower}>{currency}</span>
          </div>
        );
      },
    },
    {
      title: "Account Name",
      dataIndex: "currency",
      render: (text: string) => (
        <span className={`${styles.accName} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "settings",
      render: (text: string) => (
        <span className={`${styles.status} bodyr`}>{text}</span>
      ),
    },
    {
      title: "",
      dataIndex: "icons",
      render: () => (
        <Link href="/statement/accountsetup/users">
          <button className={styles.icon}>
            <img src="/delete.svg" alt="delete" />
          </button>
        </Link>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      createdOn: "23-05-2023 10:45a.m",
      userName: "0032-7650-8820 KES  132314245",
      currency: "Meraki Systems Tech",
      settings: "Pending",
    },

    {
      id: 2,
      createdOn: "23-05-2023 10:45a.m",
      userName: "0032-7650-8820 KES  132314245",
      currency: "Meraki Systems Tech",
      settings: "Pending",
    },

    {
      id: 2,
      createdOn: "23-05-2023 10:45a.m",
      userName: "0032-7650-8820 KES  132314245",
      currency: "Meraki Systems Tech",
      settings: "Pending",
    },

    {
      id: 4,
      createdOn: "23-05-2023 10:45a.m",
      userName: "0032-7650-8820 KES  132314245",
      currency: "Meraki Systems Tech",
      settings: "Pending",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cancel}>
        <CloseOutlined />
      </div>
      <UserAcctStatus
        userIcon={<img src="/userIcon.svg" alt="userIcon" />}
        title={"Abia Mbabazi"}
        titleDescript={"Viewer"}
        lastseen={"Last login on 45 minutes ago"}
        button1={"Groups"}
        button2={"Accounts"}
        button3={"Activity"}
        button4={"Contact Details"}
        button5={"Two-factor Authentication"}
        mail={"abbymbabazi@gmail.com"}
        location={"Kigali-Rwanda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        updatebttn={"Update User"}
      />
      <div className={styles.lowerDiv}>
        <div className={styles.tableHeader}>
          <div className={styles.headerdiv}>
            <div className={`${styles.textdiv} h6b`}>Accounts</div>
            <div className={styles.atomsdiv}>
              <Search
                title={"Search"}
                icon={<img src="/searchicon.svg" alt="searchicon" />}
              />
              <Filter
                title={"Filter"}
                icon={<img src="/funnel.svg" alt="funnel" />}
              />
              <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
              <AddItem
                title={"Add user"}
                icon={<PlusOutlined />}
                iconStyle={{ color: "gray" }}
                titleStyle={{ color: "gray" }}
              />
            </div>
          </div>
        </div>
      </div>
      <CustomTable data={data} pageSize={2} total={10} columns={columns} />
    </div>
  );
};

export default Accounts;
