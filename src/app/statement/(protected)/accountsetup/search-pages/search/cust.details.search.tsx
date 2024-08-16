import React, { useState } from "react";
import { notification, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./cust.details.search.module.css";
import Createdrecord, { DataSearch } from "@/src/components/widgets/account-created-recors-widget/created.record";
import { customerCardDetailsAction } from "@/src/lib/actions/Account.createdRecords.action";
import CustdetailsnotFound from "../search-not-found/cust.details.notFound";
import dynamic from "next/dynamic";

const Accountsetup = dynamic(() => import("@/src/components/widgets/accountsetup-widget/cust.details.search"), { ssr: false });

const AccountsetupPage = () => {
  const [data, setData] = useState<DataSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

  async function handleClick(searchOption: string, searchValue: string) {
    setLoading(true);
    setError(null);

    try {
      // const search: DataSearch[] = await customerCardDetailsAction(searchOption, searchValue);
      // setData(search);
    } catch (error) {
      setError(<CustdetailsnotFound />);
      console.error("Error fetching customer details:", error);
      
      
      notification.error({
        message: 'Error',
        description: 'Error fetching the customer details. Please try again later.',
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Accountsetup
        title={"Customer Details Search"}
        instruction={"Setup the customer by using account number or customer number"}
        option={"Do you want to search by ?"}
        icon={<SearchOutlined />}
        account={"Account Number"}
        customer={"Customer Number"}
        onClick={handleClick}
      />
      <Spin className={styles.loading} spinning={loading}>
        {error && <div>{error}</div>}
        {!loading && !error && (
          <div>
            {data.length > 0 ? (
              <Createdrecord
                data={data}
                hideicon={<img src="/hide.svg" alt="hide" />}
                columnNames={["Customer Name", "Industry", "Customer Type", "Status"]}
              />
            ) : null}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default AccountsetupPage;
