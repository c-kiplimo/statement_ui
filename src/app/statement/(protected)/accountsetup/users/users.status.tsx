
import React, { useEffect, useMemo, useState } from "react";
import CustomTable, { DataFetcher } from "../widgets/table/table";
import { Select, Spin } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./users.status.module.css";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import { UsersAction } from "@/src/lib/actions/account.users.action";
import AccountProfilePage from "@/src/components/widgets/userStatus/account.profile/account.profile";
import { AccountsProfile } from "@/src/lib/actions/accountprofile.action";
import { profilesTypeprops } from "../account-profile/account.profile";
import AddItem from "@/src/components/atoms/add-item/add.item";
import RemoveUserModal from "../page-manupilation/remove-from-page/user/remove.user";
import AddUserModal from "../widgets/forms/add.form";

const { Option } = Select;

type UserIdProps = {
  userId?: number;
};

interface DataType {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icon?: React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const AccountsStatus = (props: UserIdProps) => {
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
  const [profile, setProfile] = useState<profilesTypeprops | null>(null);
  const [removeUser, setRemoveUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [dataId, setDataId] = useState<number | null>(null);
  const [passedAccId, setPassedAccId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(dataId);
  
  useEffect(() => {
    const passedAccId = sessionStorage.getItem("passedaccountId");
  
    
    if (passedAccId) {
      setPassedAccId(parseInt(passedAccId));
    }
  }, []);

  useEffect(() => {
    if (!passedAccId) return;

    const fetchProfileData = async () => {
      try {
        const accountProf = await AccountsProfile(passedAccId);
        setProfile(accountProf);
      } catch (error) {
        console.error("Failed to fetch profile details", error);
      }
    };

    fetchProfileData();
  }, [passedAccId]);

  useEffect(() => {
    if (!passedAccId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const incomingAccountId = await UsersAction(passedAccId);
        console.log(incomingAccountId);
        
        setIncomingData(incomingAccountId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [passedAccId]);

  const handleRoleChange = (value: string, id: React.Key) => {
  
  };

  const handleRemoveClick = (entryId: number) => {
    setDataId(entryId);
    setRemoveUser(true);
  };

  const handleAddUserClick = () => {
    setAddUser(true);
  };

  const columns: Datatype[] = [
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
            <div className={styles.timestyles}>{time}</div>
          </div>
        );
      },
    },

    {
      title: "User Name",
      dataIndex: "userName",
      render: (text) => <span className={styles.UserName}>{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <Select
          className={styles.selectdiv}
          defaultValue={text}
          onChange={(value) => handleRoleChange(value, record.id!)}
        >
          <Option className={styles.option} value="Admin">Admin</Option>
          <Option className={styles.option} value="Viewer">Viewer</Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={styles.activediv}
          style={{
            color: record.status === "DISABLED" ? "red" : "",
            background: record.status === "DISABLED" ? "#FEDEE5" : "",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: (_, record) => (
        <div
          className={styles.icons}
          onClick={() => handleRemoveClick(Number(record.id))}
        >
          <img src="/trash.svg" alt="trash" />
        </div>
      ),
    },
  ];

  const numberOfUsers = incomingData.length;

  const getLastLoginTime = useMemo(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const incomingAccountId = await UsersAction(passedAccId!);
      setIncomingData(incomingAccountId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {profile && (
        <AccountProfilePage
          icon={<img src="/teamusericon.png" alt="teamusericon" />}
          lastSeenTime={`Last login on ${getLastLoginTime}`}
          accountId={profile.accountId}
          accountName={profile.accountTitle}
          numberOfusers={`(${numberOfUsers} users)`}
          currency={profile.currency}
        />
      )}
      <div className={styles.headerdiv}>
        <div className={styles.textdiv}>Users Overview</div>
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
            title={"Add User"}
            icon={<PlusOutlined />}
            iconStyle={{ color: "gray" }}
            titleStyle={{ color: "gray" }}
            onClick={() => handleAddUserClick()}
          />
        </div>
      </div>
      <CustomTable
        data={incomingData}
        pageSize={2}
        total={500}
        columns={columns}
      />
      <RemoveUserModal
        visible={removeUser}
        onCancel={() => setRemoveUser(false)}
        userId={dataId!} 
        onRefreshData={fetchData}
      />
      <AddUserModal
        visible={addUser}
        roleOptions={["ADMIN", "VIEWER"]}
        statusOptions={["ACTIVE", "DISABLED"]}
        accountId={passedAccId!}
        closeIcon={<CloseOutlined />}
        onCancel={() => setAddUser(false)}
        fetchData={fetchData}
      />

      {loading && (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AccountsStatus;
