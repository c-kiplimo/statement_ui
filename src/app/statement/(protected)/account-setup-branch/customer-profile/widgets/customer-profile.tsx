"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { customerCardDetailsAction } from "@/src/lib/actions/Account.createdRecords.action";
import styles from "./customer-profile.module.css";
import { Spin } from "antd";

const CustomerProfile = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id");
  const [customerData, setCustomerData] = useState<DataSearch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (customerId) {
        try {
          const [customer] = await customerCardDetailsAction("CUSTOMER_ID", customerId);
          setCustomerData(customer);
        } catch (error) {
          console.error("Failed to fetch customer details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Spin spinning={loading}>Loading customer details...</Spin>
      ) : (
        customerData && (
          <div className={styles.details}>
            <h2>{customerData.customerName}</h2>
            <p>Industry: {customerData.industry}</p>
            <p>Customer Type: {customerData.customerType}</p>
            <p>Status: {customerData.customerStatus}</p>
            <p>Email: {customerData.email}</p>
          </div>
        )
      )}
    </div>
  );
};

export default CustomerProfile;
