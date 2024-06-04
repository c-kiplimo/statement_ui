import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import styles from "./user-groups-tab.module.css";
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
import moment from 'moment';
import UserGroupRolesModal from "@/src/components/molecules/user-management/modal-content/user-group-roles-modal";
import Texter from "@/src/components/atoms/text/texter";
import HorizontalInfoDescription from "@/src/components/atoms/text/horizontal-info-description";
import Image from "next/image";

const UserGroup = React.memo(({ setActive }: any) => {
  const tokenColor = useTokens();
  const font = useFont(); 
  const [searchTerm, setSearchTerm] = useState("");
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
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <Image
                src="/UsersGroup.svg"
                alt="user-icon"
                width={16}
                height={16}
              />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.content}>
                <Texter
                  className={"h6m"}
                  textStyle={{ color: "var(--Text-Text-Secondary" }}
                  text={"Meraki System Tech"}
                />
                <Texter
                  className={"captionr"}
                  textStyle={{ color: "var(--Text-Text-Description-01" }}
                  text={"123456"}
                />
                <Texter
                  className={"captionr"}
                  textStyle={{ color: "var(--Text-Text-Secondary" }}
                  text={"High Volume Customer"}
                />
              </div>
              <div className={styles.stateBtn}>
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
          <div className={styles.footer}>
            <div className={styles.sectionOne}>
              <span className={styles.title}>
                <Texter className={"bodym"} text={"Country"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.desc}>
                <HorizontalInfoDescription
                  title={"KENYA/"}
                  titleStyle={{ fontWeight: "500", fontSize: "16px" }}
                  description={"Moi Avenue"}
                  descriptionStyle={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "var(--Text-Text-Description-01",
                  }}
                />
              </span>
            </div>
            <div className={styles.sectionTwo}>
              <span className={styles.title}>
                <Texter className={"bodym"} text={"Email"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.desc}>
                <HorizontalInfoDescription title={"merakisystems@gmail.com"} />
              </span>
            </div>
            <div className={styles.sectionThree}>
              <span className={styles.texter}>
                <Texter className={"bodym"} text={"Mobile Number"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.desc}>
                <HorizontalInfoDescription title={"0728000000"} />
              </span>
            </div>
          </div>
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
  const [modalType, setModalType] = useState<string>("add");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<UserGroups[]>([]);  
  const { fetchAllUserGroups } = GroupHandler();
  const userId = 624744553961;
  
  const fetchUsers = async () => {
    try {
      const response = await fetchAllUserGroups(userId);
      setData(response);
    } catch (error) {
      console.error('Failed to fetch user groups:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const openModal = (type: string, record: UserGroups) => {
    console.log("record", record);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (record: UserGroups) => {
    console.log("Edit clicked for:", record);
  };

  const handleDelete = (record: UserGroups) => {
    console.log("Delete clicked for:", record);
  };

  const columns: ColumnsType<UserGroups> = [
    {
      title: "Group Title",
      dataIndex: ["platformGroup", "description"],
      key: "description",
    },
    {
      title: "Description",
      dataIndex: ["platformGroup", "description"],
      key: "description",
    },
    {
      title: "Date Created",
      dataIndex: ["platformGroup", "createdAt"],
      key: "createdAt",
      render: (createdAt: string) => moment(createdAt).format('DD-MM-YYYY'),
    },
    {
      title: "Joined On",
      dataIndex: "joinedOn",
      key: "joinedOn",
      render: (joinedOn: string) => moment(joinedOn).format('DD-MM-YYYY'),
    },
    {
      title: "",
      key: "actions",
      render: (record: UserGroups) => (
        <div style={{ display: "flex", gap: "15px" }}>
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
            onClick={() => openModal("edit", record)}
          />
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
          />
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
