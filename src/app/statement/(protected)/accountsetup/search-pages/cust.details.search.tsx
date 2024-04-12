import React from "react";
import styles from "./cust.details.search.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Accountsetup from "@/src/components/widgets/accountsetup-widget/cust.details.search";

const AccountsetupPage = () => {
  return (
    <div className={styles.container}>
      <Accountsetup
        title={"Customer Details Search"}
        instruction={
          "Setup the customer by using account number or customer number"
        }
        option={"Do you want to search by ?"}
        icon={<SearchOutlined />}
        account={"Account Number"}
        customer={"Customer Number"}
      />
    </div>
  );
};

export default AccountsetupPage;
