import React, { useState } from "react";
import { Modal, Spin } from "antd";
import StatementTable from "../activity-history-table/activity.history.table";
import { usePathname } from "next/navigation";
import AccountDetailTable from "../account-detail-table/account.detail.table";
import { completeTransactionActionByUserId } from "@/src/lib/completed.transactions.actions";
import useUserId from "@/src/hooks/userId";
import { useQuery } from 'react-query';

function CompletedStatement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const path = usePathname();
  const userId = useUserId();

  const { data: completedStatement, error, isLoading } = useQuery(
    ['completedStatement', userId],
    () => completeTransactionActionByUserId(userId),
    {
      enabled: !!userId,
      retry: false,
      refetchInterval: 5000, 
    }
  );

  const handleEyeIconClick = (id: number) => {
    setSelectedItemId(id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemId(null);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-3">
      <Spin size="large" />
    </div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
  }

  return (
    <>
      {completedStatement && completedStatement.length > 0 ? (
        <div>
          <StatementTable
            statementdata={completedStatement}
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
      ) : (
        <div className="text-center font-bold p-3">
          No Account Statement Data Found.
        </div>
      )}
    </>
  );
}

export default CompletedStatement;
