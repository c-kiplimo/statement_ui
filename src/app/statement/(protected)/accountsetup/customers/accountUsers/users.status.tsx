import React, { ReactNode, useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { EditOutlined, EyeOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "./users.status.module.css";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import { UsersAction } from "@/src/lib/actions/account.users.action";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import { profilesTypeprops } from "../../account-profile/account.profile";
import { AccountsProfile } from "@/src/lib/actions/accountprofile.action";
import AccountProfilePage from "@/src/components/widgets/userStatus/account.profile/account.profile";

type userid = {
  userId?: number;
};

const { Option } = Select;

interface DataType {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icon?: ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const Accountsstatus = (props: userid) => {
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [profile, setProfile] = useState<profilesTypeprops | null>(null);
  

  const handleRoleChange = async (value: string, id: React.Key) => {
    
    console.log(`Changed role to ${value} for user ID ${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const data = await UsersAction(props.userId!);
        setIncomingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [props.userId]);

  useEffect(() => {
    const passedAccid = sessionStorage.getItem("passedaccountId");
    if (!passedAccid) return;

    const fetchProfileData = async () => {
      try {
        const accountProf = await AccountsProfile(parseInt(passedAccid));
        setProfile(accountProf);
      } catch (error) {
        console.error('Failed to fetch profile details', error);
      }
    };

    fetchProfileData();
  }, []);

  const columns: Datatype[] = [
    {
      title: "Created On",
      dataIndex: "createdOn",
      render: (text) => <span className={styles.createdOn}>{text}</span>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
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
          <Option value="Admin">Admin</Option>
          <Option value="Viewer">Viewer</Option>
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
            color: record.status === "Disabled" ? "red" : "",
            background: record.status === "Disabled" ? "#FEDEE5" : "",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: () => (
        <div className={styles.icons}>
          <EyeOutlined /> <MinusOutlined /> <EditOutlined />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        {profile && (
          <AccountProfilePage
            icon={<img src="/teamusericon.png" alt="teamusericon" />}
            lastSeenTime={"Last login on 45 minutes ago"}
            accountId={profile.accountId}
            accountName={profile.accountTitle}
            numberOfusers={"(12 users)"}
            currency={profile.currency}
          />
        )}
      </div>
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
        </div>
      </div>
      {loadingData ? (
        <Spin />
      ) : (
        <CustomTable
          data={incomingData}
          pageSize={3}
          total={10}
          columns={columns}
        />
      )}
    </div>
  );
};

export default Accountsstatus;
