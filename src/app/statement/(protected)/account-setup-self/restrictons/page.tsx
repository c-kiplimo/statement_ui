"use client";
import React, { useEffect, useState } from "react";
import RestrictionsTable, { RestrictionTypes } from "./(restrictions-table)/restrictions.table";
import styles from "./restrictionpage.module.css";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import { CheckCircleFilled, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import SortButton from "@/src/components/widgets/sort-button/sort.button";
import AddRestrictionButton from "@/src/components/widgets/add-restriction/add.restriction";
import { Modal, notification } from "antd";
import SelectRestriction, { RestrictionType } from "./(select-restriction-modal)/select.restriction";
import ConfirmFailure from "./(confirm-failure-modal)/confirm.failure";
import useProfileId from "@/src/hooks/profileId";
import { getAllRestrictions, getCustomerRestrictions } from "@/src/lib/actions/account-setup/customer.restrictions.actions";
import RestrictionHandler from "@/src/services/accountsetup/customer.restrictions";

const RestrictionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openCreateErrorModal, setOpenCreateErrorModal] = useState(false);
  const [customerRestrictions, setcustomerRestrictions] = useState<RestrictionTypes[]>([]);
  const [allRestrictions, setAllRestrictions]= useState<RestrictionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const handler = RestrictionHandler()
  const [loading, setLoading] = useState(true)
  const customerId = useProfileId();

  const fetchRestrictions = async () => {
    if (customerId) {
      try {
        const response = await getCustomerRestrictions(customerId);
        setcustomerRestrictions(response);
      } catch (error) {
        console.error('Failed to fetch restrictions:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchAllRestrictions = async () => {
    if (customerId) {
      try {
        const response = await getAllRestrictions(0, 10, 'name');
        setAllRestrictions(response);
      } catch (error) {
        console.error('Failed to fetch restrictions:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRestrictions();
    fetchAllRestrictions();
  }, [customerId]);


  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  const handleAddRestriction = () => {
    setOpenModal(true);
  };

  const resetModalState = () => {
    setSelectedOption([]); 
    fetchAllRestrictions(); 
  };

  const handleModalClose = () => {
    resetModalState();
    setOpenModal(false);
  };

  const handleCreateModalClose = () => {
    setOpenCreateErrorModal(false);
  };

  const handleClick = () => {};
  
  const handleCreatePermission = async (selectedIds: number[]) => {
    
    try {
      await handler.createCustomerRestriction(customerId!, selectedIds);
      notification.success({
        message: <span style={{ color: '#fff', marginRight: '16px' }}>The restriction has been created successfully</span>,
        icon: <CheckCircleFilled style={{ color: '#fff', marginRight: '8px' }} />,
        placement: 'top',
        style: {
          backgroundColor: '#52c41a',
          borderRadius: '8px',
          width: 'max-content',
          padding: '8px 16px',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
        },
        closeIcon: <CloseOutlined className={styles.closeicon}
      />
    });

    } catch (error) {
      setOpenCreateErrorModal(true);
    }
    handleModalClose();
    fetchRestrictions(); 
  };

  const handleDeletionSuccess = () => {
    fetchRestrictions();
    setSelectedOption([]);
};

  const filteredData = customerRestrictions.filter(
    (item) =>
      item.restrictionName.toLowerCase().includes(searchTerm) ||
      item.restrictionDescription.toLowerCase().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="">
        Loading Restrictions.......
      </div>
    );
  }
  

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
      <RestrictionsTable restrictions={filteredData} onDeletionSuccess={handleDeletionSuccess} />
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
          open={openCreateErrorModal}
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
