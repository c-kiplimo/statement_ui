import React from "react";
import styles from "./cust.details.notFound.module.css";
import Accountsetup from "@/src/components/widgets/accountsetup-widget/cust.details.search";
import { SearchOutlined } from "@ant-design/icons";

const CustdetailsnotFound = () => {
  return (
    <div className={styles.container}>
      <Accountsetup
        title={"Provide Account Details"}
        instruction={
          "Setup the customer by using account number or customer number"
        }
        option={"Do you want to search by ?"}
        icon={<SearchOutlined />}
        account={"Account Number"}
        customer={"Customer Number"}
      />

      <div className={styles.lowerdiv}>CUSTOMER NOT FOUND</div>
    </div>
  );
};

export default CustdetailsnotFound;
