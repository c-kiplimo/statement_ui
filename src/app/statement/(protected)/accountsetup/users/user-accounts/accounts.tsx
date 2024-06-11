import React, { useEffect, useState } from "react";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import styles from "./accounts.module.css";
import Link from "next/link";
import {PlusOutlined } from "@ant-design/icons";
import AddItem from "@/src/components/atoms/add-item/add.item";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import Search from "../../widgets/search/search";
import { CustomerUserAccountAction } from "@/src/lib/actions/customer.user.accounts.action";


  const columns = [
    {
      title: "Date",
      dataIndex: "createdOn",
      render: (text: string) => {
        const [date] = text.split(" ");

        return (
          <div className={styles.groupStyles}>
            <div className={styles.top}>{date}</div>
            <br />
          </div>
        );
      },
    },
    {
      title: "Account Number",
      dataIndex: "id",
      render: (text: string) => {
        const [account, currency] = text.split(" ");

        return (
          <div className={styles.groupStyles}>
            <span className={styles.top}>{account}</span>
            <br />
            <span className={styles.lower}>{currency}</span>
          </div>
        );
      },
    },
    {
      title: "Account Name",
      dataIndex: "userName",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
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

  type idProps ={
    userId:string;
  }

  const UserAccounts = ({userId}:idProps) => {

    const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);



    useEffect(() => {
      const fetchData = async () => {
        if (userId !== undefined) {
          try {
            const data = await CustomerUserAccountAction(parseInt(userId));
            
            setIncomingData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
  
          }
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className={styles.container}>
      <div className={styles.lowerDiv}>
        <div className={styles.tableHeader}>
            <div className={styles.atomsdiv}>
            <div className={`${styles.textdiv} h6b`}>Accounts</div>

            <div className={styles.fileimports}>
              <Search
                title={"Search"}
                icon={<img src="/search.svg" alt="search" />}
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
      
      <CustomTable data={incomingData} pageSize={2} total={10} columns={columns} />
    </div>
  );
};

export default UserAccounts;
