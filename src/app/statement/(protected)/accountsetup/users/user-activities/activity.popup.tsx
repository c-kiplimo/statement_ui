import React from 'react'
import styles from "./activity.popup.module.css"
import UserAcctStatus from '../../widgets/users-view-widget/user.groups'
import { CloseOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import CustomTable from '../../widgets/table/table'
import AddItem from "@/src/components/atoms/add-item/add.item";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Link from "next/link";

const ActivityPopup = () => {
    interface ActivityData {
        id: React.Key;
        createdOn?: string;
        userName?: string;
        role?: string;
        status?: string;
        icons?: React.ReactNode;
        currency?:string;
      }
      
      interface CustomColumn {
        title: string;
        dataIndex: keyof ActivityData;
        render?: (text: any, record: ActivityData, index: number) => React.ReactNode;
      }
      
      const columns: CustomColumn[] = [
        {
          title: "Date",
          dataIndex: "createdOn",
          render: (text: any, record: any) => ( 
            <span className={styles.date}>
              <span className={styles.account}>{text}</span>
              <span className={styles.currency}>{record.currency}</span>
            </span>
          ),
        },
        {
          title: "Activity Name",
          dataIndex: "userName",
          render: (text) => <span className={styles.ActivityName}>{text}</span>,
        },
        {
          title: "Description",
          dataIndex: "role",
          render: (text) => (
            <span className={styles.description}>{text}</span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
          render: (text, record) => {
            let color = "";
            let backgroundColor = "";
      
            switch (record.status) {
              case "Completed":
                color = "#17D05B";
                backgroundColor = "#DFF0D8";
                break;
              case "Pending":
                color = "orange";
                backgroundColor = "#FCF8E3";
                break;
              default:
                color = "";
                backgroundColor = "";
                break;
            }
      
            return (
              <span
                style={{ color: color, backgroundColor: backgroundColor }}
                className={styles.status}
              >
                {text}
              </span>
            );
          },
        },
        {
          title: "",
          dataIndex: "icons",
          render: () => (
            <Link href="/statement/accountsetup/users">
            <button className={styles.iconsdiv}>
              <EyeOutlined />
            </button>
            </Link>)
        },
      ];
      
      const data: ActivityData[] = [
        {
          id: 1,
          createdOn: "23-05-2023",
          currency: "10:45 a.m",
          userName: "Downloaded statement",
          role: "Description",
          status: "Active",
        },
        {
          id: 2,
          createdOn: "23-05-2023",
          currency: "10:45 a.m",
          userName: "Downloaded statement",
          role: "Description",
          status: "Completed",
        },
        {
          id: 3,
          createdOn: "23-05-2023 ",
          currency: "10:45 a.m",
          userName: "Downloaded statement",
          role: "Description",
          status: "Pending",
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
            <div className={styles.textdiv}>Account Activity</div>
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
      <CustomTable
        data={data}
        pageSize={4}
        total={10}
        columns={columns}
      />
    </div>
    </div>
    </div>
  )
}

export default ActivityPopup
