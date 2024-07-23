import React, { useEffect, useState, useMemo } from "react";
import styles from "./users.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import {
  CloseCircleOutlined,
  CloudDownloadOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import UsersTable from "@/src/components/widgets/users-table/users-table";
import { RegisteredUserAction } from "@/src/lib/actions/registered.user.action";
import { notification } from "antd";
import { ColumnsType } from "antd/lib/table";
import TableButton from "@/src/components/widgets/table-button/table-button";
import moment from "moment";
import AddUserButton from "@/src/components/widgets/add.user.button/add.user.button";
import { useRouter } from "next/navigation";

type userProps = {
  customerId: number;
};

const UsersHome = ({ customerId }: userProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<RegisteredUser[]>([]);

  const fetchUsers = async () => {
    if (customerId !== null && customerId !== undefined) {
      setLoading(true);
      try {
        const response = await RegisteredUserAction(customerId);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: "There was an error while fetching users. Please try again later.",
          description: '',
          icon: <CloseCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr failure-notification', 
          placement: 'topRight',
          duration: 1,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [customerId]);

  const filteredUsers = useMemo(()=>{
    if(!searchTerm) return users;

    return users.filter(user=>[
      user.userName,user.mobileNumber,user.email].some(field=>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  },[searchTerm,users]);
  
  const userColumns: ColumnsType<RegisteredUser> = [
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Joined On",
      dataIndex: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <TableButton>
          <TableButton.Icon>
            <MoreOutlined />
          </TableButton.Icon>
        </TableButton>
      ),
    },
  ];

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const handleClick = () => {
    router.push('/statement/user-management/users/create-user');
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title={"Registered User"}
          titleStyle={{ fontWeight: "700", fontSize: "20px" }}
        />
        <div className={styles.buttons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearch} />
          </SearchButton>
          <FilterButton onClick={handleClick} />
          <DownloadWidget>
            <DownloadWidget.Icon>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
          <AddUserButton onClick={handleClick} buttonStyles={{ background: '#003A49', color: '#FFFFFF' }} />
        </div>
      </div>
      <UsersTable columns={userColumns} data={filteredUsers}/>
    </div>
  );
};

export default UsersHome;
