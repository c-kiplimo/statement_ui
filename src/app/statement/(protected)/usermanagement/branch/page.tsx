"use client"

import React, { useState } from "react";
import styles from "./widgets/page.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Spin } from "antd"; 
import Accountsetup from "@/src/components/widgets/accountsetup-widget/cust.details.search";
import { customerCardDetailsAction } from "@/src/lib/actions/Account.createdRecords.action";
import CustdetailsnotFound from "../../accountsetup/search-pages/search-not-found/cust.details.notFound";
import SearchedRecord, { DataSearch } from "@/src/components/widgets/searched-record/searched-record";
import { EyeIcon } from "lucide-react";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const useCustomerSearch = () => {
  const [data, setData] = useState<DataSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

  const handleClick = async (searchOption: string, searchValue: string) => {
    setLoading(true);
    setError(null);

    try {
      const search: DataSearch[] = await customerCardDetailsAction(searchOption, searchValue);
      setData(search);
    } catch (error) {
      setError(<CustdetailsnotFound />);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleClick };
};

const CustomerSearch = () => {
  const { data, loading, error, handleClick } = useCustomerSearch();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
      <Accountsetup
        title="Customer Details Search"
        instruction="Setup the customer by using account number or customer number"
        option="Do you want to search by ?"
        icon={<SearchOutlined />}
        account="Account Number"
        customer="Customer Number"
        onClick={handleClick}
      />
      <Spin className={styles.loading} spinning={loading}>
        {error && <div>{error}</div>}
        {!loading && !error && data.length > 0 && (
          <SearchedRecord
            data={data}
            icon={<EyeIcon size={16} style={{color:"var(--Mula-Tone-200, #737373)"}}/>}
            columns={["Customer Name", "Email", "Industry", "Customer Type", "Status","Action"]}
          />
        )}
      </Spin>
    </div>
    </QueryClientProvider>
    

  );
};

export default CustomerSearch;
