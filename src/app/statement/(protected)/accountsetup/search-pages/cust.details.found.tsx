import React from "react";
import styles from "./cust.details.found.module.css";
import Accountsetup from "@/src/components/widgets/accountsetup-widget/cust.details.search";
import { SearchOutlined } from "@ant-design/icons";
import Createdrecord from "@/src/components/widgets/account-created-recors-widget/created.record";

const Custdetailsfound = () => {
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

      <Createdrecord
        hideicon={<img src="/hide.svg" alt="hide" />}
        creationDate={"Customer Name"}
        acctNumber={"Industry"}
        numberofTimes={"Customer Type"}
        acctStatus={"Status"}
        date={"Meraki Systems Tech"}
        status={"Active"}
        custName={"Banking Industry"}
        duration={"Corporate"}
      />
    </div>
  );
};

export default Custdetailsfound;
