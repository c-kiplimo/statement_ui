"use client";
import React, { useState } from "react";
import RestrictionsTable from "./(restrictions-table)/restrictions.table";
import styles from "./restrictionpage.module.css";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import { SearchOutlined } from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import SortButton from "@/src/components/widgets/sort-button/sort.button";
import AddRestrictionButton from "@/src/components/widgets/add-restriction/add.restriction";
import { Modal } from "antd";
import SelectRestriction from "./(select-restriction-modal)/select.restriction";
import ConfirmFailure from "./(confirm-failure-modal)/confirm.failure";

const data = [
  {
    key: "1",
    date: "2024-08-12T10:23:23.043Z",
    restrictionName: "Staff expenses",
    restrictionDescription: "Staff exp",
    status: "Active",
  },
  {
    key: "2",
    date: "2024-08-12T10:23:23.043Z",
    restrictionName: "Send Money ",
    restrictionDescription: "1,000,000,000 per day",
    status: "Active",
  },
  {
    key: "3",
    date: "2024-08-12T10:23:23.043Z",
    restrictionName: "Staff Expenses",
    restrictionDescription: "Staff Expe",
    status: "Active",
  },
  {
    key: "4",
    date: "2024-08-12T12:23:23.043Z",
    restrictionName: "Withdraw Money",
    restrictionDescription: "1,000,000,000 per day",
    status: "Active",
  },
  {
    key: "5",
    date: "2024-08-12T04:55:23.111Z",
    restrictionName: "Staff Expenses",
    restrictionDescription: "Staff Expe",
    status: "Active",
  },
  {
    key: "6",
    date: "2024-08-12T10:55:23.111Z",
    restrictionName: "Staff Expenses",
    restrictionDescription: "Staff Expe",
    status: "Active",
  },
];

const restriction = [
  {
    id: 1,
    restrictionname: "View Statements",
    restrictionDescription: "Restricted to withdraw 5,000,000 KES",
  },
  {
    id: 2,
    restrictionname: "Download Statement",
    restrictionDescription: "Restricted to Transact 789,0000 KES",
  },
];

const RestrictionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddRestriction = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
  };

  const handleClick = () => {};

  const handleCreatePermission = () => {
    setOpenCreateModal(true);
  };

  const filteredData = data.filter(
    (item) =>
      item.restrictionName.toLowerCase().includes(searchTerm) ||
      item.restrictionDescription.toLowerCase().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerContent}>
        <div className={`${styles.header} h6b`}> Restrictions </div>
        <div className={styles.headerbuttons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearchChange} />
          </SearchButton>

          <FilterButton onClick={handleClick} />
          <SortButton onClick={handleClick} />
          <AddRestrictionButton
            onClick={handleAddRestriction}
            buttonStyles={{ background: "#003A49", color: "#FFFFFF" }}
          />
        </div>
      </div>
      <RestrictionsTable restrictions={filteredData} />
      <>
        <Modal onCancel={handleModalClose} open={openModal} footer={false}>
          <SelectRestriction
            restrictions={restriction}
            onCancel={handleModalClose}
            onCreate={handleCreatePermission}
          />
        </Modal>
      </>
      <>
        <Modal
          onCancel={handleCreateModalClose}
          open={openCreateModal}
          footer={false}
          width={380}
        >
          <ConfirmFailure
            title={"Restriction Creation Failed"}
            description={
              "We encountered an issue while creating the restriction. Please check your input and try again"
            }
            onClick={handleCreatePermission}
            onCancel={handleCreateModalClose}
          />
        </Modal>
      </>
    </div>
  );
};

export default RestrictionsPage;
