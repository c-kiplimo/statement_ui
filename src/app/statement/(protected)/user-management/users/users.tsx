<<<<<<< HEAD
import React, { useEffect, useState, useMemo } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> f626722 (Adding users table)
import styles from "./users.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import {
  CloudDownloadOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import UsersTable from "@/src/components/widgets/users-table/users-table";
import { RegisteredUserAction } from "@/src/lib/actions/registered.user.action";
import { notification } from "antd";
import { ColumnsType } from "antd/lib/table";
import TableButton from "@/src/components/widgets/table-button/table-button";
import moment from "moment";

type userProps = {
  customerId: number;
};

const Users = ({ customerId }: userProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  //const [filteredUsers, setFilteredUsers] = useState<RegisteredUser[]>([]);

  const fetchUsers = async () => {
    if (customerId !== null && customerId !== undefined) {
      setLoading(true);
      try {
        const response = await RegisteredUserAction(customerId);
        setUsers(response);
        //setFilteredUsers(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: "Error fetching data",
          description:
            "There was an error while fetching users. Please try again later.",
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

  const handleClick = () => {};
  
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
          <AddItems onClick={() => {}} buttonStyles={{ backgroundColor: "#003A49", color: "white" }}>
              <AddItems.Icon>
                <PlusOutlined />
              </AddItems.Icon>
              <AddItems.Text text="Add Group " />
            </AddItems>
        </div>
      </div>
      <UsersTable columns={userColumns} data={filteredUsers}/>
    </div>
  );
};

export default Users;
