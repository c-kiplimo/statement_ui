import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import StatementTable from "../activity-history-table/activity.history.table";
import AccountDetailTable from "../account-detail-table/account.detail.table";
import { usePathname } from "next/navigation";
import { CompletedTransactionAction } from "@/src/lib/completed.transactions.actions";


function CompletedStatement() {
  const path = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [data, setData] =useState<CompleteTransactions[]>([])


  useEffect(() => {
  const fetchData = async () => {
    const statementRequestId = sessionStorage.getItem("statementRequestId");
    const result = await CompletedTransactionAction(statementRequestId || '0');
    setData(result)    
  };
  fetchData();
}, []);


  const handleEyeIconClick = (id: number) => {
    setSelectedItemId(id); 
    setIsModalVisible(true); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemId(null); 
  };

  return (
    <div>
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
