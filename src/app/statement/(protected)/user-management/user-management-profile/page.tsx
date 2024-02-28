"use client";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import React, { CSSProperties, Fragment, useState } from "react";
import ProfileLink from "@/src/components/atoms/links/profile-link";
import ParagraphText from "@/src/components/atoms/paragraph/paragraphText";
import Table, { ColumnsType } from "antd/es/table";
import { Modal, Space } from "antd";
import Button from "@/src/components/atoms/button/button";
import { DeleteOutlined } from "@ant-design/icons";

import TableSearchBar from "../../../../../components/molecules/user-management/shared/table-search-bar/table-search-bar";
import ActivityBadge from "@/src/components/atoms/badge/active-badge";
import UserProfileModal from "@/src/components/molecules/user-management/modal-content/user-profile-modal";

const UserManagementProfile = () => {
  const token = useTokens();
  const font = useFont();
  const [modalType, setModalType] = useState<string>("add");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
    date: string;
    join: string;
  }

  const columns: ColumnsType<DataType> = [
    { title: "Group", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "age", key: "age" },
    { title: "Status", dataIndex: "address", key: "address" },
    { title: "Date Created", dataIndex: "date", key: "date" },
    { title: "Joined On", dataIndex: "join", key: "join" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            label="Delete"
            bgColor={token.default.white}
            borderColor={token.border.primary}
            textColor={token.default.black}
            onClick={() => openModal("delete", record)}
            style={{}}
          />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      date: "12/03/2023",
      join: "12/03/2023",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      date: "12/03/2023",
      join: "12/03/2023",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
      date: "12/03/2023",
      join: "12/03/2023",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
      date: "12/03/2023",
      join: "12/03/2023",
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
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <div
        style={{
          display: "flex",
          padding: "24px",
          flexDirection: "column",
          background: "white",
          margin: "30px",
          alignItems: "flex-end",
          gap: "32px",
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <ProfileHeadImage />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <ProfileHeadtextDescription
                fullName="Abia Mbabazi"
                email="abbymbabazi@gmail.com"
                location="Nairobi, Kenya"
                timezone="( GMT -11:46 ) Greenwich mean Time zone"
              />
              <UserProfileLink />
            </div>
          </div>
          <div>
            <ProfileHeadSelectInput activate="Active" />
          </div>
        </section>
        <TableSearchBar />
        <Table
          style={{ marginTop: "15px", width: "100%" }}
          columns={columns}
          pagination={{
            pageSize: 2,
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
        <UserProfileModal
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
          isModalOpen={isModalOpen}
        />
      </Modal>
    </div>
  );
};

const ProfileHeadImage = () => {
  return (
    <div className="profile-info-image">
      <Image
        src="/profile.png"
        alt="img"
        width={139}
        height={139}
        style={{
          borderRadius: "144px",
        }}
      />
    </div>
  );
};

type ProfileHeadtextDescriptionProps = {
  fullName: string;
  email: string;
  location: string;
  timezone: string;
};

const ProfileHeadtextDescription = (props: ProfileHeadtextDescriptionProps) => {
  const token = useTokens();
  const font = useFont();

  const paragraphStyle = {
    color: token.text.primary,
    ...font.typography.body.regular,
    fontStyle: "normal",
  };
  const paragraphHeaderStyle = {
    color: token.text.primary,
    ...font.typography.h6.medium,
    fontStyle: "normal",
  };
  const profileHeadtextDescriptionCss: CSSProperties = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
  };

  return (
    <div style={profileHeadtextDescriptionCss}>
      <ParagraphText
        styles={paragraphHeaderStyle}
        description={props.fullName}
      />
      <ParagraphText styles={paragraphStyle} description={props.email} />
      <ParagraphText styles={paragraphStyle} description={props.location} />

      <ParagraphText styles={paragraphStyle} description={props.timezone} />
    </div>
  );
};

const UserProfileLink = () => {
  const token = useTokens();
  const font = useFont();

  const handleButtonClick = () => {
    console.log("clicked");
  };

  const itemslink = [
    { href: "#", label: "Edit profile" },
    { href: "#", label: "Reset Password" },
  ];

  function hasBorder(index: number) {
    return index != 0 && true;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
      }}
    >
      {itemslink.map((item, index) => (
        <ProfileLink
          key={index}
          fontProperties={font.typography.body.regular}
          color={token.text.secondary}
          title={item.label}
          hasBorder={hasBorder(index)}
          borderColor={token.border.secondary}
          onClick={handleButtonClick}
        />
      ))}
    </div>
  );
};

type ProfileHeadSelectInputProps = {
  activate: string;
};
const ProfileHeadSelectInput = (props: ProfileHeadSelectInputProps) => {
  const token = useTokens();
  const font = useFont();

  const profileHeadSelectInputCss: CSSProperties = {
    display: "flex",
    padding: "4px 8px",
    width: "83px",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0.8",
    backgroundColor: token.accent.success_invert_01,
    gap: "8px",
  };

  const paragraphSelectTextStyle = {
    color: token.text.primary,
    ...font.typography.body.regular,
    fontStyle: "normal",
  };
  return (
    <Fragment>
      <div style={{ marginBottom: "13px" }}>
        <ParagraphText
          styles={paragraphSelectTextStyle}
          description="Last login on 45 minutes ago"
        />
      </div>
      <div>
        <ActivityBadge
          icon={<ChevronDown />}
          token={token}
          paragraphSelectTextStyle={{
            ...font.typography.h6.regular,
            color: token.default.white,
            width: "fit-content",
          }}
          title="Active"
        />
      </div>
    </Fragment>
  );
};

export default UserManagementProfile;
