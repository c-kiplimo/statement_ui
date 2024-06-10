"use client";
import { useTokens } from "@/src/app/(context)/ColorContext";
import React, { Fragment, use, useEffect, useState } from "react";
import styles from "./user-management-tabar.module.css";
import type { ColumnsType } from "antd/es/table";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import {
  deleteIcon,
  eyeIcon,
  tickIcon,
  xIcon,
} from "@/src/components/atoms/svg/document_svg";
import Tabs from "@/src/components/atoms/tabs/tab-item/tab-item";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import { useAccountStatementContext } from "@/src/app/(context)/account-statement-context";
import RegisterUserModalContent from "../modal-content/registerUserModal";
import PendingAuthorizationModalContent from "../modal-content/pendingAuthorizationModal";
import PendingAuthorization from "./pending-authorization";
import { UserDetails } from "@/src/types/user.type";
import RegisterUser from "./register-user";
import { UserHandler } from "@/src/services/usermanagement/user.service";

import { useRouter } from "next/navigation";

const UsersTab = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { accountId } = useAccountStatementContext();
  const [isRegisteredUserModalOpen, setIsRegisteredUserModalOpen] =
    useState<boolean>(false);
  const [isPendingAuthorizationModalOpen, setIsPendingAuthorizationModalOpen] =
    useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const token = useTokens();
  const { fetchAllUsers, deleteUser } = UserHandler();
  const [data, setData] = useState<UserDetails[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const response = await fetchAllUsers();
    setData(response);
  };

  let payload = "";
  const router = useRouter();

  const openModal = (type: string, record: {}) => {
    console.log("record", record);
    setModalType(type);

    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(true);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(true);
    }
  };

  const handleOk = () => {
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(false);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(false);
    }
  };

  const handleCancel = () => {
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(false);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(false);
    }
  };

  function handleCreate(data: UserDetails): void {
    console.log("handleCreate");
  }

  function handleEdit(data: UserDetails): void {
    console.log("handleEdit");
  }

  function handleView(data: UserDetails): void {
    console.log("handleView");
  }

  function handleDelete(data: UserDetails): void {
    console.log("handleDelete");
    //delete user
    async function removeUser() {
      const response = await deleteUser(data.email);
      console.log(response);
    }
    removeUser();
  }

  const RegisterUsercolumns: ColumnsType<UserDetails> = [
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
      render: (record) => (
        <div style={{ display: "flex", gap: "1rem" }}>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={eyeIcon}
            customStyles={{
              background: token.default.white,
              color: token.default.grey,
            }}
            onClick={() => {
              router.push("/statement/user-management/user-management-profile");
            }}
          ></PrimaryButton>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={deleteIcon}
            customStyles={{
              background: token.default.white,
              color: token.default.grey,
            }}
            onClick={() => openModal("delete", record)}
          ></PrimaryButton>
        </div>
      ),
    },
  ];

  const modalWidth = () => {
    switch (modalType) {
      case "add":
        return "800px";
      case "edit":
        return "500px";
      case "delete":
        return "500px";
      default:
        return "700px";
    }
  };
  const dynamicData = {
    data: {
      title: "Meraki Systems tech",
      description: "234353",
      lastActivity: "July, 07 2023",
      availableBalance: "$146,786.33",
      workingBalance: "$67,990.24",
      terms: "12 months",
    },
  };

  const pendingAuthorizationColumn: ColumnsType<UserDetails> = [
    { title: "First name", dataIndex: "first", key: "first" },
    { title: "Last name", dataIndex: "last", key: "last" },
    { title: "Phone number", dataIndex: "phone", key: "phone" },
    { title: " Email Address", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Staff number", dataIndex: "staff", key: "Staff" },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div style={{ display: "flex", gap: "1rem" }}>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={eyeIcon}
            customStyles={{
              background: token.default.white,
              color: token.default.grey,
            }}
            onClick={() => {
              router.push("/statement/user-management/user-management-profile");
            }}
          ></PrimaryButton>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={tickIcon}
            customStyles={{
              background: token.default.white,
              border: `1px solid ${token.accent.success}`,
              color: token.accent.success,
            }}
            onClick={() => openModal("edit", record)}
          ></PrimaryButton>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={xIcon}
            customStyles={{
              background: token.default.white,
              border: `1px solid ${token.accent.danger}`,
              color: token.accent.danger,
            }}
            onClick={() => openModal("delete", record)}
          ></PrimaryButton>
        </div>
      ),
    },
  ];
  const tabsItems = [
    {
      title: "Registered user",
      content: (
        <RegisterUser
          columns={RegisterUsercolumns}
          data={data}
          modalTitle=""
          isModalOpen={isRegisteredUserModalOpen}
          setIsModalOpen={setIsRegisteredUserModalOpen}
          modalWidth={modalWidth()}
          handleOk={handleOk}
          handleCancel={handleCancel}
          modalContentComponent={RegisterUserModalContent}
          accountId={accountId}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          dynamicData={dynamicData}
          setModalType={setModalType}
        />
      ),
    },
    {
      title: "Pending Authorisation",
      content: (
        <PendingAuthorization
          columns={pendingAuthorizationColumn}
          data={data}
          modalTitle=""
          isModalOpen={isPendingAuthorizationModalOpen}
          setIsModalOpen={setIsPendingAuthorizationModalOpen}
          modalWidth={modalWidth()}
          handleOk={handleOk}
          handleCancel={handleCancel}
          modalContentComponent={PendingAuthorizationModalContent}
          accountId={accountId}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          dynamicData={dynamicData}
          setModalType={setModalType}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <div className={styles.userTabBarCss}>
        <div className={styles.usersTabButtonCss}>
          <div
            style={{
              width: "100%",
            }}
          >
            <div className={styles.TabCss}>
              <Tabs
                tabsItems={tabsItems}
                onSelectTab={(index) => setSelectedTab(index)}
                selectedTab={selectedTab}
                // backgroundColor={token.border.primary}
                // fontWeight={0}
                // borderColor={token.border.primary}
                // textColor={""}
              />

              {selectedTab === 0 && (
                <PrimaryButton
                  buttonType="default"
                  iconPosition="right"
                  shape="default"
                  size="large"
                  customStyles={{
                    background: token.brand.primary,
                    color: token.default.white,
                  }}
                  onClick={() => openModal("add", payload)}
                >
                  Register
                </PrimaryButton>
              )}
            </div>

            <TabContent
              marginTop="20px"
              padding="20px"
              tabsItems={tabsItems}
              selectedTab={selectedTab}
              textColor={""}
              backgroundColor={token.border.primary}
              fontWeight={0}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersTab;
