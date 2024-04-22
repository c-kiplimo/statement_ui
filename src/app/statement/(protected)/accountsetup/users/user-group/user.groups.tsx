import React from 'react'
import styles from "./user.groups.module.css"
import UserAcctStatus from '../../widgets/users-view-widget/user.groups'
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import AddItem from '@/src/components/atoms/add-item/add.item';
import CustomTable from '../../widgets/table/table';

interface ActivityData {
    id: React.Key;
    createdOn: string;
    currency: string;
    userName: string;
    settings?: React.ReactNode;
    icons?: React.ReactNode;
   
  }

  const columns = [
    {
      title: "Groups",
      dataIndex: "createdOn",
    },
    {
      title: "Description",
      dataIndex: "userName",
    },
    {
      title: "Date Created",
      dataIndex: "currency"
    },

    {
      title: "Joined On",
      dataIndex: "settings",
    },
    
    {
    title: "",
    dataIndex: "icons",
    render: () => (
      <Link href="/statement/accountsetup/users">
      <button className={styles.iconsdiv}>
        <img src='/delete.svg' alt='delete' />
      </button>
      </Link>
    ),
  },
]

const data: ActivityData[] = [
    {
      id: 1,
      createdOn: "Developers",
      currency: "08-03-2021",
      userName: "Description",
      settings: "10-03-2022",
    },
    {
        id: 1,
        createdOn: "Developers",
        currency: "08-03-2021",
        userName: "Description",
        settings: "10-03-2022",
      },
      {
        id: 1,
        createdOn: "Developers",
        currency: "08-03-2021",
        userName: "Description",
        settings: "10-03-2022",
      },
      {
        id: 1,
        createdOn: "Developers",
        currency: "08-03-2021",
        userName: "Description",
        settings: "10-03-2022",
      },
      {
        id: 1,
        createdOn: "Developers",
        currency: "08-03-2021",
        userName: "Description",
        settings: "10-03-2022",
      },
]


const UserGroups = () => {
  return (
    <div className={styles.container}>
         <div className={styles.cancel}>{<CloseOutlined />}</div>

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
        updatebttn={"Update User"} />

<div className={styles.lowerDiv}>
<div className={styles.tableHeader}>
      <div className={styles.headerdiv}>
        <div className={styles.textdiv}>Groups</div>
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
          <AddItem title={'Add user'} icon={<PlusOutlined/>} iconStyle={{color:"gray"}} titleStyle={{color:"gray"}}/>

        </div>
      </div>

</div>
    </div>
    <CustomTable data={data} pageSize={2} total={10} columns={columns} />
    </div>
   
  )
}

export default UserGroups
