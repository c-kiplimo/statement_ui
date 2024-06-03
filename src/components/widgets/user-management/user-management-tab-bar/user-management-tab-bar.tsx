"use client";

import { useTokens } from "@/src/app/(context)/ColorContext";
import React, {
  CSSProperties,
  Key,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ColumnsType, TableProps } from "antd/es/table";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/button/button";
import { Eye } from "lucide-react";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { UserDetails } from "@/src/types/user.type";
import TableSearchBar from "@/src/components/molecules/user-management/shared/table-search-bar/table-search-bar";

const UserManagementTabBar = () => {
  const [data, setData] = React.useState<UserDetails[]>([]);
  const { fetchAllUsers, deleteUser } = UserHandler();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const token = useTokens();

  useEffect(() => {
    const fetchUsers = async () => {
      let response = await fetchAllUsers();
      setData(response);
      console.log(response);
    };
    fetchUsers();
  }, []);

  const handleDelete = (record: UserDetails) => {
    console.log("Delete clicked for:", record);
    function deleteData() {
      deleteUser(record.email);
    }
    deleteData();
  };

  const handleView = (record: any) => {
    console.log("View clicked for:", record);
  };

  const userManagementTabBarButtonCss: CSSProperties = {
    display: "flex",
    padding: "4px 6px",
    justifyContent: "center",
    alignItems: "center",
    gap: "32px",
    width: "100%",
    backgroundColor: token.default.white,
    borderRadius: "4px",
  };

  const actionIconCss: CSSProperties = { width: "20px", height: "20px" };

  const userTabBarCss: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem",
    backgroundColor: token.default.white,
    alignSelf: "stretch",
  };

  const columns: ColumnsType<UserDetails> = [
    { title: "First name", dataIndex: "firstName", key: "firstName" },
    { title: "Last name", dataIndex: "lastName", key: "lastName" },
    { title: "Phone number", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: " Email Address", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Staff number", dataIndex: "staff", key: "staff" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            icon={<Eye style={actionIconCss} />}
            label="View"
            bgColor={token.default.white}
            width="40px"
            height="40px"
            borderColor={token.border.primary}
            textColor={token.default.black}
            onClick={() => handleView(record)}
            style={{ marginRight: "1rem" }}
          />
          <Button
            icon={<DeleteOutlined style={actionIconCss} />}
            label="Delete"
            width="40px"
            height="40px"
            bgColor={token.default.white}
            borderColor={token.border.primary}
            textColor={token.default.black}
            onClick={() => handleDelete(record)}
            style={{ marginRight: "1rem" }}
          />
        </div>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (
    selectedRowKeys: Key[],
    selectedRows: UserDetails[]
  ) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tabsItems = [
    {
      title: "Registered user",
      content: (
        <div>
          <TableSearchBar/>
          <Table
            style={{ marginTop: "15px", width: "100%" }}
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
          />
        </div>
      ),
    },
    {
      title: "Pending Authorisation",
      content: <TableSearchBar />,
    },
  ];

  return (
    <div className="user-tab-bar" style={userTabBarCss}>
      <div className="user-tab-bar__btn" style={userManagementTabBarButtonCss}>
        <div
          style={{
            width: "100%",
          }}
        >
          <Tabs
            tabsItems={tabsItems}
            onSelectTab={(index) => setSelectedTab(index)}
            selectedTab={selectedTab}
          />

          <TabContent
            marginTop="20px"
            padding="20px"
            tabsItems={tabsItems}
            selectedTab={selectedTab}
          />
        </div>
      </div>
    </div>
  );
};

type TabItem = {
  title: string;
  content: ReactNode;
};

type TabsProps = {
  tabsItems: TabItem[];
  backgroundColor?: string;
  textColor?: string;
  onSelectTab: (index: number) => void;
  selectedTab: number;
};

const Tabs: React.FC<TabsProps> = ({ tabsItems, onSelectTab, selectedTab }) => {
  const token = useTokens();
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  const handleRegister = () => {
    console.log("clicked registered");
  };

  const TabCss: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  };

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div style={TabCss}>
      <div
        style={{
          display: "flex",
          padding: "4px 6px",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          borderRadius: "4px",
          background: token.default.white,
        }}
      >
        {tabsItems.map((item, index) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => onSelectTab(index)}
            style={{
              padding: "8px 16px",
              margin: "4px",
              outline: "none",
              background:
                index === selectedTab
                  ? "var(--statement-grey-grey-03)"
                  : "transparent",

              border: "none",
              cursor: "pointer",
              color:
                index === selectedTab
                  ? token.text.primary
                  : token.text.secondary,
              fontWeight: index === selectedTab ? "normal" : "",
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      <ActionButton
        onClick={handleRegister}
        text="Register"
        bgColor={token.brand.primary}
      />
    </div>
  );
};

type TabContentProps = {
  tabsItems: { content: React.ReactNode }[];
  marginTop: string;
  padding?: string;
  selectedTab?: number;
};

const TabContent: React.FC<TabContentProps> = ({
  tabsItems,
  marginTop,
  padding,
  selectedTab,
}) => {
  return (
    <div className="tab-content">
      {tabsItems.map((item, index) => (
        <div
          key={index}
          className={`${selectedTab === index ? "" : "hidden"}`}
          style={{
            marginTop: marginTop,
            padding: padding,
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

type ActionButtonProps = {
  onClick: () => void;
  icon?: React.ReactElement;
  text: string;
  textColor?: string;
  bgColor?: string;
};

const ActionButton = (props: ActionButtonProps) => {
  const { bgColor = "#84BD00", textColor = "#fff" } = props;
  const token = useTokens();
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const actionButtonCss: CSSProperties = {
    display: "flex",
    padding: "8px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    color: textColor,
    background: bgColor,
    borderRadius: "4px",
    border: `0.5px solid ${token.default.grey}`,
    opacity: "0.8",
  };

  return (
    <button type="button" onClick={handleClick} style={actionButtonCss}>
      {props.icon &&
        React.cloneElement(props.icon, { className: "action-icon" })}
      {props.text && <span className="action-text">{props.text}</span>}
    </button>
  );
};

export default UserManagementTabBar;
