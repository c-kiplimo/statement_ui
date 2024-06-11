import React, { useEffect, useState } from "react";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import styles from "./user.groups.module.css";
import Search from "@/src/components/atoms/search/search";
import { PlusOutlined } from "@ant-design/icons";
import AddItem from "@/src/components/atoms/add-item/add.item";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import { CustomerUserGroupsAction } from "@/src/lib/actions/customer.user.groups.action";
import AddUserGroupsModal from "./add-user-group/add.user.groups";
import { Modal } from "antd";



const columns = [
  {
    title: "Groups",
    dataIndex: "userName",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdOn",
    render: (text: string) => {
      const dateTime = new Date(text);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return (
        <div className={styles.date}>
          <div className={styles.dateStyles}>{date}</div>
          <div className={styles.timestyle}>{time}</div>
        </div>
      );
    },
  },
  {
    title: "Joined On",
    dataIndex: "joinedOn",
    render: (text: string) => {
      const dateTime = new Date(text);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return (
        <div className={styles.date}>
          <div className={styles.dateStyles}>{date}</div>
          <div className={styles.timestyle}>{time}</div>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "icons",
    render: () => (
      <button className={styles.icon}>
        <img src="/delete.svg" alt="delete" />
      </button>
    ),
  },
];

type idProps = {
  userId: string;
};

const UserGroups = ({ userId }: idProps) => {
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      if (userId !== undefined) {
        try {
          const data = await CustomerUserGroupsAction(parseInt(userId));
          setIncomingData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  const showModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lowerDiv}>
        <div className={styles.tableHeader}>
          <div className={styles.headerdiv}>
            <div className={`${styles.textdiv} h6b`}>Groups</div>
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
                onClick={() => showModal(parseInt(userId))}
                iconStyle={{ color: "gray" }}
                titleStyle={{ color: "gray" }}
              />
            </div>
          </div>
        </div>
      </div>
      <CustomTable data={incomingData} columns={columns} pagination={false}  />
      <Modal footer={false} width={669} open={isModalOpen} onCancel={handleCancel}>
        <AddUserGroupsModal accountId={selectedUserId!} />
      </Modal>
    </div>
  );
};

export default UserGroups;
