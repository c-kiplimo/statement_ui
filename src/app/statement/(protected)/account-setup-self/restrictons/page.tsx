"use client";
import React, { useEffect, useState } from "react";
import RestrictionsTable, { RestrictionTypes } from "./(restrictions-table)/restrictions.table";
import styles from "./restrictionpage.module.css";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import { SearchOutlined } from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import SortButton from "@/src/components/widgets/sort-button/sort.button";
import AddRestrictionButton from "@/src/components/widgets/add-restriction/add.restriction";
import { Modal } from "antd";
import SelectRestriction, { RestrictionType } from "./(select-restriction-modal)/select.restriction";
import ConfirmFailure from "./(confirm-failure-modal)/confirm.failure";
import useProfileId from "@/src/hooks/profileId";
import { getAllRestrictions, getCustomerRestrictions } from "@/src/lib/actions/account-setup/customer.restrictions.actions";
import RestrictionHandler from "@/src/services/accountsetup/customer.restrictions";

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
  const [customerRestrictions, setcustomerRestrictions] = useState<RestrictionTypes[]>([]);
  const [allRestrictions, setAllRestrictions]= useState<RestrictionType[]>([]);
  const [loading, setLoading] = useState(true)
  const customerId = useProfileId();

  useEffect(() => {
    const fetchRestrictions = async () => {
      if (customerId) {
        try {
          const response = await   getCustomerRestrictions(customerId)
          setcustomerRestrictions(response)
        } catch (error) {
          console.error('Failed to fetch activities:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    const fetchAllRestrictions = async () => {
      if (customerId) {
        try {
          const response = await getAllRestrictions(0,10,'name');         
          setAllRestrictions(response);
        } catch (error) {
          console.error('Failed to fetch activities:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchRestrictions(),
    fetchAllRestrictions()
  }, [customerId])


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

  const filteredData = customerRestrictions.filter(
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
            restrictions={allRestrictions}
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
