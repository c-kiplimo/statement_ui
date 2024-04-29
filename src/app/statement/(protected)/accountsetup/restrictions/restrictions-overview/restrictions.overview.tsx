import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./restrictions.overview.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import AddItem from "@/src/components/atoms/add-item/add.item";
import RemoveRestrictionModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/remove-from-page/restriction/remove.restriction";
import EditPageModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/edit-page/edit.page";
import Link from "next/link";
import { RestrictionsAction } from "@/src/lib/actions/customer.restrictions.action";
import CreateRestrictionModal from "../../page-manupilation/Add-in-page/createRestriction/create.restriction";

interface DataType {
  id: React.Key;
  createdOn?: any;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const RestrictionsOverview =  () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [data, setData]=useState< DataFetcher[]>([]);

  useEffect(()=>{
    async function fetchData() {
        let incomingTableDta = await RestrictionsAction(1);
        setData(incomingTableDta)
    }
    fetchData();
  },[]);

  const handleRemoveClick = () => {
    setModalVisible2(true);
  };

  const handleEditClick = () => {
    setModalVisible3(true);
  };
  const columns: Datatype[] = [
    {
      title: "Date",
      dataIndex: "createdOn",
      render: (text) => <span className={styles.createdOn}>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "role",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, _record) => (
        <span className={styles.activediv}>{text}</span>
      ),
    },
    {
      title: "",
      dataIndex: "icons",
      render: () => (
        <button className={styles.iconsdiv}>
          <div className={styles.icons}>
            <EyeOutlined />
            <MinusOutlined onClick={handleRemoveClick} />
            <EditOutlined onClick={handleEditClick} />
          </div>
        </button>
      ),
    },
  ];


  // let incomingTableDta = await RestrictionsAction(1)
  



  const handleModalCancel1 = () => {
    setModalVisible1(false);
  };

  const handleModalCancel2 = () => {
    setModalVisible2(false);
  };

  const handleModalCancel3 = () => {
    setModalVisible3(false);
  };




  return (
    <div className={styles.container}>
      <div className={styles.topdiv}>
        <LastLogin
          userName={"Meraki System Tech"}
          mail={"Banking Industry"}
          town={"Kampala Uganda"}
          timezone={"( GMT -11:46) Greenwich mean Time zone"}
          icon={<img src="/teamusericon.png" alt="teamusericon" />}
          lastSeenTime={"Last login on 45 minutes ago"}
          button1={
            <Link href="/statement/accountsetup/accounts">Accounts</Link>
          }
          button3={<Link href="/statement/accountsetup/users">Users</Link>}
          button2={
            <Link href="/statement/accountsetup/activities">Activity</Link>
          }
          button4={
            <Link href="/statement/accountsetup/restrictions/restrictions-overview">
              Restrictions
            </Link>
          }
          titleDescription={"Corporate customer"}
        />
      </div>

      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Restrictions</div>
          <div className={styles.atomsdiv}>
            <Search
              title={"Search..."}
              icon={<img src="/searchicon.svg" alt="searchicon" />}
            />
            <Filter
              title={"Filter"}
              icon={<img src="/funnel.svg" alt="funnel" />}
            />
            <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />

            <AddItem
              title={"Add Restriction"}
              icon={<PlusOutlined />}
              iconStyle={{ color: "gray" }}
              titleStyle={{ color: "gray" }}
              onClick={() => setModalVisible1(true)}
            />
          </div>
        </div>
        <CustomTable data={data} pageSize={2} total={10} columns={columns} />
      </div>
      <CreateRestrictionModal
        visible={modalVisible1}
        onCancel={handleModalCancel1}
      />
      <RemoveRestrictionModal
        visible={modalVisible2}
        onCancel={handleModalCancel2}
      />
      <EditPageModal visible={modalVisible3} onCancel={handleModalCancel3} />
    </div>
  );
};

export default RestrictionsOverview;
