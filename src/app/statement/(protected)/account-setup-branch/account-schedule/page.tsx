"use client";

import React, { useState } from "react";
import styles from "./widgets/page.module.css"
import { QueryClient, QueryClientProvider } from "react-query";
import CustomerSearch from "./widgets/customer-search/customer-search";
import { customerCardDetailsAction } from "@/src/lib/actions/Account.createdRecords.action";
import CustdetailsnotFound from "@/src/components/widgets/customer-not-found/customer-not-found";
import Image from "next/image";
import { Spin } from "antd";
import SearchedRecord from "@/src/app/statement/(protected)/account-setup-branch/searched-record/searched-record";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

const useCustomerSearch = () => {
  const [data, setData] = useState<DataSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

  const handleClick = async (searchOption: string, searchValue: string) => {
    setLoading(true);
    setError(null);

    try {
      const search: DataSearch[] = await customerCardDetailsAction(
        searchOption,
        searchValue
      );
      setData(search);
    } catch (error) {
      setError(
        <CustdetailsnotFound>
          <CustdetailsnotFound.Icon>
            <Image
              src={"/errorIcon.svg"}
              width={32}
              height={32}
              alt="errorIcon"
            />
          </CustdetailsnotFound.Icon>
          <CustdetailsnotFound.Text text="CUSTOMER NOT FOUND"/>
        </CustdetailsnotFound>
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleClick };
};

const AccountSchedule = () => {
  const { data, loading, error, handleClick } = useCustomerSearch();
  const router = useRouter();

  const handleIconClick = (customerId: string) => {
    router.push(`/statement/account-setup-branch/customerprofile?customerId=${customerId}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <CustomerSearch
          option="Do you want to search by ?"
          account="Account Number"
          customer="Customer Number"
          onClick={handleClick}
        />
        <Spin spinning={loading} className={styles.spinContainer}>
        {error && <div>{error}</div>}
        {!loading && !error && data.length > 0 && (
          <SearchedRecord
          data={data}
          icon={<EyeIcon size={16} style={{color:"var(--white"}}/>}
          columns={["Customer Name", "Industry", "Customer Type", "Status"]}
          onClick={handleIconClick}
        />
        )}
        </Spin>
      </div>
    </QueryClientProvider>
  );
};

export default AccountSchedule;
