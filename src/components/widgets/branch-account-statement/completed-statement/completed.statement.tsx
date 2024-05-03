'use client'
import React, { CSSProperties, ReactNode, useEffect, useState,useContext } from "react";
import { Modal, Pagination } from "antd";
import StatementTable from "../activity-history-table/activity.history.table";
import AccountDetailTable from "../account-detail-table/account.detail.table";
import { usePathname } from "next/navigation";
import { CompletedTransactionAction } from "@/src/lib/completed.transactions.actions";


function CompletedStatement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [data, setData] =useState<CompleteTransactions[]>([]); 

  let statementRequestId = sessionStorage.getItem("statementRequestId");

  if(statementRequestId){
    useEffect(() => {
      const fetchData = async () => {
        const result = await CompletedTransactionAction(statementRequestId);
        setData(result)    
      };
      fetchData();
    }, [statementRequestId]);    
  }

 const handleEyeIconClick = (id: number) => {
    setSelectedItemId(id); 
    setIsModalVisible(true); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemId(null); 
  };

  return (
    <div >
      <StatementTable
        statementdata={data}
        onEyeIconClick={handleEyeIconClick}
      />

      <Modal
        width={"70%"}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedItemId !== null && (
          <AccountDetailTable itemId={selectedItemId} />
        )}
      </Modal>
    </div>
  );
}

export default CompletedStatement;
