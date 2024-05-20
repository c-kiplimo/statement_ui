import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import StatementTable from "../activity-history-table/activity.history.table";
import AccountDetailTable from "../account-detail-table/account.detail.table";
import { completeTransactionAction } from "@/src/lib/completed.transactions.actions";
import { usePathname } from "next/navigation";
import { AccountStatementContext } from "../context/getAccountNumberContext";

function CompletedStatement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [data, setData] = useState<CompleteTransactions[] | null>(null);
  const { accountNo } = useContext(AccountStatementContext);

  const path = usePathname();
  let actctnum = sessionStorage.getItem("selectedacountnumber");

  useEffect(() => {
    const fetchData = async () => {
      const result = await completeTransactionAction(actctnum!);
      setData(result);
    };
    fetchData();
  }, [accountNo]);

  console.log("selected account number", actctnum);

  const handleEyeIconClick = (id: number) => {
    setSelectedItemId(id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemId(null);
  };

  return (
    <>
      {data && data.length > 0 ? (
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
      ) : (
        <div style={{ textAlign: "center" }}>
          Fetching Account Statement.....
        </div>
      )}
    </>
  );
}

export default CompletedStatement;
