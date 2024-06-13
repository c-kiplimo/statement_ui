"use client";

import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import ContactCard from "@/src/components/atoms/cards/contact.card";
import { InfoCircleFilled, SearchOutlined } from "@ant-design/icons";
import CustomSvgIcon from "@/src/components/atoms/svg/svg-icons";
import { Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import CardDescItem from "@/src/components/atoms/cards/card.desc.item";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";
import ActivityBadge from "@/src/components/atoms/badge/active-badge";
import { ChevronDown } from "lucide-react";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { deleteIcon, editIcon } from "@/src/components/atoms/svg/document_svg";
import UserGroupRolesModal from "../../modal-content/user-group-roles-modal";
import StepperNav from "@/src/app/statement/(protected)/usermanagement/page-components/edit-roles/edit-roles-stepper/edit-roles-stepper";
import useProfileId from "@/src/hooks/profileId";

const UserGroup = React.memo(({ setActive }: any) => {
  const tokenColor = useTokens();
  const font = useFont();
  const [data, setData] = useState<UserGroups[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchUserGroups } = GroupHandler();
  const handleSearch = (terms: any) => {
    setSearchTerm(terms);
    console.log("search-terms", searchTerm);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "19px",
        alignSelf: "stretch",
        background: tokenColor.default.white,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "8px 32px 16px 24px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CardDescItem
              title="Meraki Systems - Accounts"
              description="KES  |  132314245"
              icon={
                <CustomSvgIcon width={16} height={16} fillColor="#F5F5F5" />
              }
            />

            <div style={{ marginLeft: "auto" }}>
              <ActivityBadge
                icon={<ChevronDown />}
                token={tokenColor}
                paragraphSelectTextStyle={{
                  ...font.typography.h6.regular,
                  color: tokenColor.default.white,
                }}
                title="Active"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <ContactCard
            title="Available Balance"
            content="$146,786.33"
            additonalContent="/KES 21,356,071.28"
            icon={<InfoCircleFilled />}
            style={{
              borderRight: `1px solid ${tokenColor.default.grey}`,
              background: tokenColor.default.white,
            }}
          />

          <ContactCard
            title="Working Balance"
            content="$67,990.24"
            icon={<InfoCircleFilled />}
            style={{
              borderRight: `1px solid ${tokenColor.default.grey}`,
              background: tokenColor.default.white,
            }}
          />

          <ContactCard
            title="Term"
            content="12 months"
            icon={<InfoCircleFilled />}
            style={{
              background: tokenColor.default.white,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 24px",
          width: "100%",
        }}
      >
        <SearchInput onSearch={handleSearch}></SearchInput>
        <PrimaryButton
          buttonType="default"
          iconPosition="right"
          shape="default"
          customStyles={{
            background: tokenColor.accent.success,
            color: tokenColor.accent.success_invert_02,
          }}
          onClick={() => {
            setActive(true);
          }}
        >
          Add New Group
        </PrimaryButton>
      </div>

      <DisplayTable />
    </div>
  );
});
type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <SearchOutlined className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};
const DisplayTable = () => {
  const token = useTokens();
  const font = useFont();
  const [modalType, setModalType] = useState<string>("add");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const profId = useProfileId();

  const openModal = (type: string, record: {}) => {
    console.log("record", record);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleEdit = (record: any) => {
    console.log("Edit clicked for:", record);
  };

  const handleDelete = (record: any) => {
    console.log("Delete clicked for:", record);
  };
  const [data, setData] = useState<UserGroup[]>([]);
  const { fetchUserGroups } = GroupHandler();
  useEffect(() => {
    const fetchGroupData = async () => {
      if (profId !== null && profId !== undefined) {
        try {
          const response = await fetchUserGroups(profId);
          setData(response);
          console.log("Table Data", response);
        } catch (error) {
          console.error("Failed to fetch user groups:", error);
        }
      }
    };

    fetchGroupData();
  }, [profId]);

  const columns: ColumnsType<UserGroup> = [
    {
      title: "Groups",
      dataIndex: "groupId",
      key: "groupId",
    },
    {
      title: "Description",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Date Created",
      dataIndex: "valueDate",
      key: "valueDate",
    },
    {
      title: "Joined On",
      dataIndex: "joinOn",
      key: "joinOn",
    },
    {
      title: "",
      key: "custom",
      render: (record) => (
        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <PrimaryButton
              buttonType="default"
              iconPosition="right"
              shape="default"
              size="small"
              icon={editIcon}
              customStyles={{
                background: token.default.white,
                color: token.default.grey,
              }}
              onClick={}
            ></PrimaryButton>
            <PrimaryButton
              buttonType="default"
              iconPosition="right"
              shape="default"
              size="small"
              icon={deleteIcon}
              customStyles={{
                background: token.default.white,
                color: token.default.white,
              }}
              onClick={() => openModal("delete", record)}
            ></PrimaryButton>
          </div>
        </div>
      ),
    },
  ];

  const modalWidth = () => {
    switch (modalType) {
      case "edit":
        return "500px";
      case "delete":
        return "500px";
      default:
        return "700px";
    }
  };
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          padding: "0px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
          width: "100%",
        }}
      >
        <Table
          pagination={{
            pageSize: 3,
            itemRender: (current, type, originalElement) => {
              if (type === "page") {
                return <span style={{ margin: "0 8px" }}>{current}</span>;
              }
              return originalElement;
            },
            style: {
              display: "flex",
              textAlign: "center",
            },
          }}
          style={{ marginTop: "15px", width: "100%" }}
          columns={columns}
          dataSource={data}
        />
      </div>

      <Modal
        title=""
        open={isModalOpen}
        width={modalWidth()}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <UserGroupRolesModal
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
          isModalOpen={isModalOpen}
        />
      </Modal>
    </Fragment>
  );
};

export default UserGroup;
