import React, { useState } from "react";
import {EditOutlined,EyeOutlined,MinusOutlined,PlusOutlined} from "@ant-design/icons";
import styles from "./restrictions.overview.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import CustomTable from "../../widgets/table/table";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import AddItem from "@/src/components/atoms/add-item/add.item";
import CreateRestrictionModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/Add-in-page/create.restriction";
import RemoveRestrictionModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/remove-from-page/restriction/remove.restriction"
import EditPageModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/edit-page/edit.page"

interface DataType {
  id: React.Key;
  createdOn?: any;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
}

let removeRestrictionClick: React.MouseEventHandler<HTMLSpanElement> | undefined;

let editRestrictionClick: React.MouseEventHandler<HTMLSpanElement> | undefined;
interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}
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
    render: (text, _record) => <span className={styles.activediv}>{text}</span>,
  },
  {
    title: "",
    dataIndex: "icons",
    render: () => (
      <button className={styles.iconsdiv}>
        <div className={styles.icons}>
          <EyeOutlined />
          <MinusOutlined onClick={ removeRestrictionClick} />
          <EditOutlined onClick={ editRestrictionClick}/>
        </div>
      </button>
    ),
  },
];

const data: DataType[] = [
  {
    id: 1,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Staff expenses",
    role: "Staff exp",
    status: "Active",
  },
  {
    id: 2,
    createdOn: "2024-04-10",
    userName: "Send money",
    role: "1,000,000 per day",
    status: "Active",
  },
  {
    id: 3,
    createdOn: "2024-04-10",
    userName: "Withdraw money",
    role: "Staff exp",
    status: "Active",
  },
];

const RestrictionsOverview = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const handleModalCancel1 = () => {
    setModalVisible1(false);
  };

  const handleModalCancel2 = () => {
    setModalVisible2(false);
  };

  const handleModalCancel3 = () => {
    setModalVisible3(false);
  };

  removeRestrictionClick = function click() {
    setModalVisible2(true)
  }

  editRestrictionClick = function click() {
    setModalVisible3(true)
  }

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
          button1={"Accounts"}
          button2={"Users"}
          button3={"Activity"}
          button4={"Restrictions"}
          titleDescription={"Corporate customer"}
        />
      </div>

      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Accounts</div>
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

<EditPageModal
        visible={modalVisible3}
        onCancel={handleModalCancel3}
      />
    </div>
  );
};

export default RestrictionsOverview;