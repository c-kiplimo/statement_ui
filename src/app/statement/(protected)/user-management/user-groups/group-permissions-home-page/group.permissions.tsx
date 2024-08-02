import React, { useCallback, useState, useMemo } from "react";
import { Button, Table, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./group.permissions.module.css";
import { CloudDownloadOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import Tags from "@/src/components/widgets/tags-widget/tags";
import CheckboxComponent from "@/src/components/widgets/checkbox/checkbox";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";

const { Option } = Select;

interface MembersData {
  key: string;
  createdOn: string;
  permissions: string;
  description: string;
  tags: string;
}

type PermissionsType = {
  groupId: string;
};

const initialData: MembersData[] = [
  {
    key: "1",
    createdOn: "2023-01-01",
    permissions: "VIEW_ACCOUNT",
    description: "Allows view transaction",
    tags: "Account",
  },
  {
    key: "2",
    createdOn: "2023-02-01",
    permissions: "VIEW_TRANSACTION",
    description: "Allows view account",
    tags: "Loan",
  },
];

const GroupsPermissions = ({ groupId }: PermissionsType) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MembersData[]>(initialData);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [localPermissions, setLocalPermissions] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  const handleSearch = useCallback((terms: string) => {
    setSearchTerm(terms);
  }, []);

  const handleDelete = useCallback(
    (key: string) => {
      const newData = data.filter((item) => item.key !== key);
      setData(newData);
    },
    [data]
  );

  const handlePermissionChange = (permission: string) => {
    setLocalPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const permissionsData = [
    {
      title: "Account Permissions",
      permissions: [
        "View Account Details",
        "View Transactions",
        "Manage Accounts",
        "Generate Account Reports",
      ],
    },
    {
      title: "Loan Permissions",
      permissions: [
        "View Loan Details",
        "View Loan Repayments",
        "Manage Loans",
        "Generate Loan Reports",
      ],
    },
    {
      title: "MT 940 Permissions",
      permissions: [
        "View MT940 Statements",
        "Statement Download",
        "Upload MT940 Statements",
        "Configure Account",
      ],
    },
    {
      title: "Card Permissions",
      permissions: [
        "View Card Details",
        "Manage Cards",
        "View Card Transactions",
        "Loan Schedule",
      ],
    },
  ];

  const handleCreateGroupModalOpen = () => {
    setCreateGroupModalVisible(true);
  };

  return (
    <div className={styles.groupUsersContainer}>
      <div className={styles.header}>
        <div className={`${styles.title} h6b`}>Group Permissions</div>
        <div className={styles.components}>
          
          <DownloadWidget>
            <DownloadWidget.Icon iconStyles={{ color: "#4272DD" }}>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>

          <AddItems
              onClick={handleCreateGroupModalOpen} 
              buttonStyles={{ backgroundColor: "#003A49", color: "white" }}
            >
              <AddItems.Icon>
                <PlusOutlined />
              </AddItems.Icon>
              <AddItems.Text text="Edit permission" />
            </AddItems>
        </div>
      </div>
      <div className={styles.checkboxdiv}>
        <div className={styles.topdiv}>
          {permissionsData.slice(0, 2).map((section) => (
            <div key={section.title} className={styles.acctpermissions}>
              <div className={`${styles.cardName} h6r`}>{section.title}</div>
              {section.permissions.map((permission) => (
                <CheckboxComponent
                  key={permission}
                  text={permission}
                  checked={true}
                  onChange={() => handlePermissionChange(permission)}
                  disabled
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.lowerdiv}>
          {permissionsData.slice(2).map((section) => (
            <div key={section.title} className={styles.acctpermissions}>
              <div className={`${styles.cardName} h6r`}>{section.title}</div>
              {section.permissions.map((permission) => (
                <CheckboxComponent
                  key={permission}
                  text={permission}
                  checked={true}
                  disabled
                  onChange={() => handlePermissionChange(permission)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsPermissions;
